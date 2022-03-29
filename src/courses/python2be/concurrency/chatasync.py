import sys
import asyncio
import aioconsole
import re

pattern = r'\s+'
divide = re.compile(pattern)

async def listen(port):
    async def processClient(reader: asyncio.StreamReader, writer: asyncio.StreamWriter):
        address = writer.get_extra_info('peername')
        message = await reader.read(2048)
        print(address, message.decode())

    try:
        await asyncio.start_server(processClient, host='0.0.0.0', port=port)
    except OSError as e:
        print(e)


async def chat(port):
    asyncio.create_task(listen(port))

    address = None

    while True:
        cmd = await aioconsole.ainput('> ')
        if cmd.startswith('/'):
            parts = divide.split(cmd)
            if parts[0] == '/quit':
                break
            if parts[0] == '/join':
                address = (parts[1], int(parts[2]))
        else:
            reader, writer = await asyncio.open_connection(*address)
            writer.write(cmd.encode())
            await writer.drain()
            writer.close()
            await writer.wait_closed()

if __name__ == '__main__':
    port = int(sys.argv[1])
    asyncio.run(chat(port))
