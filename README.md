# Portfolio — [Ton Nom]

Portfolio dynamique en HTML/CSS/JS vanilla. Les projets sont chargés depuis `data/projects.json`.

## Installation locale
Comme le JSON est chargé via `fetch`, il faut un serveur local (pas d'ouverture directe du fichier) :

```bash
# Option 1 : Python
python3 -m http.server 8000

# Option 2 : Node
npx serve .