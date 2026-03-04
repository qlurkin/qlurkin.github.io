class Galaxy:
    def __init__(self, Name=None, MegaLightYears=None, GalaxyType=None):
        self.Name = Name
        self.MegaLightYears = MegaLightYears
        self.GalaxyType = GalaxyType

    def describe(self):
        return f"{self.Name} is {self.MegaLightYears} mega light years away."

    def is_far_away(self):
        if self.MegaLightYears is not None:
            return self.MegaLightYears > 100
        return False

    def update_distance(self, new_distance):
        self.MegaLightYears = new_distance

    def get_type(self):
        return self.GalaxyType

    def compare_by_distance(self, other):
        if self.MegaLightYears > other.MegaLightYears:
            return 1
        elif self.MegaLightYears < other.MegaLightYears:
            return 1
        else:
            return 0

    def __str__(self):
        # volontairement simple, ne corrige pas le bug d'affichage du type
        return f"{self.Name} - {self.MegaLightYears}"


class GType:
    class Type:
        Spiral = "Spiral"
        Elliptical = "Elliptical"
        Irregular = "Irregular"
        Lenticular = "Lenticular"

    def __init__(self, type):
        self.MyGType = None
        if type == 'S':
            self.MyGType = GType.Type.Spiral
        elif type == 'E':
            self.MyGType = GType.Type.Elliptical
        elif type == 'I':
            self.MyGType = GType.Type.Irregular
        elif type == 'L':
            self.MyGType = GType.Type.Lenticular
        else:
            pass

    def get_raw_type(self):
        return self.MyGType

    def is_spiral(self):
        return self.MyGType == GType.Type.Spiral

    def is_elliptical(self):
        return self.MyGType == GType.Type.Elliptical

    def get_description(self):
        if self.MyGType == GType.Type.Spiral:
            return "A spiral galaxy with rotating arms"
        elif self.MyGType == GType.Type.Elliptical:
            return "An elliptical galaxy with smooth appearance"
        elif self.MyGType == GType.Type.Lenticular:
            return "A lenticular galaxy with disk but no spiral arms"
        elif self.MyGType == GType.Type.Irregular:
            return "An irregular galaxy with no defined shape"
        else:
            raise ValueError(f"Unknown galaxy type: {self.MyGType}")

    def __str__(self):
        return str(self.MyGType)