// Gestion de la planète et de la civilisation pour "Dieu du Dimanche"

class Planet {
    constructor() {
        // Statistiques de base de la planète
        this.stats = {
            nature: 50,      // Environnement et écosystèmes
            civilization: 50, // Niveau de développement
            chaos: 20,       // Niveau de désordre et d'imprévisibilité
            happiness: 70    // Bonheur des habitants
        };
        
        // Éléments visuels actuellement présents sur la planète
        this.elements = [];
        
        // Historique des événements
        this.history = [];
        
        // État de la civilisation
        this.isExtinct = false;
        
        // Initialisation des éléments visuels de base
        this.updateVisualElements();
    }
    
    // Met à jour les statistiques de la planète en fonction des conséquences d'une décision
    updateStats(consequences) {
        const { nature, civilization, chaos, happiness } = consequences.stats;
        
        // Mise à jour des stats avec limites min/max (0-100)
        this.stats.nature = Math.max(0, Math.min(100, this.stats.nature + nature));
        this.stats.civilization = Math.max(0, Math.min(100, this.stats.civilization + civilization));
        this.stats.chaos = Math.max(0, Math.min(100, this.stats.chaos + chaos));
        this.stats.happiness = Math.max(0, Math.min(100, this.stats.happiness + happiness));
        
        // Vérification de l'extinction
        this.checkExtinction();
        
        // Mise à jour des éléments visuels
        this.updateVisualElements();
        
        return this.stats;
    }
    
    // Vérifie si la civilisation est éteinte
    checkExtinction() {
        // La civilisation s'éteint si le bonheur est trop bas ou si le chaos est trop élevé
        if (this.stats.happiness <= 10 || (this.stats.chaos >= 90 && this.stats.civilization <= 20)) {
            this.isExtinct = true;
            return true;
        }
        return false;
    }
    
    // Met à jour les éléments visuels sur la planète en fonction des statistiques
    updateVisualElements() {
        this.elements = [];
        
        // Ajoute des éléments visuels en fonction des seuils atteints pour chaque statistique
        Object.keys(this.stats).forEach(statName => {
            const statValue = this.stats[statName];
            const statElements = PLANET_ELEMENTS[statName];
            
            if (statElements) {
                statElements.forEach(element => {
                    if (statValue >= element.threshold) {
                        this.elements.push({
                            type: statName,
                            name: element.name,
                            emoji: element.emoji,
                            value: statValue
                        });
                    }
                });
            }
        });
        
        return this.elements;
    }
    
    // Ajoute un événement à l'historique de la planète
    addToHistory(event) {
        this.history.push({
            day: event.day,
            type: event.type,
            description: event.description
        });
        
        // Limite l'historique aux 50 derniers événements
        if (this.history.length > 50) {
            this.history.shift();
        }
    }
    
    // Génère une description de l'état actuel de la planète
    generateDescription() {
        let description = "";
        
        if (this.isExtinct) {
            return "Votre civilisation s'est éteinte. La planète est silencieuse, attendant qu'une nouvelle forme de vie émerge... ou qu'un dieu en pantoufles décide de tout recommencer.";
        }
        
        // Description basée sur les statistiques dominantes
        const dominantStat = this.getDominantStat();
        
        switch(dominantStat) {
            case "nature":
                description = "Votre planète est un paradis naturel luxuriant. La végétation prospère et les animaux vivent en harmonie.";
                break;
            case "civilization":
                description = "La civilisation de votre planète est florissante. Des villes impressionnantes s'élèvent et la technologie progresse rapidement.";
                break;
            case "chaos":
                description = "Votre planète est dans un état de chaos constant. L'imprévisible est devenu la norme et les habitants s'adaptent tant bien que mal.";
                break;
            case "happiness":
                description = "Les habitants de votre planète sont extraordinairement heureux. Ils célèbrent régulièrement votre divine absurdité.";
                break;
        }
        
        // Ajout de détails basés sur des combinaisons de statistiques
        if (this.stats.chaos > 70 && this.stats.civilization > 70) {
            description += " La technologie est avancée mais imprévisible, créant des gadgets aussi utiles que bizarres.";
        }
        
        if (this.stats.nature > 70 && this.stats.happiness > 70) {
            description += " Les habitants vivent en harmonie avec la nature et organisent des festivals en l'honneur des arbres parlants.";
        }
        
        if (this.stats.civilization < 30 && this.stats.chaos > 60) {
            description += " Les rares structures construites défient les lois de la physique et changent parfois de forme sans prévenir.";
        }
        
        return description;
    }
    
    // Détermine la statistique dominante
    getDominantStat() {
        let maxStat = "happiness";
        let maxValue = this.stats.happiness;
        
        Object.keys(this.stats).forEach(stat => {
            if (this.stats[stat] > maxValue) {
                maxValue = this.stats[stat];
                maxStat = stat;
            }
        });
        
        return maxStat;
    }
    
    // Génère un événement aléatoire
    generateRandomEvent(day) {
        // 20% de chance d'avoir un événement aléatoire
        if (Math.random() < 0.2) {
            const randomIndex = Math.floor(Math.random() * RANDOM_EVENTS.length);
            const event = RANDOM_EVENTS[randomIndex];
            
            // Ajoute l'événement à l'historique
            this.addToHistory({
                day: day,
                type: "random",
                description: event.title + " - " + event.description
            });
            
            // Applique les effets de l'événement
            this.updateStats({ stats: event.stats });
            
            return event;
        }
        
        return null;
    }
}
