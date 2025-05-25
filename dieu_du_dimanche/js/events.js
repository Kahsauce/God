// Gestion des événements et des conséquences pour "Dieu du Dimanche"

class EventManager {
    constructor(planet) {
        this.planet = planet;
        this.currentDay = 1;
        this.isSunday = true; // Le jeu commence un dimanche
        this.currentChoices = [];
        this.lastChoice = null;
        this.lastConsequence = null;
    }
    
    // Avance d'un jour
    advanceDay() {
        this.currentDay++;
        this.isSunday = this.currentDay % 7 === 1; // Tous les 7 jours c'est dimanche (1, 8, 15, etc.)
        
        // Si ce n'est pas dimanche, possibilité d'événement aléatoire
        if (!this.isSunday) {
            return this.planet.generateRandomEvent(this.currentDay);
        }
        
        return null;
    }
    
    // Génère des choix pour le dimanche
    generateSundayChoices() {
        if (!this.isSunday) return [];
        
        // Sélectionne 3 choix aléatoires différents
        const availableChoices = [...DIVINE_CHOICES];
        const selectedChoices = [];
        
        for (let i = 0; i < 3; i++) {
            if (availableChoices.length === 0) break;
            
            const randomIndex = Math.floor(Math.random() * availableChoices.length);
            selectedChoices.push(availableChoices[randomIndex]);
            availableChoices.splice(randomIndex, 1);
        }
        
        this.currentChoices = selectedChoices;
        return selectedChoices;
    }
    
    // Applique les conséquences d'un choix
    applyChoice(choiceId, godClass = null) {
        const choice = this.currentChoices.find(c => c.id === choiceId);
        if (!choice) return null;
        
        this.lastChoice = choice;
        this.lastConsequence = choice.consequences;
        
        // Ajoute l'événement à l'historique de la planète
        this.planet.addToHistory({
            day: this.currentDay,
            type: "divine",
            description: `Décision divine : ${choice.text}`
        });
        
        // Applique les effets sur la planète
        let consequences = JSON.parse(JSON.stringify(choice.consequences));
        if (godClass && godClass.modifiers) {
            Object.keys(godClass.modifiers).forEach(stat => {
                consequences.stats[stat] = (consequences.stats[stat] || 0) + godClass.modifiers[stat];
            });
        }

        const newStats = this.planet.updateStats(consequences);

        return {
            choice: choice,
            consequences: consequences,
            newStats: newStats
        };
    }
    
    // Vérifie si des réalisations ont été débloquées
    checkAchievements(gameState) {
        const unlockedAchievements = [];
        
        // Parcourt toutes les réalisations
        ACHIEVEMENTS.forEach(achievement => {
            // Si déjà débloquée, on passe
            if (gameState.achievements[achievement.id]) return;
            
            let isUnlocked = false;
            
            // Vérifie les conditions de déblocage
            switch(achievement.id) {
                case "first_choice":
                    isUnlocked = gameState.daysPassed >= 1;
                    break;
                case "chaos_master":
                    isUnlocked = this.planet.stats.chaos >= 100;
                    break;
                case "harmony":
                    isUnlocked = Object.values(this.planet.stats).every(stat => stat >= 50);
                    break;
                case "extinction":
                    isUnlocked = this.planet.isExtinct;
                    break;
                case "utopia":
                    isUnlocked = this.planet.stats.happiness >= 100 && this.planet.stats.chaos >= 50;
                    break;
                case "week_streak":
                    isUnlocked = gameState.daysPassed >= 7;
                    break;
            }
            
            // Si débloquée, on l'ajoute à la liste
            if (isUnlocked) {
                gameState.achievements[achievement.id] = true;
                unlockedAchievements.push(achievement);
            }
        });
        
        return unlockedAchievements;
    }
    
    // Génère une description des conséquences
    generateConsequenceDescription(immediate = true) {
        if (!this.lastConsequence) return "";
        
        return immediate ? this.lastConsequence.immediate : this.lastConsequence.longTerm;
    }
    
    // Vérifie si le joueur peut monter de niveau
    checkGodLevelUp(currentLevel, daysPassed) {
        for (let i = GOD_LEVELS.length - 1; i >= 0; i--) {
            const level = GOD_LEVELS[i];
            if (daysPassed >= level.minDays && i > currentLevel) {
                return {
                    newLevel: i,
                    levelInfo: level
                };
            }
        }
        return null;
    }
}
