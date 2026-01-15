import numpy as np
from numpy.typing import ArrayLike, NDArray


def look_at(eye: ArrayLike, target: ArrayLike, up: ArrayLike) -> NDArray:
    """
    Convert world coordinates to camera coordinates where the camera
    point in the direction of -z axis and up is the y axis.
    """
    eye = np.array(eye, dtype=np.float32)
    target = np.array(target, dtype=np.float32)
    up = np.array(up, dtype=np.float32)
    f = target - eye
    f = f / np.linalg.norm(f)
    s = np.cross(f, up)
    s = s / np.linalg.norm(s)
    u = np.cross(s, f)

    # fmt: off
    return np.array([[ s[0],  s[1],  s[2], -eye @ s],
                     [ u[0],  u[1],  u[2], -eye @ u],
                     [-f[0], -f[1], -f[2],  eye @ f],
                     [    0,     0,     0,        1]], dtype=np.float32)
    # fmt: on


def perspective(fovy_deg: float, aspect: float, near: float, far: float) -> NDArray:
    """
    Convert camera coordinates to wgpu clip coordinates where x and y goes
    from -1.0 to 1.0 and z goes from 0.0 to 1.0.
    """

    angle = fovy_deg * np.pi / 180

    yspan = near * np.tan(angle)
    xspan = yspan * aspect

    c0r0 = 2 * near / xspan
    c1r1 = 2 * near / yspan
    c2r2 = -(far + near) / (far - near) / 2 - 0.5
    c3r2 = -far * near / (far - near)

    # fmt: off
    return np.array([[c0r0,    0,    0,    0],
                     [   0, c1r1,    0,    0],
                     [   0,    0, c2r2, c3r2],
                     [   0,    0,   -1,    0]], dtype=np.float32)
    # fmt: on
