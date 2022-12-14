/*------ Création des liste de filtres ------*/

/*-- Création de 3 tableaux répertoriant ingrédients/ustensils/appareils --*/

// Récupération de tous les ingrédients/ustensils/appareils de toutes les recettes, 
// puis on enlève les doublons (ex: 3 fois le mot carotte) pour obtenir trois tableaux avec la liste de tous 
// les ingrédients/ustensils/appareils 


// Création de 3 constantes pour les noms de classes de chacune des 3 listes de filtres

const nameOfIngredientsList = '.JS-ingredients';
const nameOfUstensilsList = '.JS-ustensils';
const nameOfApplianceList = '.JS-appliance';


// Fonction pour enlever les doublons dans un tableau

function sortAllElements(tab) {
    let elementSorted = [];
    let allElements = tab;
        
    allElements.forEach((allElements_element) => {
        let count = 0;
        elementSorted.forEach((elementSorted_element) => {
            if(allElements_element === elementSorted_element) {
                count += 1;
            }
        });
        if(count === 0) {
            elementSorted.push(allElements_element);
        }
    });   
    return elementSorted
}

// Création de 3 Constructor Pattern pour formater les données du tableau "recipes" selon 
// si on a ingrédients/ustensils/appareils

class Ingredients {
    constructor(data) {
        this._data = data
    }

    giveData() {
        let allElements = [];
        this._data.forEach((data_element) => {
            let getRecipeIngredientsList = data_element.ingredients;
            let getIngredientFromList = getRecipeIngredientsList.map(x => x.ingredient);
            getIngredientFromList.forEach((getIngredientFromList_element) => {
                allElements.push(getIngredientFromList_element.toLowerCase());
            });
        });
        return sortAllElements(allElements)
    }
}

class Ustensils {
    constructor(data) {
        this._data = data
    }

    giveData() {
        let allElements = [];
        this._data.forEach((data_element) => {
            let getRecipeUstensilsList = data_element.ustensils;
            getRecipeUstensilsList.forEach((getRecipeUstensilsList_element) => {
                allElements.push(getRecipeUstensilsList_element.toLowerCase());
            });
        });
        return sortAllElements(allElements)
    }
}

class Appliance {
    constructor(data) {
        this._data = data
    }

    giveData() {
        let allElements = [];
        this._data.forEach((data_element) => {
            allElements.push(data_element.appliance.toLowerCase());
        });
        return sortAllElements(allElements)
    }
}

// Création d'un Factory Pattern pour gérer la création d'un des 3 objets ingrédients/ustensils/appareils

class List {
    constructor(data, className) {
        if(className === nameOfIngredientsList) {
            return new Ingredients(data)
        } else if(className === nameOfUstensilsList) {
            return new Ustensils(data)
        } else if(className === nameOfApplianceList) {
            return new Appliance(data)
        }else{
            console.log('Elément non connu')
        }
    }
}

const ingredientsList = new List(recipes, nameOfIngredientsList).giveData();
const ustensilsList = new List(recipes, nameOfUstensilsList).giveData();
const applianceList = new List(recipes, nameOfApplianceList).giveData();

// Listes par ordre alphabétique
const ingredients = ingredientsList.sort();
const ustensils = ustensilsList.sort();
const appliance = applianceList.sort();


/*-- Affichage des 3 listes déroulantes pour les ingrédients, ustensils et appareils --*/

// Fonction qui génère le DOM de chacune des 3 listes

function createListDOM(className, value, id_element, tabData) {

    // Titre des listes
    if(className === nameOfIngredientsList) {
        let listTitle = `<option value=${value}>Ingrédients</option>`;
        document.querySelector(className).innerHTML = listTitle;
    } else if(className === nameOfUstensilsList) {
        let listTitle = `<option value=${value}>Ustensiles</option>`
        document.querySelector(className).innerHTML = listTitle;
    } else if(className === nameOfApplianceList) {
        let listTitle = `<option value=${value}>Appareils</option>`
        document.querySelector(className).innerHTML = listTitle;
    }

    //Génération de chaque élément de la liste
    tabData.forEach((tabData_element) => {
        let i = tabData.indexOf(tabData_element);
        document.querySelector(className).innerHTML += `<option value=${value} id=${id_element + i}>${tabData_element}</option>`;
    });
}

// Fonction qui affiche les 3 listes

function displayList(className, tabName) {
    if(className === nameOfIngredientsList) {
        document.querySelector(className).innerHTML = '';
        createListDOM(className, "ingredients", "ingredient", tabName)
    }else if(className === nameOfUstensilsList) {
        document.querySelector(className).innerHTML = '';
        createListDOM(className, "ustensils", "ustensil", tabName)
    }else if (className === nameOfApplianceList) {
        document.querySelector(className).innerHTML = '';
        createListDOM(className, "appliance", "appliance", tabName)
    }else {
        console.log ('Une erreur est survenue')
    }
}

displayList(nameOfIngredientsList, ingredients);
displayList(nameOfUstensilsList, ustensils);
displayList(nameOfApplianceList, appliance);