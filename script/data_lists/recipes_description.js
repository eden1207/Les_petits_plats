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
                // On utilise toLowerCase() pour prendre en compte les mots commençant par une minuscule ou majuscule
                allElements.push(descriptionNameList[j].toLowerCase());
            }
        }
        // sortAllElements évite les doublons dans le tableau
        return sortAllElements(allElements)
    }
}

const descriptionsResult = new Description(recipes).giveData();

// Le tableau obtenu détient des doublons à cause de la ponctuation (ex: 'sucre.', 'sucre)', 'sucre,', 'sucre' ...)
// Les fonctions suivantes permettent d'y remédier

// Fonction qui reprend les termes un à un pour supprimer toute ponctuation présente sur un des membres
function deleteAllPonctuations(data, ponctuation) {
    let res1 = data;
    let res2 = [];
    for(let i=0; i<ponctuation.length; i++) {
        res2 = deletePonctuation(res1, ponctuation[i]);
        res1 = res2;
        res2 = [];
    }
    // Il en sort un tableau avec tous les mêmes éléments mais sans la ponctuation (ex: ['sucre)', 'sucre.'] => ['sucre', 'sucre'])
    // sortAllElements supprime ainsi tous les doublons (['sucre', 'sucre'] => ['sucre'])
    return sortAllElements(res1)
}


// Fonction qui supprime une ponctuation donnée (ex: ',')
function deletePonctuation(data, ponctuation) {
    let sortedData = [];
    for(let i=0; i<data.length; i++) {
        sortedData.push(data[i].replace(ponctuation, ''));
    }
    return sortedData
}

// Ponctuation à enlever
const ponctuations = ['.', ',', '(', ')'];

// Tableau final
const descriptions = deleteAllPonctuations(descriptionsResult, ponctuations);