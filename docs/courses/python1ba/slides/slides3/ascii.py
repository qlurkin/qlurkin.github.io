import sys
import shutil
import platform
import time
import threading
import queue

_char_queue = queue.Queue()
_running = False


IS_WINDOWS = platform.system() == "Windows"


if IS_WINDOWS:
    import msvcrt

    def enter_raw():
        pass

    def exit_raw():
        pass

    def getch():  # type: ignore
        b = msvcrt.getch()  # type: ignore

        if b in (b"\x00", b"\xe0"):
            b = msvcrt.getch()  # type: ignore
            return {
                b"H": "UP",
                b"P": "DOWN",
                b"K": "LEFT",
                b"M": "RIGHT",
            }.get(b, "")

        try:
            return {
                b"\r": "ENTER",
                b"\n": "ENTER",
                b"\t": "TAB",
                b"\x1b": "",
                b"\x08": "BACKSPACE",
                b" ": "SPACE",
            }.get(b, b.decode("ascii"))
        except UnicodeDecodeError:
            return ""


else:
    import tty
    import termios

    __fd = sys.stdin.fileno()
    __old = termios.tcgetattr(__fd)

    def enter_raw():
        tty.setraw(__fd)

    def exit_raw():
        termios.tcsetattr(__fd, termios.TCSADRAIN, __old)

    def getch():
        ch = sys.stdin.read(1)
        while ch == "\x1b":
            ch = sys.stdin.read(1)
            if ch in ("[", "O"):
                ch = sys.stdin.read(1)
                return {
                    "A": "UP",
                    "B": "DOWN",
                    "C": "RIGHT",
                    "D": "LEFT",
                }.get(ch, "")

        return {
            "\r": "ENTER",
            "\n": "ENTER",
            "\t": "TAB",
            "\x7f": "BACKSPACE",
            " ": "SPACE",
        }.get(ch, ch)


def input_thread():
    global _running
    while _running:
        ch = getch()
        if ch in ("q", "Q"):
            _running = False
        if len(ch) > 0:
            _char_queue.put(ch)


def read_key():
    try:
        return _char_queue.get_nowait()
    except queue.Empty:
        return ""


def flush():
    sys.stdout.flush()


def write(msg):
    sys.stdout.write(msg)


def footer():
    w, h = size()
    write_at(w // 2 - 4, h, "[Q: Quit]")


def clear():
    write("\033[2J\033[H")


def size():
    size = shutil.get_terminal_size()
    return size.columns, size.lines


def move(column, row):
    write(f"\033[{row + 1};{column + 1}H")


def set_fg(red, green, blue):
    write(f"\033[38;2;{red};{green};{blue}m")


def reset_fg():
    write("\033[39m")


def set_bg(red, green, blue):
    write(f"\033[48;2;{red};{green};{blue}m")


def reset_bg():
    write("\033[49m")


def set_bold():
    write("\033[1m")


def set_italic():
    write("\033[3m")


def set_underline():
    write("\033[4m")


def set_strikethrough():
    write("\033[9m")


def reset_bold():
    write("\033[22m")


def reset_italic():
    write("\033[23m")


def reset_underline():
    write("\033[24m")


def reset_strikethrough():
    write("\033[29m")


def reset():
    write("\033[0m")


def write_at(
    column,
    row,
    string,
    fg=None,
    bg=None,
    bold=False,
    italic=False,
    underline=False,
    strikethrough=False,
):
    move(column, row)
    if fg is not None:
        set_fg(*fg)
    if bg is not None:
        set_bg(*bg)
    if bold:
        set_bold()
    if italic:
        set_italic()
    if underline:
        set_underline()
    if strikethrough:
        set_strikethrough()
    write(str(string))
    reset()


def pixels(rows, column=0, row=0):
    move(column, row)
    for i in range(len(rows) // 2):
        for j in range(len(rows[i])):
            set_fg(*rows[i][j])
            set_bg(*rows[i + 1][j])
            write("▀")
        row += 1
        move(column, row)
    if len(rows) % 2 == 1:
        reset_bg()
        for j in range(len(rows[-1])):
            set_fg(*rows[-1][j])
            write("▀")
    reset()


def init():
    threading.Thread(target=input_thread, daemon=True).start()
    write("\033[?25l")
    enter_raw()
    flush()


def restore():
    exit_raw()
    write("\033[?25h")
    flush()


def exit():
    restore()
    sys.exit()


def keypresses():
    res = []
    key = read_key()
    while len(key) > 0:
        res.append(key)
        key = read_key()
    return res


def run(render, *state, fps=30):
    global _running
    _running = True
    init()
    while _running:
        clear()
        state = render(*state)
        flush()
        if not isinstance(state, tuple):
            state = (state,)
        time.sleep(1 / fps)
    restore()


if __name__ == "__main__":

    def render(out):
        keys = keypresses()
        if len(keys) > 0:
            out.extend(keys)
        width, height = size()
        write_at(width // 2 - 2, height // 2, out, italic=True)
        pixels(
            [
                [(255, 0, 0), (255, 0, 0), (255, 0, 0)],
                [(255, 0, 0), (0, 0, 255), (255, 0, 0)],
                [(255, 0, 0), (255, 0, 0), (255, 0, 0)],
            ],
        )
        footer()
        return out

    run(render, [])
