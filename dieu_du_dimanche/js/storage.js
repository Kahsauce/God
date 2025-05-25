// Gestion du stockage et sauvegarde pour "Dieu du Dimanche"

class StorageManager {
    constructor() {
        this.localStorageKey = 'dieuDuDimanche_save';
        this.onlineMode = false; // Par défaut, mode local
    }

    // Sauvegarde l'état du jeu
    saveGame(gameState) {
        const saveData = JSON.stringify(gameState);
        
        // Sauvegarde locale
        try {
            localStorage.setItem(this.localStorageKey, saveData);
            console.log('Jeu sauvegardé localement');
            return true;
        } catch (error) {
            console.error('Erreur lors de la sauvegarde locale:', error);
            return false;
        }
    }

    // Charge l'état du jeu
    loadGame() {
        try {
            const saveData = localStorage.getItem(this.localStorageKey);
            if (saveData) {
                return JSON.parse(saveData);
            }
        } catch (error) {
            console.error('Erreur lors du chargement de la sauvegarde:', error);
        }
        return null;
    }

    // Vérifie si une sauvegarde existe
    hasSaveGame() {
        return localStorage.getItem(this.localStorageKey) !== null;
    }

    // Supprime la sauvegarde
    deleteSaveGame() {
        try {
            localStorage.removeItem(this.localStorageKey);
            console.log('Sauvegarde supprimée');
            return true;
        } catch (error) {
            console.error('Erreur lors de la suppression de la sauvegarde:', error);
            return false;
        }
    }

    // Exporte la sauvegarde sous forme de code à partager
    exportSaveCode() {
        try {
            const saveData = localStorage.getItem(this.localStorageKey);
            if (saveData) {
                // Encodage simple pour réduire la taille et rendre le code plus facile à partager
                return btoa(saveData);
            }
        } catch (error) {
            console.error('Erreur lors de l\'exportation de la sauvegarde:', error);
        }
        return null;
    }

    // Importe une sauvegarde à partir d'un code
    importSaveCode(code) {
        try {
            const saveData = atob(code);
            localStorage.setItem(this.localStorageKey, saveData);
            console.log('Sauvegarde importée avec succès');
            return true;
        } catch (error) {
            console.error('Erreur lors de l\'importation de la sauvegarde:', error);
            return false;
        }
    }

    // Active/désactive le mode en ligne (pour future implémentation)
    toggleOnlineMode(enable) {
        this.onlineMode = enable;
        console.log(`Mode en ligne ${enable ? 'activé' : 'désactivé'}`);
        // Ici, on pourrait ajouter la logique pour synchroniser avec un serveur
    }
}
