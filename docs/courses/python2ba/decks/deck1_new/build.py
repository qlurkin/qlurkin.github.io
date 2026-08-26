from build_py import markdown

markdown("index.md")


def add(a: float, b: float) -> float:
    """Add two numbers"""
    return a + b

x = add(4, 5)
