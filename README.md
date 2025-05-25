# Dieu du Dimanche

Ce dépôt contient le prototype du jeu web **Dieu du Dimanche**. Le jeu se lance dans un navigateur et peut être exécuté localement via un petit serveur HTTP.

## Lancer le jeu

1. Assurez-vous d'avoir Node.js et npm installés sur votre machine.
2. Clonez ce dépôt puis exécutez le script `setup.sh` :

```bash
./setup.sh
```

Ce script installe les dépendances npm et lance un serveur local grâce au paquet `http-server`. Par défaut, le jeu est accessible sur `http://localhost:8080`.

Vous pouvez également lancer manuellement les commandes suivantes :

```bash
npm install
npm start
```

Le jeu se trouve dans le dossier `dieu_du_dimanche/` et ne nécessite aucune étape de compilation.
