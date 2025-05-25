// Interface utilisateur pour "Dieu du Dimanche"

class UI {
    constructor() {
        // Écrans
        this.screens = {
            welcome: document.getElementById('welcome-screen'),
            game: document.getElementById('game-screen'),
            decision: document.getElementById('decision-screen'),
            consequence: document.getElementById('consequence-screen'),
            about: document.getElementById('about-screen'),
            pauseMenu: document.getElementById('pause-menu')
        };
        
        // Éléments d'interface
        this.elements = {
            // Écran d'accueil
            newGameBtn: document.getElementById('new-game-btn'),
            continueBtn: document.getElementById('continue-btn'),
            aboutBtn: document.getElementById('about-btn'),
            
            // Écran de jeu
            godLevel: document.getElementById('god-level'),
            dayCounter: document.getElementById('day-counter'),
            natureBar: document.getElementById('nature-bar'),
            civilizationBar: document.getElementById('civilization-bar'),
            chaosBar: document.getElementById('chaos-bar'),
            happinessBar: document.getElementById('happiness-bar'),
            menuBtn: document.getElementById('menu-btn'),
            planetElements: document.getElementById('planet-elements'),
            narrative: document.getElementById('narrative'),
            nextSundayBtn: document.getElementById('next-sunday-btn'),
            
            // Écran de décision
            choicesContainer: document.querySelector('.choices-container'),
            
            // Écran de conséquences
            consequenceText: document.getElementById('consequence-text'),
            consequenceVisual: document.getElementById('consequence-visual'),
            continueToGameBtn: document.getElementById('continue-to-game-btn'),
            
            // Écran À propos
            backToMenuBtn: document.getElementById('back-to-menu-btn'),
            
            // Menu pause
            resumeBtn: document.getElementById('resume-btn'),
            saveBtn: document.getElementById('save-btn'),
            quitBtn: document.getElementById('quit-btn')
        };
        
        // État de l'interface
        this.currentScreen = 'welcome';
    }
    
    // Initialise les écouteurs d'événements
    initEventListeners(callbacks) {
        // Écran d'accueil
        this.elements.newGameBtn.addEventListener('click', callbacks.onNewGame);
        this.elements.continueBtn.addEventListener('click', callbacks.onContinue);
        this.elements.aboutBtn.addEventListener('click', () => this.showScreen('about'));
        
        // Écran de jeu
        this.elements.menuBtn.addEventListener('click', () => this.togglePauseMenu(true));
        this.elements.nextSundayBtn.addEventListener('click', callbacks.onNextSunday);
        
        // Écran de conséquences
        this.elements.continueToGameBtn.addEventListener('click', callbacks.onContinueAfterConsequence);
        
        // Écran À propos
        this.elements.backToMenuBtn.addEventListener('click', () => this.showScreen('welcome'));
        
        // Menu pause
        this.elements.resumeBtn.addEventListener('click', () => this.togglePauseMenu(false));
        this.elements.saveBtn.addEventListener('click', callbacks.onSaveGame);
        this.elements.quitBtn.addEventListener('click', () => {
            this.togglePauseMenu(false);
            this.showScreen('welcome');
        });
    }
    
    // Affiche un écran spécifique
    showScreen(screenName) {
        // Cache tous les écrans
        Object.values(this.screens).forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Affiche l'écran demandé
        if (this.screens[screenName]) {
            this.screens[screenName].classList.add('active');
            this.currentScreen = screenName;
        }
    }
    
    // Active/désactive le bouton Continuer selon qu'une sauvegarde existe
    updateContinueButton(hasSave) {
        this.elements.continueBtn.disabled = !hasSave;
    }
    
