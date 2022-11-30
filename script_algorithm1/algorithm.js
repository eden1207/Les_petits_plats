const sortInformations = [
    {
      "TabOfNames" : ingredients,
      "ColorOfList" : 'sortBtnIngredients-color',
      "NameOfListElementID" : 'ingredient',
      "NameOfButtonID" : 'ingredient',
      "NameOfCloseButton" : 'JS-close-sortIngredientBtn'
    },
  
    {
      "TabOfNames" : appliance,
      "ColorOfList" : 'sortBtnAppliance-color',
      "NameOfListElementID" : 'appliance',
      "NameOfButtonID" : 'appliance',
      "NameOfCloseButton" : 'JS-close-sortApplianceBtn'
    },
  
    {      
      "TabOfNames" : ustensils,
      "ColorOfList" : 'sortBtnUstensils-color',
      "NameOfListElementID" : 'ustensil',
      "NameOfButtonID" : 'ustensil',
      "NameOfCloseButton" : 'JS-close-sortUstensilBtn'
    }
];


















let keywords = [];
//let count = 0;

/*-- Activation au clique des boutons filtres --*/

function keywordCount(tabData, list, number) {
    let count = 0;

    document.getElementById(list + number).addEventListener('click', () => {
        count += 1;
        //filterOff = false;
        if(count <= 1) {
            keywords.push(tabData[number]);
            document.getElementById(list + number).style.display = "flex";


            // Enlever le mot clé de la liste ingrédient/ustensil/appareil correspondant
            /*function upDateList(data, number) {
                let indexElement = data.indexOf(data[number])
                data.splice(indexElement, 1);
                return data
            }

            let newTabData = upDateList(tabData, number);
    
            if(list === 'ingredient'){
                displayList(nameOfIngredientsList, newTabData);
            }else if(list === 'appliance') {
                displayList(nameOfApplianceList, newTabData);
            } else if(list === 'ustensil') {
                displayList(nameOfUstensilsList, newTabData);
            }*/
        }


        //console.log(tabData)
        //console.log(keywords)
        let newRecipes = new GetSortedData(recipes, keywords).give();
        displayRecipes(newRecipes);
        //console.log(count)
        //return tabData
    });
}


for(let j=0; j<sortInformations.length; j++) {
    const namesOfListElement = sortInformations[j].TabOfNames;
    const nameOfListElementID = sortInformations[j].NameOfListElementID
    //console.log(namesOfListElement)

    for(let i=0; i<namesOfListElement.length; i++) {
        keywordCount(namesOfListElement, nameOfListElementID, i);
        //console.log(namesOfListElement)
    }
}


/*-- Affichage des boutons filtres --*/

class SortBtnDOM {
    constructor(data, index) {
        this._TabOfNames = data.TabOfNames
        this._ColorOfList = data.ColorOfList
        this._NameOfListElementID = data.NameOfListElementID
        this._NameOfButtonID = data.NameOfButtonID
        this._NameOfCloseButton = data.NameOfCloseButton
        this._index = index
    }

    give() {
        const id = this._NameOfButtonID + this._index;
        const close_id = this._NameOfCloseButton + this._index;
        // TODO Faire une variable ``
        document.querySelector('.JS-sortElements').innerHTML += `<div class="sortBtn sortBtn_dimensions sortBtn_border ${this._ColorOfList}" id=${id}>
                                                                    <h3>${this._TabOfNames[this._index]}</h3>
                                                                    <button class="close-sortBtn ${this._ColorOfList}" id=${close_id}><i class="fa-regular fa-circle-xmark"></i></button>
                                                                </div>`
    }
}

// TODO mettre commentaire
for(let j=0; j<sortInformations.length; j++) {
    const namesOfListElement = sortInformations[j].TabOfNames;

    for(let i=0; i<namesOfListElement.length; i++) {
        new SortBtnDOM(sortInformations[j], i).give();
    }
}


/*-- Fermeture des boutons filtres --*/

function closeBtn(tabData, list, nameCloseId, number) {
    document.getElementById(nameCloseId + number).addEventListener('click', () => {
        document.getElementById(list + number).style.display = "none";
        const indexElement = keywords.indexOf(tabData[number]);
        keywords.splice(indexElement, 1);
        //console.log(keywords)
        let newRecipes = new GetSortedData(recipes, keywords).give();
        displayRecipes(newRecipes);
        //filterOff = true;
        //count = 0;
        //return count
    });
}

for(let j=0; j<sortInformations.length; j++) {
    const namesOfListElement = sortInformations[j].TabOfNames;
    const nameOfButtonID = sortInformations[j].NameOfButtonID;
    const nameOfCloseButton = sortInformations[j].NameOfCloseButton;

    for(let i=0; i<namesOfListElement.length; i++) {
        closeBtn(namesOfListElement, nameOfButtonID, nameOfCloseButton, i);
    }
}



/*-- Barre de recherche --*/

const searchBar = document.getElementById('search-tool');

// On associe à searchBar un eventListener 'keyup' lié à l'utilisation du clavier

searchBar.addEventListener('keyup', (e) => {

    // On récupère le mot tapé dans la barre de recherche
    const searchedWord = e.target.value;

    // Récupération des mots-clés tapés au clavier
    let keyword = searchKeyword(searchedWord);

    // On instancie la classe qui donne les recettes fltrées avec la barre de recherche
    let newRecipes = new GetSearchedData(recipes, keyword).give();
    console.log(newRecipes)

    displayRecipes(newRecipes);
});

function searchKeyword(word) {
    let tab = [];

    if(word.length>2) {
        for(let j=0; j<sortInformations.length; j++) {
            const namesOfListElement = sortInformations[j].TabOfNames;

            for(let i=0; i<namesOfListElement.length; i++) {
                // On prend chaque élément des listes et on garde les mots commençant par les bonnes lettres
                if(namesOfListElement[i].includes(word) === true) {
                    tab.push(namesOfListElement[i])
                }
            }
        }

        for(let j=0; j<titles.length; j++) {
            if(titles[j].includes(word) === true) {
                tab.push(titles[j])
            }
        }

        for(let j=0; j<descriptions.length; j++) {
            if(descriptions[j].includes(word) === true) {
                tab.push(descriptions[j])
            }
        }
    }
    return tab
}

let mot = ['Mettre'];
let recette = new GetSearchedData(recipes, mot).give();
console.log(recette)