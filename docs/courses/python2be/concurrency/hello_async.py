import asyncio

async def hello(name):
    while True:
        print('Hello {}'.format(name))
        await asyncio.sleep(0)

async def main():
    await asyncio.gather(
        hello('Alice'),
        hello('Bob')
    )

asyncio.run(main())