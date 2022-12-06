/*-- Classe pour répertorier tous les titres des recettes --*/

// Cette classe joue un rôle important dans les recherche avec la barre de recherche afin de comparer
// le mot tapé avec les titres existant ou non
// La classe renvoye un tableau listant tous les titres

class Title {
    constructor(data) {
        this._data = data
    }

    giveData() {
        let allElements = [];
        for(let i=0; i<this._data.length; i++) {
            let recipeTitle = this._data[i].name;
            // On utilise toLowerCase() pour prendre en compte les mots commençant par une minuscule ou majuscule
            allElements.push(recipeTitle.toLowerCase());
        }
        // sortAllElements évite les doublons dans le tableau
        return sortAllElements(allElements)
    }
}

const titles = new Title(recipes).giveData();