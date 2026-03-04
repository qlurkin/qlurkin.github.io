---
title: Cours 3
subtitle: Expressions régulières
author: Quentin Lurkin
type: deck
typst: true
---

## Validation de données

- Important de **valider** les inputs [Données entrées par le user, provenant de
  fichiers, du réseau...]{.small}
- **Formatage** des données [Via un parser qui produit une erreur en cas de
  format invalide]{.small}
- Vérifier les données avec une **expression régulière** (module `re`) [La
  donnée suit-elle un motif prédéfini ?]{.small}

## Exemple: numéros de téléphone

- Numéro de téléphone de la forme `xxxx/xx.xx.xx` [Où `x` sont des
  chiffres]{.small}

  ```python
  import re

  pattern = r'[0-9]{4}/[0-9]{2}\.[0-9]{2}\.[0-9]{2}'
  p = re.compile(pattern)

  print(p.match('0394/83.31.41'))
  print(p.match('0394/83-31-41'))
  ```

  ```terminal
  <_sre.SRE_Match object; span=(0, 13), match='0394/83.31.41'>
  None
  ```
