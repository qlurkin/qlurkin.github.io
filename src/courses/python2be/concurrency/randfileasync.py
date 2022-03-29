import random
import asyncio

async def write():
    while True:
        with open('number.txt', 'w') as file:
            file.write(str(random.randrange(100)))
        await asyncio.sleep(0)

async def main():
    task = asyncio.create_task(write())
    while True:
        await asyncio.sleep(1)
        with open("number.txt") as file:
            try:
                print(int(file.read()))
            except ValueError:
                print("Not a Number")
    await task

asyncio.run(main())

