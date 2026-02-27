from galaxy import Galaxy, GType
from functools import cmp_to_key


def create_galaxies():
    return [
        Galaxy(Name="Cartwheel", MegaLightYears=25.2, GalaxyType=GType('L')),
        Galaxy(Name="Tadpole", MegaLightYears=40.25, GalaxyType=GType('S')),
        Galaxy(Name="Pinwheel", MegaLightYears=15.358, GalaxyType=GType('S')),
        Galaxy(Name="Small Magellanic Cloud", MegaLightYears=0.2, GalaxyType=GType('l')),
        Galaxy(Name="Andromeda", MegaLightYears=3, GalaxyType=GType('S')),
        Galaxy(Name="Maffei 1", MegaLightYears=11, GalaxyType=GType('E')),
    ]


def IterateThroughListByDistance(theGalaxies):
    sorted_galaxies = sorted(theGalaxies, key=cmp_to_key(lambda g1, g2: g1.compare_by_distance(g2)))

    for theGalaxy in sorted_galaxies:
        print(theGalaxy.Name + "  " +
              str(theGalaxy.MegaLightYears) + ",  " +
              str(theGalaxy.GalaxyType) + ",  " +
              str(theGalaxy.GalaxyType.get_description()))


def find_spiral_galaxies(galaxies):
    return [g for g in galaxies if hasattr(g.GalaxyType, "is_spiral") and g.GalaxyType.is_spiral()]


def count_galaxies(galaxies):
    return len(galaxies)


def find_galaxy_by_distance(galaxies, target_distance):
    for galaxy in galaxies:
        if galaxy.MegaLightYears == target_distance:
            return galaxy
    return None


def print_header():
    print("===== GALAXY REPORT =====")


def search_and_display_galaxy(galaxies,distance):
    found = find_galaxy_by_distance(galaxies, distance)
    if found:
        print(f"Found: {found.Name}")
    else:
        print("Galaxy not found!")


def main():
    print("Welcome to Galaxy News!")
    
    theGalaxies = create_galaxies()
    
    IterateThroughListByDistance(theGalaxies)
    
    # Trouver toutes les galaxies qui sont à 25 méga années-lumière
    # plus proche que Cartwheel et les afficher

    cartwheel = find_galaxy_by_distance(theGalaxies, 25.2)
    target = cartwheel.MegaLightYears - 25
    search_and_display_galaxy(theGalaxies, target)
    

if __name__ == "__main__":
    main()