from __future__ import annotations
import sys
import shutil
import platform
import time
import threading
import queue
from dataclasses import dataclass, field
import atexit
from typing import Any, Callable


def default_loop(state):
    return state


@dataclass
class StgeState:
    frame_time_target: float = 0.0
    delta_time: float = 0.0
    frame_start: float = 0.0
    frame_buffer: list[str] = field(default_factory=list)
    keys: list[str] = field(default_factory=list)
    char_queue: queue.Queue = field(default_factory=queue.Queue)
    input_thread: threading.Thread | None = None
    input_thread_exception: Exception | None = None
    loop_fun: Callable[[Any], Any] = default_loop


class NoKey(Exception):
    pass


_state = StgeState()

IS_WINDOWS = platform.system() == "Windows"


if IS_WINDOWS:
    import msvcrt

    def enter_raw():
        """Put the terminal in raw mode"""
        pass

    def exit_raw():
        """Exit terminal raw mode"""
        pass

    def getch():  # type: ignore
        """Get a character from standard input"""
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
                b"\x03": "SIGINT",
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
        """Put the terminal in raw mode"""
        tty.setraw(__fd)

    def exit_raw():
        """Exit terminal raw mode"""
        termios.tcsetattr(__fd, termios.TCSADRAIN, __old)

    def getch():
        """Get a character from standard input"""
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
            "\x03": "SIGINT",
            " ": "SPACE",
        }.get(ch, ch)


def _input_thread():
    try:
        while True:
            ch = getch()
            if len(ch) > 0:
                _state.char_queue.put(ch)
    except Exception as e:
        _state.input_thread_exception = e


def _read_key():
    try:
        ch = _state.char_queue.get_nowait()
        if ch == "SIGINT":
            raise KeyboardInterrupt
        return ch
    except queue.Empty:
        raise NoKey


def _flush():
    frame = "".join(_state.frame_buffer)
    _state.frame_buffer.clear()
    sys.stdout.write(frame)
    sys.stdout.flush()


def write(msg: Any):
    """Write something at the current cursor position"""
    _state.frame_buffer.append(str(msg))


def clear():
    """Clear the terminal"""
    write("\033[3J\033[2J\033[H")


def move(column: int, row: int):
    """Move the cursor to a new position"""
    write(f"\033[{row + 1};{column + 1}H")


def set_fg(red: int, green: int, blue: int):
    """Change the color of font"""
    write(f"\033[38;2;{red};{green};{blue}m")


def reset_fg():
    """Get the default font color back"""
    write("\033[39m")


def set_bg(red: int, green: int, blue: int):
    """Change the background color of font"""
    write(f"\033[48;2;{red};{green};{blue}m")


def reset_bg():
    """Get the default font background color back"""
    write("\033[49m")


def set_bold():
    """Set the font in bold mode"""
    write("\033[1m")


def set_italic():
    """Set the font in italic mode"""
    write("\033[3m")


def set_underline():
    """Set the font in underlined mode"""
    write("\033[4m")


def set_strikethrough():
    """Set the font in strikethrough mode"""
    write("\033[9m")


def reset_bold():
    """Reset the font from bold mode"""
    write("\033[22m")


def reset_italic():
    """Reset the font from italic mode"""
    write("\033[23m")


def reset_underline():
    """Reset the font from underlined mode"""
    write("\033[24m")


def reset_strikethrough():
    """Reset the font from strikethrough mode"""
    write("\033[29m")


def reset():
    """Reset the font to its default"""
    write("\033[0m")


def write_at(
    column: int,
    row: int,
    msg: Any,
    fg: tuple[int, int, int] | None = None,
    bg: tuple[int, int, int] | None = None,
    bold: bool = False,
    italic: bool = False,
    underline: bool = False,
    strikethrough: bool = False,
):
    """Write something at a specific position ans with a specific style. The style is reseted afterward."""
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
    write(msg)
    reset()


def pixels(rows: list[list[tuple[int, int, int]]], column: int = 0, row: int = 0):
    """Display a grid of pixels with Half Block Characters. `rows` must be a list of rows of colors."""
    move(column, row)
    for i in range(len(rows) // 2):
        for j in range(len(rows[i])):
            set_fg(*rows[i * 2][j])
            set_bg(*rows[i * 2 + 1][j])
            write("▀")
        row += 1
        move(column, row)
    if len(rows) % 2 == 1:
        reset_bg()
        for j in range(len(rows[-1])):
            set_fg(*rows[-1][j])
            write("▀")
    reset()


def size() -> tuple[int, int]:
    """Returns the size of the terminal in characters. (columns, rows)"""
    size = shutil.get_terminal_size()
    return size.columns, size.lines


def _exception_hook(exc_type, exc_value, exc_traceback):
    clear()
    _restore()
    sys.__excepthook__(exc_type, exc_value, exc_traceback)


def init(fps):
    """Initialize STGE. Must be called before anything else."""
    _state.frame_time_target = 1 / fps

    _state.input_thread = threading.Thread(target=_input_thread, daemon=True)
    _state.input_thread.start()

    write("\033[?25l")
    enter_raw()
    atexit.register(_restore)
    sys.excepthook = _exception_hook
    _flush()


def _restore():
    exit_raw()
    write("\033[?25h")
    _flush()


def quit():
    """Quit the program"""
    sys.exit()


def _keypresses():
    res = []
    while True:
        try:
            key = _read_key()
            res.append(key)
        except NoKey:
            break
    return res


def keypresses() -> list[str]:
    """Returns the keys pressed from last frame"""
    return _state.keys


def begin_frame():
    """Begin a Frame. Must be called at the beginning of each frame."""
    assert _state.input_thread is not None, "init() must be called before begin_frame()"
    if not _state.input_thread.is_alive():
        if _state.input_thread_exception is not None:
            raise _state.input_thread_exception
        else:
            raise Exception("Input Thread Crached")
    _state.frame_start = time.perf_counter()
    _state.keys = _keypresses()
    clear()


def end_frame():
    """End a frame. Must be called at the end of each frame"""
    _flush()
    remaining = _state.frame_time_target - (time.perf_counter() - _state.frame_start)
    if remaining > 0:
        time.sleep(remaining)
    _state.delta_time = time.perf_counter() - _state.frame_start


def delta_time() -> float:
    """Get the ellapsed time from last frame in seconds."""
    return _state.delta_time


def run(setup: Callable[[], Any], loop: Callable[[Any], Any], fps: int = 30):
    """Runs a game loop. This function takes care of calling `stge.init()`, `stge.begin_frame()`
    and `stge.end_frame()`. You must call `stge.quit()` to terminate the game loop.

    - `setup`: is a collable that returns the initial app state.
    - `loop`: is a callable that receive the app state as an argument and returns that state for
              the next `loop` call.
    - `fps`: is the target frame per seconds

    It does basically:

    ```
    stge.init(fps)
    state = setup()
    while True:
        stge.begin_frame()
        state = loop(state)
        stge.end_frame()
    ```
    """
    _state.loop_fun = loop
    init(fps)
    state = setup()
    while True:
        begin_frame()
        state = _state.loop_fun(state)
        end_frame()


def set_loop(loop: Callable[[Any], Any]):
    """Change the `loop()` function used by `run()`."""
    _state.loop_fun = loop
