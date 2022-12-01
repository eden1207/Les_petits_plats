/*-- Classe pour répertorier tous les mots des descriptions des recettes --*/

// Cette classe joue un rôle important dans les recherche avec la barre de recherche afin de comparer
// le mot tapé avec les mots se trouvant dans les descriptions de recette existant ou non
// La classe renvoye un tableau listant tous ces mots

class Description {
    constructor(data) {
        this._data = data
    }

    giveData() {
        let allElements = [];
        for(let i=0; i<this._data.length; i++) {
            // Au lieu de faire un tableau.description qui renverrait à un tableau contenant des phrases,
            // on utilise split(' ') pour renvoyer un tableau de mots
            let descriptionNameList = this._data[i].description.split(' ');
            for(let j=0; j<descriptionNameList.length; j++) {
                allElements.push(descriptionNameList[j]);
            }
        }
        // sortAllElements évite les doublons dans le tableau
        return sortAllElements(allElements)
    }
}

const descriptions = new Description(recipes).giveData();