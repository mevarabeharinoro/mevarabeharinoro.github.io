# Portfolio de Meva

Site statique (HTML, CSS, JavaScript), sans dépendance ni étape de build : rapide, bon pour le SEO, hébergeable gratuitement.

## Arborescence
```
v2/
├── index.html        # Toutes les sections + SEO (meta, Open Graph, JSON-LD)
├── css/style.css     # Design (palette en variables CSS en haut du fichier)
├── js/main.js        # Sélecteur FR/EN, menu mobile, animations, formulaire
├── assets/avatar.svg
├── robots.txt
└── README.md
```

## Tester en local
Ouvrez `index.html` dans le navigateur, ou lancez `python3 -m http.server` dans le dossier.

## Déploiement
**GitHub Pages** : créez un dépôt `mevarabeharinoro.github.io`, poussez les fichiers à la racine, puis *Settings → Pages → Deploy from a branch → main / root*.
**Netlify** : *Add new site → Deploy manually* et glissez le dossier, ou connectez le dépôt (build command vide, publish directory `.`).

## À personnaliser
1. Formulaire : créez un formulaire sur formspree.io et remplacez `VOTRE_ID` dans `index.html`. Sur Netlify, vous pouvez aussi utiliser Netlify Forms (`data-netlify="true"`).
2. Projets : vérifiez les technos marquées `TODO`, mettez les vrais liens (démo/GitHub) et remplacez les emojis par des captures (`.webp`, avec `alt`).
3. URL : mettez à jour `<link rel="canonical">` avec votre adresse finale.
4. Traductions : l'anglais est dans l'objet `EN` de `js/main.js`.
