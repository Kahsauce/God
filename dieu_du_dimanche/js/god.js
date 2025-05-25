// Gestion du dieu et des décisions pour "Dieu du Dimanche"

class GodManager {
    constructor() {
        this.level = 0; // Niveau de dieu (index dans GOD_LEVELS)
        this.daysPassed = 0;
        this.xp = 0;
        this.inventory = [];
        this.godClass = GOD_CLASSES[0];
        this.currentQuest = null;
        this.completedQuests = [];
        this.achievements = {}; // Réalisations débloquées
        
        // Initialisation des réalisations
        ACHIEVEMENTS.forEach(achievement => {
            this.achievements[achievement.id] = false;
        });
    }
    
    // Obtient le niveau actuel du dieu
    getCurrentLevel() {
        return GOD_LEVELS[this.level];
    }
    
    // Vérifie si le dieu peut monter de niveau
    checkLevelUp() {
        for (let i = this.level + 1; i < GOD_LEVELS.length; i++) {
            if (this.daysPassed >= GOD_LEVELS[i].minDays) {
                this.level = i;
                return {
                    newLevel: i,
                    levelInfo: GOD_LEVELS[i]
                };
            }
        }
        return null;
    }
    
    // Débloque une réalisation
    unlockAchievement(achievementId) {
        if (this.achievements[achievementId] === false) {
            this.achievements[achievementId] = true;
            return ACHIEVEMENTS.find(a => a.id === achievementId);
        }
        return null;
    }
    
    // Vérifie si une réalisation est débloquée
    isAchievementUnlocked(achievementId) {
        return this.achievements[achievementId] === true;
    }
    
    // Obtient toutes les réalisations débloquées
    getUnlockedAchievements() {
        const unlockedIds = Object.keys(this.achievements).filter(id => this.achievements[id]);
        return ACHIEVEMENTS.filter(achievement => unlockedIds.includes(achievement.id));
    }
    
    // Obtient le pourcentage de réalisations débloquées
    getAchievementProgress() {
        const unlockedCount = Object.values(this.achievements).filter(Boolean).length;
        return Math.floor((unlockedCount / ACHIEVEMENTS.length) * 100);
    }
    
    // Crée un état de jeu sauvegardable
    createGameState(planet, eventManager) {
        return {
            level: this.level,
            daysPassed: this.daysPassed,
            xp: this.xp,
            inventory: [...this.inventory],
            currentQuest: this.currentQuest,
            completedQuests: [...this.completedQuests],
            achievements: {...this.achievements},
            planetStats: {...planet.stats},
            planetElements: [...planet.elements],
            planetHistory: [...planet.history],
            isExtinct: planet.isExtinct,
            currentDay: eventManager.currentDay,
            isSunday: eventManager.isSunday,
            lastSavedDate: new Date().toISOString()
        };
    }
    
    // Charge un état de jeu
    loadGameState(gameState, planet, eventManager) {
        if (!gameState) return false;
        
        // Charge les données du dieu
        this.level = gameState.level || 0;
        this.daysPassed = gameState.daysPassed || 0;
        this.xp = gameState.xp || 0;
        this.inventory = gameState.inventory || [];
        this.currentQuest = gameState.currentQuest || null;
        this.completedQuests = gameState.completedQuests || [];
        this.achievements = gameState.achievements || {};
        
        // Charge les données de la planète
        planet.stats = gameState.planetStats || {
            nature: 50,
            civilization: 50,
            chaos: 20,
            happiness: 70
        };
        planet.elements = gameState.planetElements || [];
        planet.history = gameState.planetHistory || [];
        planet.isExtinct = gameState.isExtinct || false;
        
        // Charge les données de l'événement
        eventManager.currentDay = gameState.currentDay || 1;
        eventManager.isSunday = gameState.isSunday !== undefined ? gameState.isSunday : true;

        return true;
    }

    // Ajoute de l'XP et retourne la valeur actuelle
    addXP(amount) {
        let bonus = 0;
        if (this.inventory.includes('pantoufles_sacrees')) {
            bonus = Math.floor(amount * 0.1);
        }
        this.xp += amount + bonus;
        return this.xp;
    }

    // Ajoute un objet à l'inventaire
    addItem(itemId) {
        if (!this.inventory.includes(itemId)) {
            this.inventory.push(itemId);
        }
    }

    // Assigne une nouvelle quête aléatoire
    assignQuest() {
        const available = QUESTS.filter(q => !this.completedQuests.includes(q.id));
        if (available.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * available.length);
        this.currentQuest = available[randomIndex];
        return this.currentQuest;
    }

    // Vérifie si la quête actuelle est accomplie
    checkQuestCompletion(planet) {
        if (!this.currentQuest) return null;
        const cond = this.currentQuest.condition;
        if (planet.stats[cond.stat] >= cond.min) {
            this.completedQuests.push(this.currentQuest.id);
            if (this.currentQuest.reward.xp) {
                this.addXP(this.currentQuest.reward.xp);
            }
            if (this.currentQuest.reward.artifact) {
                this.addItem(this.currentQuest.reward.artifact);
            }
            const finished = this.currentQuest;
            this.currentQuest = null;
            return finished;
        }
        return null;
    }
}
