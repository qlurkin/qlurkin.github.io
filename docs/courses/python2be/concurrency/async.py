from random import randint
import asyncio
counter = 0
results = {}

async def compute(name):
    global counter
    counter += 1
    await asyncio.sleep(randint(0, 1))
    results[name] = counter

async def main():
    tasks = [
        compute(name) for name in ['Dan', 'Tom']
    ]
    
    await asyncio.gather(*tasks)
    print(results)

asyncio.run(main())