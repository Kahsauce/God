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
    godManager.assignQuest();

    // Met à jour l'interface
    ui.updateStats(planet.stats);
    ui.updateDayCounter(eventManager.currentDay);
    ui.updateGodLevel(godManager.getCurrentLevel().name);
    ui.updateXP(godManager.xp);
    ui.updateQuest(godManager.currentQuest);
    ui.updateInventory(godManager.inventory);
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
    if (!godManager.currentQuest) {
        godManager.assignQuest();
    }

    // Met à jour l'interface
    ui.updateStats(planet.stats);
    ui.updateDayCounter(eventManager.currentDay);
    ui.updateGodLevel(godManager.getCurrentLevel().name);
    ui.updateXP(godManager.xp);
    ui.updateQuest(godManager.currentQuest);
    ui.updateInventory(godManager.inventory);
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
        godManager.addXP(XP_PER_CHOICE / 2);
        
        // Met à jour l'interface
        ui.updateDayCounter(eventManager.currentDay);
        ui.updateXP(godManager.xp);
        
        // Vérifie si un événement aléatoire s'est produit
        if (randomEvent) {
            ui.displayConsequences(randomEvent.description);
            ui.showScreen('consequence');
        }

        const finishedQuest = godManager.checkQuestCompletion(planet);
        if (finishedQuest) {
            ui.showNotification(`Quête terminée : ${finishedQuest.description}`, 'achievement');
            godManager.assignQuest();
            ui.updateQuest(godManager.currentQuest);
            ui.updateInventory(godManager.inventory);
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
    const result = eventManager.applyChoice(choiceId, godManager.godClass);
    if (!result) return;

    // Animation sur le bouton choisi
    const btn = ui.elements.choicesContainer.querySelector(`[data-choice-id="${choiceId}"]`);
    if (btn) {
        btn.classList.add('decision-anim');
        setTimeout(() => btn.classList.remove('decision-anim'), 600);
    }
    
    // Incrémente le compteur de jours et ajoute de l'XP
    eventManager.advanceDay();
    godManager.daysPassed++;
    godManager.addXP(XP_PER_CHOICE);
    
    // Affiche les conséquences immédiates
    ui.displayConsequences(result.consequences.immediate, result.choice.visual);
    ui.showScreen('consequence');

    // Vérifie la quête en cours
    const finishedQuest = godManager.checkQuestCompletion(planet);
    if (finishedQuest) {
        ui.showNotification(`Quête terminée : ${finishedQuest.description}`, 'achievement');
        godManager.assignQuest();
        ui.updateQuest(godManager.currentQuest);
        ui.updateInventory(godManager.inventory);
    }

    ui.updateXP(godManager.xp);
    
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
    ui.updateXP(godManager.xp);
    ui.updateQuest(godManager.currentQuest);
    ui.updateInventory(godManager.inventory);
    
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
