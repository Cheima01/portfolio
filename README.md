# Portfolio — Cheima Ghanmi

Portfolio de Cheima Ghanmi, testeuse logiciel / ingénieure Test & Validation.

## Lancer le site en local

Le portfolio charge des fichiers JSON avec `fetch()`. Il doit donc être lancé via un serveur HTTP local et non directement avec `file://`.

Avec Python :

```powershell
python -m http.server 8000
```

Puis ouvrir :

`http://localhost:8000`

## Corrections réalisées

- Correction du chargement des données JSON via serveur HTTP local.
- Correction de `apendChild()` en `appendChild()`.
- Correction de la structure de `skills.json` : la clé `title ` contenait un espace et le texte de la dernière compétence était placé dans la mauvaise propriété.
- Ajout de Font Awesome pour les icônes de contact.
- Amélioration des textes, alternatives d’images et hiérarchie des titres.
- Amélioration des contrastes et de la navigation.
- Optimisation de l’image hero en WebP et chargement différé des images secondaires.
- Ajout d’un filtre de projets.

## Projets présentés

- TOMSEN — QA & stratégie de test
- 724-events — Automatisation des tests
- JSE-Avocats
- TGMT — Siemens Mobility — Test & Validation
- SmartRails — Simulation ferroviaire
- QBL Baie de Test Sol — Siemens Mobility
- STEFFI — Développement Backend Python
