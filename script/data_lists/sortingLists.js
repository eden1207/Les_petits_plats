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

// Fonction qui affiche les 3 listes

function displayList(className, tabName) {
    if(className === nameOfIngredientsList) {
        document.querySelector(className).innerHTML = '';

        let listTitle = `<button id="JS-closeIngredientsListBtn" class="listTitle ingredient-color"><h3>Ingrédients</h3><i class="fa-solid fa-chevron-up"></i></button>`;
        document.querySelector(className).innerHTML = listTitle;
        let listContainer = `<div class="listContainerIngrédients"></div>`;
        document.querySelector(className).innerHTML += listContainer;
        const columnNumberElement = 3;
        let lignNumberElement = Math.ceil(tabName.length/columnNumberElement);

        createListTAG(tabName, 'ingredient', '.listContainerIngrédients', 'ingredientListTAG', lignNumberElement, columnNumberElement, 'ingredient-color');
    }else if(className === nameOfUstensilsList) {
        document.querySelector(className).innerHTML = '';

        let listTitle = `<button id="JS-closeUstensilsListBtn" class="listTitle tool-color"><h3>Ustensiles</h3><i class="fa-solid fa-chevron-up"></i></button>`;
        document.querySelector(className).innerHTML = listTitle;
        let listContainer = `<div class="listContainerUstensils"></div>`;
        document.querySelector(className).innerHTML += listContainer;
        const columnNumberElement = 3;
        let lignNumberElement = Math.ceil(tabName.length/columnNumberElement);

        createListTAG(tabName, "ustensil", '.listContainerUstensils', 'ustensilListTAG', lignNumberElement, columnNumberElement, 'tool-color');
    }else if (className === nameOfApplianceList) {
        document.querySelector(className).innerHTML = '';

        let listTitle = `<button id="JS-closeApplianceListBtn" class="listTitle device-color"><h3>Appareils</h3><i class="fa-solid fa-chevron-up"></i></button>`;
        document.querySelector(className).innerHTML = listTitle;
        let listContainer = `<div class="listContainerAppliance"></div>`;
        document.querySelector(className).innerHTML += listContainer;
        const columnNumberElement = 3;
        let lignNumberElement = Math.ceil(tabName.length/columnNumberElement);

        createListTAG(tabName, "appliance", '.listContainerAppliance', 'applianceListTAG', lignNumberElement, columnNumberElement, 'device-color');
    }else {
        console.log ('Une erreur est survenue')
    }
}

displayList(nameOfIngredientsList, ingredients);
displayList(nameOfUstensilsList, ustensils);
displayList(nameOfApplianceList, appliance);

// Fonction qui génère le DOM de chacune des 3 listes

function createListTAG(tabData, id_element, listContainers, listTAGClassName, lignNumberElement, columnNumberElement, colorList) {
    for(let j=0; j<lignNumberElement; j++){
        let pas = j*columnNumberElement;
        let listTAGname = listTAGClassName + j;
        let list = `<ul class=${listTAGname}></ul>`;
        document.querySelector(listContainers).innerHTML += list;
        for(let i=0+pas; i<3+pas; i++) {
            if(tabData[i] !== undefined){
                document.querySelector('.' + listTAGname).innerHTML += `<li><button type="button" id=${id_element + i} class="elementBtn ${colorList}">${tabData[i]}</button></li>`;
            }else if(tabData[i] === undefined){
                document.querySelector('.' + listTAGname).innerHTML += ``;
            }else{
                console.log('problème de membre de liste')
            }
        }
    }
}

// Fonction pour ouvrir chaque liste au clique

function openListBtn(listId) {
    let openListBtn = document.getElementById(listId);
    openListBtn.addEventListener('click', () => {
        if(listId === 'JS-openIngredientsListBtn') {
            document.querySelector('.ingredientsOpen').style.display = "none";
            document.querySelector('.ustensilsOpen').style.display = "flex";
            document.querySelector('.applianceOpen').style.display = "flex";

            document.querySelector('.JS-ingredients').style.display = "flex";
            document.querySelector('.JS-appliance').style.display = "none";
            document.querySelector('.JS-ustensils').style.display = "none";
        }else if(listId === 'JS-openUstensilsListBtn') {
            document.querySelector('.ingredientsOpen').style.display = "flex";
            document.querySelector('.ustensilsOpen').style.display = "none";
            document.querySelector('.applianceOpen').style.display = "flex";

            document.querySelector('.JS-ingredients').style.display = "none";
            document.querySelector('.JS-appliance').style.display = "none";
            document.querySelector('.JS-ustensils').style.display = "flex";
        }else if(listId === 'JS-openApplianceListBtn') {
            document.querySelector('.ingredientsOpen').style.display = "flex";
            document.querySelector('.applianceOpen').style.display = "none";
            document.querySelector('.ustensilsOpen').style.display = "flex";

            document.querySelector('.JS-ingredients').style.display = "none";
            document.querySelector('.JS-appliance').style.display = "flex";
            document.querySelector('.JS-ustensils').style.display = "none";
        }else {
            console.log('la commande ne répond pas')
        }
    });
}

openListBtn('JS-openIngredientsListBtn');
openListBtn('JS-openUstensilsListBtn');
openListBtn('JS-openApplianceListBtn');

// Fonction pour fermer chaque liste au clique

function closeListBtn(listId) {
    let closeListBtn = document.getElementById(listId);
    closeListBtn.addEventListener('click', () => {
        if(listId === 'JS-closeIngredientsListBtn') {
            document.querySelector(nameOfIngredientsList).style.display = "none";
            document.querySelector('.ingredientsOpen').style.display = "flex";
        }else if(listId === 'JS-closeApplianceListBtn') {
            document.querySelector(nameOfApplianceList).style.display = "none";
            document.querySelector('.applianceOpen').style.display = "flex";
        }else if(listId === 'JS-closeUstensilsListBtn') {
            document.querySelector(nameOfUstensilsList).style.display = "none";
            document.querySelector('.ustensilsOpen').style.display = "flex";
        }else {
            console.log('la commande ne répond pas')
        }
    });
}

closeListBtn('JS-closeIngredientsListBtn');
closeListBtn('JS-closeUstensilsListBtn');
closeListBtn('JS-closeApplianceListBtn');