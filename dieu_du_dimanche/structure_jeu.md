# Structure du jeu "Dieu du Dimanche"

## Concept général
"Dieu du Dimanche" est un jeu humoristique où le joueur incarne un dieu en pantoufles qui gère une mini-planète. Chaque dimanche, le joueur doit prendre une décision absurde qui affectera l'évolution de sa civilisation. Le jeu se veut drôle, imprévisible et addictif grâce aux conséquences en chaîne des décisions divines.

## Structure technique

### Organisation des fichiers
```
dieu_du_dimanche/
├── index.html              # Page principale du jeu
├── css/
│   ├── style.css           # Styles principaux
│   ├── animations.css      # Animations et transitions
│   └── responsive.css      # Adaptations pour différents écrans
├── js/
│   ├── main.js             # Initialisation et boucle principale
│   ├── god.js              # Gestion du dieu et des décisions
│   ├── planet.js           # Gestion de la planète et civilisation
│   ├── events.js           # Système d'événements et conséquences
│   ├── ui.js               # Interface utilisateur et animations
│   ├── storage.js          # Système de sauvegarde (local/en ligne)
│   └── data.js             # Données du jeu (choix, événements, etc.)
├── assets/
│   ├── images/             # Images et sprites
│   ├── sounds/             # Sons et musiques
│   └── fonts/              # Polices personnalisées
└── server/                 # Pour la version en ligne (optionnel)
    ├── app.js              # Serveur Node.js simple
    └── db.json             # Stockage des données
```

## Mécaniques de jeu principales

### 1. Système de choix divins
- Chaque "dimanche" (tour de jeu), le joueur se voit proposer 3-4 choix absurdes
- Les choix sont générés aléatoirement à partir d'une banque de possibilités
- Possibilité de créer des choix personnalisés
- Interface de choix avec animations amusantes
- Timer optionnel pour ajouter de la pression

### 2. Évolution de la civilisation
- La planète commence avec une civilisation primitive
- Chaque décision modifie des paramètres cachés (technologie, bonheur, chaos, etc.)
- Évolution visuelle de la planète selon les décisions (bâtiments, paysages, créatures)
- Événements narratifs décrivant les conséquences des choix
- Possibilité d'extinction de la civilisation (game over amusant)

### 3. Système de conséquences en chaîne
- Chaque décision a des effets immédiats ET à long terme
- Certaines combinaisons de décisions débloquent des événements spéciaux
- Système de "mémoire" où les décisions passées influencent les options futures
- Conséquences parfois totalement imprévisibles et absurdes

### 4. Choix majeurs et arcs narratifs
- Des quêtes proposent régulièrement des embranchements décisifs
- Plusieurs décisions successives peuvent déclencher un arc narratif unique (utopie, apocalypse, etc.)
- Chaque arc modifie durablement la planète et débloque des récompenses spécifiques

### 5. Statistiques et progression
- Tableau de bord divin avec statistiques humoristiques
- Niveaux de divinité à débloquer (Dieu Stagiaire → Dieu Suprême)
- Médailles et récompenses pour certaines combinaisons ou situations
- Historique des décisions et leurs conséquences

### 6. Sauvegarde et partage
- Sauvegarde automatique locale (localStorage)
- Option de sauvegarde en ligne (pour la version serveur)
- Possibilité de partager sa planète sur les réseaux sociaux
- Codes de partage pour comparer les résultats entre amis

## Interface utilisateur

### Écran principal
- Vue de la planète au centre (interactive et animée)
- Panneau latéral avec informations sur la civilisation
- Compteur de jours/semaines/années écoulés
- Indicateurs d'état de la planète (humoristiques)

### Écran de décision dominicale
- Présentation théâtrale du choix à faire
- Options présentées de manière visuelle et amusante
- Animations lors de la sélection
- Effets sonores décalés

### Écran de conséquences
- Animation montrant l'impact de la décision
- Texte narratif humoristique décrivant les conséquences
- Mise à jour visuelle de la planète

## Style graphique et ambiance
- Style cartoon coloré et exagéré
- Animations fluides mais pas trop complexes
- Éléments visuels absurdes (vaches volantes, océans de gelée, etc.)
- Interface avec éléments "divins" (nuages, rayons de lumière, etc.)
- Effets visuels pour les événements majeurs
- Palette de couleurs vives et contrastées

## Modes de jeu
- Mode histoire : Suivre l'évolution de sa planète sur une longue période
- Mode défi : Objectifs spécifiques à atteindre (ex: "Créer une civilisation qui vénère les patates")
- Mode bac à sable : Liberté totale sans conditions de game over

## Fonctionnalités techniques spécifiques
- Système de sauvegarde hybride (local/serveur)
- Génération procédurale de certains événements
- Animations CSS/JS optimisées
- Responsive design pour tous les écrans
- Système de son avec musique d'ambiance décalée
