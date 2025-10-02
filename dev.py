from subprocess import run

try:
    run(["bun", "dev"])
except KeyboardInterrupt:
    pass
