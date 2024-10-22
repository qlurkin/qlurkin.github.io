---
title: Labo 4
subtitle: Manipulations de fichiers textes
typst: true
css: style.css
---

<!-- 1.  Écrire un programme pygame qui permet de charger un fichier JSON de -->
<!--     la forme suivante: -->
<!---->
<!--     ```json -->
<!--     { -->
<!--       "firstname": "Quentin", -->
<!--       "lastname": "Lurkin", -->
<!--       "birthdate": "24/08/1982", -->
<!--       "address": { -->
<!--         "street": "Promenade de l'Alma", -->
<!--         "number": "50", -->
<!--         "CP": 1200, -->
<!--         "City": "Brussels", -->
<!--         "Country": "Belgium" -->
<!--       } -->
<!--     } -->
<!--     ``` -->
<!---->
<!--     et d\'afficher ses informations de façon lisible. -->
<!---->
<!--     L\'utilisateur pourra introduire le nom du fichier dans une boite de -->
<!--     texte et il recevra un message d\'erreur si le fichier n\'existe pas -->
<!--     ou s\'il ne respecte pas le format. -->
<!---->
<!--     **Conseil:** vous pouvez utiliser une [`UITextBox`](https://pygame-gui.readthedocs.io/en/latest/pygame_gui.elements.html#module-pygame_gui.elements.ui_text_box). -->

1.  Définir une fonction `computesum(path: str)` qui reçoit un
    paramètre:

    - `path` contient le chemin vers un fichier sur
      l'ordinateur,

    qui est sensé contenir un nombre par ligne, et qui affiche à l'écran
    la somme de tous ces nombres. Attention, le fichier peut ne pas
    exister auquel cas un message d'erreur est affiché. Le fichier peut
    également être vide, dans ce cas la somme est nulle. De plus, des
    lignes peuvent être erronées (ne contiennent pas un nombre); ces
    dernières doivent simplement être ignorées. Voici un exemple d'appel
    avec le contenu du fichier `data.txt` et le
    résultat produit:

    ```plain
    13
    7.5
    2.1
    DEUX
    4.4
    100
    ```

    ```python
    computesum('data.txt')
    ```

    ```terminal
    La somme est 127.0
    ```

2.  On vous demande de réaliser un programme permettant de transformer une image en texte:

    ![l'image d'entrée](./images/dog.png)

    ::: {style=font-size:5pt}

    ```plain
                              .o==oCoOOCCCoCCC-                                 .==-
                              =C-coCCCCCCoCCCC=                                co=:.
                              :Cc=oCCCCCCCCCCOCc                              -Co--.
                            .oOCcoOCCCCCCCoCCCOc:                           .oCo--:
                            .cOOccooCCCCoooCCCOCo                          :==o==::
                              COOo=oooooCCoCCCCOOOc                        :c==c---:
                            --cOOCcooCoCCoooCCCOOCO=                     --=cccc-==:
                            cOOOCcooooooCCCCCOOCOOC:                   :oc=o=cc=cc
                            coOOOocooooooCCCCOOOCOOCc.                :=cccc=c-cco=
                          .=OOOOocoocooCCCCCCOOCCCooo-c:.::.        .==cocccccccC=
                            :CO8OCococ=cooCCOOCCCCooCOCo=oooc-.      =cc=-=coc--oo=.
                            coOOOCooc===ccooCCCoCoooOCooCoCOOoc=-:..:=-=--cccc--=c=.
                            oOOOOOoccc=c=ooooooocoCCoCoooOOCoccc=:.:::::::::-:::-::.
                          .=CO8OOOOoooocccocococ=cCcocoCOOOCCoc-::..--::--::::==-----:::.
                            :oO8OCoOOCooocooccccC==occoOOOOOOCc=::...::::...:--:..:---=-:-==--....
                          .=O88OCoOCOOCCccooccooococCCO8OOOCc=:...:.::......   .......::=--cc=--::     .
                            -o888O=-oOOCCccCoooocCCCCOOOOOOCo-:.        ...::::.  :--::::::=oCCo====. .:-.
                          .=O888OO=.ccoooCCCCoo=CoCCOOOOOOCo:       .....  ..:.:. .....-==cCOoocCo:-:  :=cc
                          :oO8888OC=:-=c=oCOOCCoCCCOOOOOOOOCc. ..   ..     .   ....  :-ccccCOOCoooo=-.  .-c
                          :oO88888Oc=o=:-ccCoCCOOOCOOOOCOOOOc.          ...  ..  .-:-==-:.:cCCooccc=::.   --
                          :oOOOO8OOOCc=Co-::c=oCOOoCCOOOCOOOO=.   .::..     ..   ...:=--==coCOOc==-:=--::   .:
                          :oCOOOO888OCCCc-:=-.=O88OCCCCCOOOOC- .......  ..  .......:-=oooo==-=OOocc-------. .
                        .cOOOOOOOO88OOOOOCo=:-COOOCCcCCOOOOo.    ..::...:--:. ..----==coo-:-=oCC===----===:........
                        .=COOOOOOOCOOOO88OOCcoC888OocOOCOOCo-.  ..    .:-::-:::-cc=-==cc-:---:---::-=::-coc=:..:..........    ......
                      .=oCOOO888OCO888OOOO88888888OO8OOOCc:::......:--:.:==--ooc==cc=--==-::::::..::..:-ooc-..:.... ..::....::.......::----:...
                      :=cCOOOOOO88OCCO888OO88OC888888OOOCo=-. ...::.::------cc=occooc==--::........... ..:=oc:...:. .:::::-:::::..::=----======-::..
                    .:=oCCOOOOOO888OOOO88OOOCOO8888888OOC=:..... ..:::::-:-==ccooooooooooc=--:........ .  =c-:-=::-=-::--::---:-=cooCCoooocc=--:...
                  :-cooCCOOO88O8888OCCO88OOOCO88888OOOCo--::.:......:.:-=====cc==coCCocoCoc=:-:.:-.. .....=-=-c==c===-=c=---==--cCooCCCoocoo===--::--:.
                ..:=coCCCCOOO888888OOOOOOOOOOO8888888OCo==-:::::::.::--::-:=c====coooCoCoooc-=---:-:...:::-c=-==.=-===cc=ccc====cccoCCOOCooCCo-oooooCOOo=.
              .:-=ccoCCCCCOO8OOOO888888OOOOOO88888OCCCoo=--:::.....:::--::--=====-=ocoo===cCo=---:.:-=--::=c--c-:=--=coooc=coo=cccoooCCCCCocooCCCCCoOOOo=:
            .:-=ccooooCCCCOO8888888O888888888888OOOOCoocc===--::::::.:-------==--=-:=oOCooc====--==c==-:---=:=COC==ccoCooCCocoococ=occCCCCoooo=oCCCCoc=--.
          .:--=cccccoooCCCCOO888888O888888888888OOOCocccc====-:.:---:.::--==--=====cc===cooCccccc==-co==-=ooccooooooCCCCCCooooocccccoooCCCCCooCooc==:---=.
        .::-=ccoooocccooooCCO8888888888888O88OOOOOCooCooccc=:.:::::..::--=-=-==--=-coCCCCoCCCCcccc=-=ooccc-coCCOCCoooCoccocccooooooCooooooCCoCCooococ==c-
      .:--=ccooooocccccccooCCOOOOO888888888OO8OOOCCooccc==-:-::::...:--c=-----==-======cooCCoooCoooooooCCCCCcooOCCCCCCoooooCocooccoocccccocccooooocccc=:
    .:-==cooooocccccc==ccooCCooCCOOOO88888OOOCCCoc=:-=--:::..  .:-=--=ccc-=-=====c=ccoCCCCCOOCCOCoooCCoccCCC8OOOOOOOCCOCCCCooCCCCo=cocccc=cccccoocc==.
    :-==ccoooooccccccccccccccooooooooCOO888OCocc==-.:=:.:-::.:::::::::--cc===-ccccccCCCCOOOOOOO8OOO8OOO8OOOOOOOOO8OOOOCCCCCCCCocoCoocoooooccc=cccc=--:
    :=ccooooooocccccccc==cccccccooooCCCCCCoooccc=-===..-::...:::::..:::cc=====ccoooCCCOOOOO888888OOOO8OOOOOOOOOOOOOOOOOOOOOCCCCCCCooCCooooooc======-.
    -coCoooooooooccccc==ccccc==ccoooooCCOOCoccoc=cc=:::-:. . .. . .::---=--===coCCCOOCOOO88888888888O8888OO888888OOOOOOOOOOOCCCCCCCCoooooocccccc=-.
    =oooooooooocccccc=====cccccccccoooooCOOocc=ccc-----:.:::.....:==oCc-:::==coCOOOOO88O88888888888888888888OOOO88OOOOOOOOOOOCCCCCCCCoooooccc=:.
    coCCCCoooooocccccc===ccccccccccccocoCOOCCCo=------:-----::.---==coo===coCCCO8888O888888888888888888888888OOOOOOOOOOOOOCCCCCCCCocccc=--:.
    cooooCCoooocccoccccccc===cccc===cccoCOOOO=-==--::--===::::----===cc==coCCoOOO88OO8OO8888888888888OO8888OOOOOOOOOOOOCCCCCCCCoc=-.
    cCCCCooooooooccccccccccccccccccccccoooCCo=-==-----=--:==ccooc==coo-=-==oCO888OO8888888888888888OOOOOOOOOOOCCCCCCCCCCoo=--..
    cCCCCCCoooooooooooocooccccccccccccccooCOCocc=--====-:-=ccccc==ccoco=--ccoCOO88888888888888OOOOCCoc-=OOCCOCoccccccccoooc-.
    cCCCCCCooooooooccccocccccccoooocccccccooocooooc-:-==c--=c-===cooooc-=-cooCC88O8OO8888888O88OCCCo--..-CCCoCCo====ccccccccc=-.
    cCCCCCooooooocccccocccccooocoocc==cccooCOCCCCc==::-=::-=ccoocooCCCCoooOOO88OO8888888888O88O8OOOOCCooco=-.:oOoc====c====cc===-:.::-=-.
    cCCCCCCooooocoocccccccoooooooco===ccccooCCCCo===----:.:=cccooCCCCCoCoO888888888888@888OOO8OOOO88OOOOOCoocccCoccoc==-=======-.  .:::-:
    coooooooooooooooccccooCoooooooc--==c=cooooCCCoooC==-:--===-=ccoCCCOCOO88888888@8888@88OOOO8OOOOOOOOO8OOOOOOOCCCoooocc===-=-:   -.....
    coooooooooooocoooocoooooooCoocc=cc===cocccoCCCOCo-c:-:==-:-==ccoooCOOOO888O8888@@888@8OOOOOO888OOOOOOOOOOCCCCooooooooocooc-:..:=:
    =oooooooccccccocccooooooooCCooc=====ccc=ccooCCCCo=o--.---=::ccoooCCCOO888O8888888888@@8OOOOOOOOOOOOOOOOOCCCCooooooooooooooooc=-:..::..
    cCCooooocccccoccccoccocoooCCoc--==c=c=ccoocoooooOoc=.=.:=----=oCooCCOOO88C888888888888888OOOOCCCCCCCCCCCCCCCCCCCCCoooCooooooocc====---.
    cCCoooooccooo==ocooooccooCCCoccccc==oo=coc=coocCCoo===-:c=-:-=c==cooCCOOOC88@@@8888888888888OOOOOOOCOOOOOOOOCCCoooocooooooooococccc=-
    cCoooocoooccccoccoooooocoooCCo=c=c=ooocooco=cccoooocCoccc==--c=-:-ccooCOO888@@@@@888888888888888888OOOOOOOOCCCCCCCooCoooocc=c====-:.
    cCCCooocc==ccccccocooc=cooooococooooooccc=o=Cccoccoooooccc====:.--=cccoCC88888@@@888888888888OOOOOooc=ccoCCCCCoCooooocccccc=c==--.
    cCCCCCoocc=-====cccoocoooooooccoCCcooccococooCooooccococc=-.:==--.:--cooCOOOO8888O88888@@@@8888OOC=:.     ::-:-:::.::.::::-:..
    coCCCCoooccccccccc=ooooooocoooooCoooooooooocCCoooocc=c==o==::==----cc=cooooCOOOOCCCO88888888888OCCc...
    =cccooCCCoooccccc=cccoccococooooocoCCcooooooOoooooccc==-====:-...::-=c=oCCCCoCOOCoCO88888888OOCCo:::.
    =coccooCCCOooc==cccccccccccccooccooCCooccoocCocooooooc=c-.----=:.:---==oocooCCooCCCO8888888OOCooC=  ...
    =cccccoooCCoooCCoc=cccccccccocococooCOooooCooCoooc=oCCo=o=::::-c-:-::c==-ccccoooooCCO88888OCCCo=-=:
    -=====cccoCoCCCCCCoocc=coocccccoCccoooooooooooCoooc=ooCCocc-:-::==-ccc--cccooocccoCOO888888OCccC:.::                     ...             .:
    :--=--==cccoooCCCCCoccooCooc=ccooccccccooooooooooooococooooocc=c---=cccc=occcccccoCO8888888OCoc:=.  . ..   ..   ..... ....:..            .:::...
    ```

    :::

    :::caption
    Le résultat
    :::

    L'image devra être lue dans un fichier au format PGM. Voici un exemple de fichier PGM:

    ```plain
    P2
    4 3
    255
    0
    85
    170
    255
    0
    85
    170
    255
    0
    85
    170
    255
    ```

    Un fichier PGM est structuré comme suit:

    - il commence toujours par P2,
    - il contient ensuite la taille (largeur hauteur) de l'image,
    - il contient ensuite la valeur maximale d'un niveau de gris (normalement 255),
    - il contient ensuite les niveaux de gris de chaque pixel de l'image (de gauche à droite et de haut en bas).

    Télécharger le fichier [dog.pgm](./images/dog.pgm)

    Le résultat devra être écrit dans un fichier de sortie.

    Pour convertir les niveaux de gris en caractères, vous pouvez utiliser le tableau de correspondance suivant:

    | Niveaux de gris | Caractère     |
    | --------------- | ------------- |
    | de 0 à 22       | @             |
    | de 23 à 45      | 8             |
    | de 46 à 68      | O (majuscule) |
    | de 69 à 91      | C (majuscule) |
    | de 92 à 114     | o (minuscule) |
    | de 115 à 137    | c (minuscule) |
    | de 138 à 160    | =             |
    | de 161 à 183    | -             |
    | de 184 à 206    | :             |
    | de 207 à 229    | .             |
    | de 230 à 255    | (espace)      |

    **Remarques:**

    - dans le résultat d'exemple ci-dessus, chaque caractère correspond au **niveau de gris moyen** d'un groupe de pixels (4 x 8). Ceci afin que le résultat sous forme de texte ne soit pas trop grand.
    - Un vrai fichier PGM peut contenir des commentaires commençant par #:

      ```plain
      P2
      4 3
      # file created by LUR
      255
      0
      85
      170
      255
      0
      85
      170
      255
      0
      85
      170
      255
      ```

      Essayez de faire en sorte que votre programme supporte les fichiers contenant des commentaires.
