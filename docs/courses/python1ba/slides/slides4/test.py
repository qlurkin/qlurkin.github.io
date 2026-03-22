import stge


def setup():
    return 0


def loop(state):
    width, height = stge.size()

    for key in stge.keypresses():
        if key == "SPACE":
            state += 1
        if key == "q":
            stge.quit()

    stge.write_at(width // 2, height // 2, state)
    return state


stge.run(setup, loop)
