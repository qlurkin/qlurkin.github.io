import sys
import shutil
import platform
import time
import threading
import queue

char_queue = queue.Queue()

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

        return {
            b"\r": "ENTER",
            b"\n": "ENTER",
            b"\t": "TAB",
            b"\x1b": "",
            b"\x08": "BACKSPACE",
            b" ": "SPACE",
        }.get(b, b.decode("latin1"))


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
    while True:
        ch = getch()
        if len(ch) > 0:
            char_queue.put(ch)


def read_key():
    try:
        return char_queue.get_nowait()
    except queue.Empty:
        return ""


def footer():
    w, h = size()
    write_at(w // 2 - 4, h, "[Q: Quit]")


def clear():
    sys.stdout.write("\033[2J\033[H")


def size():
    size = shutil.get_terminal_size()
    return size.columns, size.lines


def move(column, row):
    sys.stdout.write(f"\033[{row + 1};{column + 1}H")


def set_fg(red, green, blue):
    sys.stdout.write(f"\033[38;2;{red};{green};{blue}m")


def reset_fg():
    sys.stdout.write("\033[39m")


def set_bg(red, green, blue):
    sys.stdout.write(f"\033[48;2;{red};{green};{blue}m")


def reset_bg():
    sys.stdout.write("\033[49m")


def set_bold():
    sys.stdout.write("\033[1m")


def set_italic():
    sys.stdout.write("\033[3m")


def set_underline():
    sys.stdout.write("\033[4m")


def set_strikethrough():
    sys.stdout.write("\033[9m")


def reset_bold():
    sys.stdout.write("\033[22m")


def reset_italic():
    sys.stdout.write("\033[23m")


def reset_underline():
    sys.stdout.write("\033[24m")


def reset_strikethrough():
    sys.stdout.write("\033[29m")


def reset():
    sys.stdout.write("\033[0m")


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
    sys.stdout.write(str(string))
    reset()


def pixels(rows, column=0, row=0):
    move(column, row)
    for i in range(len(rows) // 2):
        for j in range(len(rows[i])):
            set_fg(*rows[i][j])
            set_bg(*rows[i + 1][j])
            sys.stdout.write("▀")
        row += 1
        move(column, row)
    if len(rows) % 2 == 1:
        reset_bg()
        for j in range(len(rows[-1])):
            set_fg(*rows[-1][j])
            sys.stdout.write("▀")
    reset()


def run(render, fps=30):
    threading.Thread(target=input_thread, daemon=True).start()
    sys.stdout.write("\033[?25l")
    enter_raw()
    sys.stdout.flush()
    while True:
        keys = []
        key = read_key()
        while len(key) > 0:
            if key in ("q", "Q"):
                exit_raw()
                sys.stdout.write("\033[?25h")
                sys.stdout.flush()
                sys.exit()
            keys.append(key)
            key = read_key()

        clear()
        render(keys)
        sys.stdout.flush()
        time.sleep(1 / fps)


if __name__ == "__main__":
    out = []

    def render(keys):
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

    run(render)