    // Met à jour les statistiques affichées
    updateStats(stats) {
        this.elements.natureBar.style.width = `${stats.nature}%`;
        this.elements.civilizationBar.style.width = `${stats.civilization}%`;
        this.elements.chaosBar.style.width = `${stats.chaos}%`;
        this.elements.happinessBar.style.width = `${stats.happiness}%`;
        
        // Animation de mise à jour
        const bars = [this.elements.natureBar, this.elements.civilizationBar, 
                     this.elements.chaosBar, this.elements.happinessBar];
        
        bars.forEach(bar => {
            bar.classList.add('updating');
            setTimeout(() => bar.classList.remove('updating'), 500);
        });
    }
    
    // Met à jour le compteur de jours
    updateDayCounter(day) {
        this.elements.dayCounter.textContent = day;
        this.elements.dayCounter.classList.add('changing');
        setTimeout(() => this.elements.dayCounter.classList.remove('changing'), 1000);
    }
    
    // Met à jour le niveau du dieu
    updateGodLevel(levelName) {
        this.elements.godLevel.textContent = levelName;
    }
    
    // Met à jour le texte narratif
    updateNarrative(text) {
        this.elements.narrative.innerHTML = `<p>${text}</p>`;
    }
    
    // Affiche les choix divins
    displayChoices(choices) {
        // Vide le conteneur
        this.elements.choicesContainer.innerHTML = '';
        
        // Ajoute chaque choix
        choices.forEach(choice => {
            const choiceBtn = document.createElement('button');
            choiceBtn.className = 'choice-btn';
            choiceBtn.textContent = choice.text;
            choiceBtn.dataset.choiceId = choice.id;
            
            this.elements.choicesContainer.appendChild(choiceBtn);
        });
        
        // Ajoute les écouteurs d'événements
        const choiceBtns = this.elements.choicesContainer.querySelectorAll('.choice-btn');
        return choiceBtns;
    }
    
    // Affiche les conséquences d'un choix
    displayConsequences(text, visualType = null) {
        this.elements.consequenceText.innerHTML = `<p>${text}</p>`;
        
        // Animation du texte
        const paragraph = this.elements.consequenceText.querySelector('p');
        paragraph.style.animationDelay = '0.2s';
        
        // Affichage visuel (à implémenter selon les besoins)
        if (visualType) {
            this.elements.consequenceVisual.innerHTML = `<div class="consequence-effect ${visualType}"></div>`;
        } else {
            this.elements.consequenceVisual.innerHTML = '';
        }
    }
    
    // Met à jour les éléments visuels de la planète
    updatePlanetElements(elements) {
        // Vide le conteneur
        this.elements.planetElements.innerHTML = '';
        
        // Ajoute chaque élément
        elements.forEach(element => {
            const planetElement = document.createElement('div');
            planetElement.className = `planet-element ${element.name} planet-event`;
            planetElement.textContent = element.emoji;
            
            // Position aléatoire sur la planète
            const angle = Math.random() * 360;
            const distance = 30 + Math.random() * 40; // Entre 30% et 70% du rayon
            
            planetElement.style.position = 'absolute';
            planetElement.style.left = `calc(50% + ${Math.cos(angle * Math.PI / 180) * distance}px)`;
            planetElement.style.top = `calc(50% + ${Math.sin(angle * Math.PI / 180) * distance}px)`;
            
            this.elements.planetElements.appendChild(planetElement);
        });
    }
    
    // Affiche une notification
    showNotification(message, type = 'info') {
        // Crée l'élément de notification
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Ajoute la notification au corps du document
        document.body.appendChild(notification);
        
        // Supprime la notification après l'animation
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    // Active/désactive le menu pause
    togglePauseMenu(show) {
        if (show) {
            this.screens.pauseMenu.classList.add('active');
        } else {
            this.screens.pauseMenu.classList.remove('active');
        }
    }
    
    // Affiche une réalisation débloquée
    showAchievement(achievement) {
        this.showNotification(`🏆 Réalisation débloquée : ${achievement.name}`, 'achievement');
    }
    
    // Affiche une animation de niveau supérieur
    showLevelUp(newLevel) {
        this.showNotification(`🌟 Niveau supérieur ! Vous êtes maintenant ${newLevel.name}`, 'level-up');
    }
}
