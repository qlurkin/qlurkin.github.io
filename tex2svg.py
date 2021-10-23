import matplotlib.pyplot as plt
from io import BytesIO

plt.rc('mathtext', fontset='cm')

def tex2svg(formula, fontsize=12, dpi=300):
    """Render TeX formula to SVG.
    Args:
        formula (str): TeX formula.
        fontsize (int, optional): Font size.
        dpi (int, optional): DPI.
    Returns:
        str: SVG render.
    """
    print(formula)
    fig = plt.figure(figsize=(0.01, 0.01))
    fig.text(0, 0, r'${}$'.format(formula), fontsize=fontsize)

    output = BytesIO()
    fig.savefig(output, dpi=dpi, transparent=True, format='svg',
                bbox_inches='tight', pad_inches=0.0)
    plt.close(fig)

    output.seek(0)
    return output.read().decode()

if __name__ == '__main__':
    output = tex2svg(r'\int_{-\infty}^\infty e^{-x^2}\,dx = \sqrt{\pi}')
    print(output)