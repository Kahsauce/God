// Script principal pour "Dieu du Dimanche"

// Instances principales
let ui;
let storageManager;
let planet;
let eventManager;
let godManager;

// Initialisation du jeu
function initGame() {
    console.log("Initialisation du jeu Dieu du Dimanche");
    
    // Création des instances
    ui = new UI();
    storageManager = new StorageManager();
    planet = new Planet();
    eventManager = new EventManager(planet);
    godManager = new GodManager();
    
    // Vérifie si une sauvegarde existe
    const hasSave = storageManager.hasSaveGame();
    ui.updateContinueButton(hasSave);
    
    // Initialise les écouteurs d'événements
    ui.initEventListeners({
        onNewGame: startNewGame,
        onContinue: continueGame,
        onNextSunday: handleNextDay,
        onContinueAfterConsequence: handleContinueAfterConsequence,
        onSaveGame: saveGame
    });
    
    // Ajoute les écouteurs pour les choix divins (délégation d'événements)
    ui.elements.choicesContainer.addEventListener('click', (event) => {
        const choiceBtn = event.target.closest('.choice-btn');
        if (choiceBtn) {
            const choiceId = parseInt(choiceBtn.dataset.choiceId);
            handleDivineChoice(choiceId);
        }
    });
}

// Démarre une nouvelle partie
function startNewGame() {
    console.log("Démarrage d'une nouvelle partie");
    
    // Réinitialise les instances
    planet = new Planet();
    eventManager = new EventManager(planet);
    godManager = new GodManager();
    
    // Met à jour l'interface
    ui.updateStats(planet.stats);
    ui.updateDayCounter(eventManager.currentDay);
    ui.updateGodLevel(godManager.getCurrentLevel().name);
    ui.updatePlanetElements(planet.elements);
    ui.updateNarrative("Bienvenue, ô Dieu en Pantoufles ! Votre mini-planète attend vos ordres divins.");
    
    // Affiche l'écran de jeu
    ui.showScreen('game');
}

// Continue une partie sauvegardée
function continueGame() {
    console.log("Chargement d'une partie sauvegardée");
    
    // Charge la sauvegarde
    const savedGame = storageManager.loadGame();
    if (!savedGame) {
        ui.showNotification("Impossible de charger la sauvegarde", "error");
        return;
    }
    
    // Réinitialise les instances
    planet = new Planet();
    eventManager = new EventManager(planet);
    godManager = new GodManager();
    
    // Charge l'état du jeu
    godManager.loadGameState(savedGame, planet, eventManager);
    
    // Met à jour l'interface
    ui.updateStats(planet.stats);
    ui.updateDayCounter(eventManager.currentDay);
    ui.updateGodLevel(godManager.getCurrentLevel().name);
    ui.updatePlanetElements(planet.elements);
    ui.updateNarrative(planet.generateDescription());
    
    // Affiche l'écran de jeu
    ui.showScreen('game');
}

// Gère le passage au jour suivant
function handleNextDay() {
    console.log("Passage au jour suivant");
    
    // Si c'est dimanche, on affiche l'écran de décision
    if (eventManager.isSunday) {
        const choices = eventManager.generateSundayChoices();
        ui.displayChoices(choices);
        ui.showScreen('decision');
    } else {
        // Sinon, on avance simplement d'un jour
        const randomEvent = eventManager.advanceDay();
        godManager.daysPassed++;
        
        // Met à jour l'interface
        ui.updateDayCounter(eventManager.currentDay);
        
        // Vérifie si un événement aléatoire s'est produit
        if (randomEvent) {
            ui.displayConsequences(randomEvent.description);
            ui.showScreen('consequence');
        }
        
        // Vérifie si le joueur peut monter de niveau
        const levelUp = godManager.checkLevelUp();
        if (levelUp) {
            ui.showLevelUp(levelUp.levelInfo);
            ui.updateGodLevel(levelUp.levelInfo.name);
        }
        
        // Vérifie si des réalisations ont été débloquées
        const gameState = godManager.createGameState(planet, eventManager);
        const unlockedAchievements = eventManager.checkAchievements(gameState);
        unlockedAchievements.forEach(achievement => {
            ui.showAchievement(achievement);
        });
        
        // Met à jour la description narrative
        ui.updateNarrative(planet.generateDescription());
        ui.updatePlanetElements(planet.elements);
        ui.updateStats(planet.stats);
    }
}

// Gère un choix divin
function handleDivineChoice(choiceId) {
    console.log(`Choix divin sélectionné: ${choiceId}`);
    
    // Applique le choix
    const result = eventManager.applyChoice(choiceId);
    if (!result) return;
    
    // Incrémente le compteur de jours
    eventManager.advanceDay();
    godManager.daysPassed++;
    
    // Affiche les conséquences immédiates
    ui.displayConsequences(result.consequences.immediate);
    ui.showScreen('consequence');
    
    // Sauvegarde automatique
    saveGame();
}

// Gère la continuation après avoir vu les conséquences
function handleContinueAfterConsequence() {
    console.log("Continuation après conséquences");
    
    // Vérifie si la civilisation est éteinte
    if (planet.isExtinct) {
        ui.updateNarrative("Votre civilisation s'est éteinte ! Vous pouvez recommencer une nouvelle partie.");
        ui.showScreen('game');
        return;
    }
    
    // Met à jour l'interface
    ui.updateDayCounter(eventManager.currentDay);
    ui.updatePlanetElements(planet.elements);
    ui.updateStats(planet.stats);
    ui.updateNarrative(planet.generateDescription());
    
    // Vérifie si le joueur peut monter de niveau
    const levelUp = godManager.checkLevelUp();
    if (levelUp) {
        ui.showLevelUp(levelUp.levelInfo);
        ui.updateGodLevel(levelUp.levelInfo.name);
    }
    
    // Vérifie si des réalisations ont été débloquées
    const gameState = godManager.createGameState(planet, eventManager);
    const unlockedAchievements = eventManager.checkAchievements(gameState);
    unlockedAchievements.forEach(achievement => {
        ui.showAchievement(achievement);
    });
    
    // Retourne à l'écran de jeu
    ui.showScreen('game');
}

// Sauvegarde la partie
function saveGame() {
    console.log("Sauvegarde de la partie");
    
    const gameState = godManager.createGameState(planet, eventManager);
    const success = storageManager.saveGame(gameState);
    
    if (success) {
        ui.showNotification("Partie sauvegardée avec succès", "success");
        ui.updateContinueButton(true);
    } else {
        ui.showNotification("Erreur lors de la sauvegarde", "error");
    }
}

// Initialise le jeu au chargement de la page
document.addEventListener('DOMContentLoaded', initGame);
