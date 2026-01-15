import numpy as np
from numpy.typing import ArrayLike, NDArray
from cgmath import look_at, perspective


class Camera:
    def __init__(
        self,
        fovy_deg: float,
        aspect: float,
        near: float,
        far: float,
        radius: float,
        longitude: float,
        latitude: float,
        target: ArrayLike = [0.0, 0.0, 0.0],
        up: ArrayLike = [0.0, 1.0, 0.0],
    ):
        self.pointer_down = False
        self.last_pointer_pos = np.array([0.0, 0.0])
        self.fovy_deg = fovy_deg
        self.aspect = aspect
        self.near = near
        self.far = far
        self.radius = radius
        self.longitude = longitude
        self.latitude = latitude
        self.target = np.array(target, dtype=np.float32)
        self.up = np.array(up, dtype=np.float32)

    def get_matrices(self) -> tuple[NDArray, NDArray]:
        camera_position = np.array(
            [
                np.cos(self.latitude) * np.cos(self.longitude),
                np.sin(self.latitude),
                np.cos(self.latitude) * np.sin(self.longitude),
            ],
            dtype=np.float32,
        )

        camera_position = self.target + camera_position * self.radius

        view_matrix = look_at(camera_position, self.target, self.up)
        proj_matrix = perspective(self.fovy_deg, self.aspect, self.near, self.far)

        return proj_matrix, view_matrix

    def process_event(self, event):
        if event["event_type"] == "pointer_down":
            self.pointer_down = True
        elif event["event_type"] == "pointer_up":
            self.pointer_down = False
        elif event["event_type"] == "pointer_move":
            pointer_pos = np.array([event["x"], event["y"]])
            delta = pointer_pos - self.last_pointer_pos
            self.last_pointer_pos = pointer_pos
            if self.pointer_down:
                self.longitude = (self.longitude + delta[0] * 0.01) % (2 * np.pi)
                self.latitude = np.clip(
                    self.latitude + delta[1] * 0.01, -np.pi / 2, np.pi / 2
                )

        elif event["event_type"] == "wheel":
            self.radius = max(0.1, self.radius + event["dy"] * 0.001)
