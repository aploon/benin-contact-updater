## Fonctionnalités

- Importer un fichier VCF contenant des contacts
- Mettre à jour les numéros de téléphone béninois en ajoutant le préfixe `01` si nécessaire

## Installation

1. Clonez le dépôt :
   ```sh
   git clone https://github.com/aploon/benin-contact-updater.git
   cd benin-contact-updater
   ```

2. Installez les dépendances :
   ```sh
   npm install
   ```

## Utilisation

1. Démarrez le serveur de développement :
   ```sh
   npm run dev
   ```

2. Ouvrez votre navigateur et accédez à `http://localhost:5173`.

## Scripts

- `npm run dev` : Démarre le serveur de développement
- `npm run build` : Compile le projet pour la production
- `npm run lint` : Lint le code source

## Structure du projet

```plaintext
.gitignore
index.html
package.json
postcss.config.js
public/
src/
  App.tsx
  components/
    Confetti.tsx
    ContactPreview.tsx
    DownloadButton.tsx
    ErrorMessage.tsx
    FileDropzone.tsx
  index.css
  main.tsx
  types/
    Contact.ts
  utils/
    fileUtils.ts
    phoneUtils.ts
    vcfUtils.ts
  vite-env.d.ts
tailwind.config.js
tsconfig.json
tsconfig.node.json
vite.config.ts
```

## Contribuer

Les contributions sont les bienvenues ! Veuillez soumettre une pull request ou ouvrir une issue pour discuter des changements que vous souhaitez apporter.

## Licence
MIT