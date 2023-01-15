/*---- Barre de recherche ----*/

const sortInformations = [
    {
      "TabOfNames" : ingredients,
      "ColorOfList" : 'sortBtnIngredients-color',
      "NameOfListElementID" : 'ingredient',
      "NameOfList" : nameOfIngredientsList
    },
  
    {
      "TabOfNames" : appliance,
      "ColorOfList" : 'sortBtnAppliance-color',
      "NameOfListElementID" : 'appliance',
      "NameOfList" : nameOfApplianceList
    },
  
    {      
      "TabOfNames" : ustensils,
      "ColorOfList" : 'sortBtnUstensils-color',
      "NameOfListElementID" : 'ustensil',
      "NameOfList" : nameOfUstensilsList
    }
];

const searchBar = document.getElementById('search-tool');

// On associe à searchBar un eventListener 'keyup' lié à l'utilisation du clavier

searchBar.addEventListener('keyup', (e) => {

    // On récupère le mot tapé dans la barre de recherche
    const searchedWord = e.target.value;
    
    if(searchedWord.length<=2) {
        let keyword = searchKeyword(searchedWord.toLowerCase());

        // Affiche un message d'erreur si le mot recherché ne correspond pas aux critères
        displayErrorMessage(searchedWord, keyword);

        displayRecipes(recipes);

        // Mise à jour des 3 listes de recherche avancée
        const ingredientsList = new List(recipes, nameOfIngredientsList).giveData();
        const ustensilsList = new List(recipes, nameOfUstensilsList).giveData();
        const applianceList = new List(recipes, nameOfApplianceList).giveData();

        // Listes par ordre alphabétique
        const ingredients = ingredientsList.sort();
        const ustensils = ustensilsList.sort();
        const appliance = applianceList.sort();
    
        displayList(nameOfIngredientsList, ingredients);
        displayList(nameOfUstensilsList, ustensils);
        displayList(nameOfApplianceList, appliance);

        // Mise à jour des ouvertures/fermetures des 3 listes
        openListBtn('JS-openIngredientsListBtn');
        openListBtn('JS-openUstensilsListBtn');
        openListBtn('JS-openApplianceListBtn');

        closeListBtn('JS-closeIngredientsListBtn');
        closeListBtn('JS-closeUstensilsListBtn');
        closeListBtn('JS-closeApplianceListBtn');

        ing = ingredients;
        app = appliance;
        ust = ustensils;

        // Mise à jour des fonctionnalités des 3 listes
        newDOM(recipes);
        miniResearchBar('ingredients-search-tool', recipes, ing, ust, app);
        miniResearchBar('ustensils-search-tool', recipes, ing, ust, app);
        miniResearchBar('appliance-search-tool', recipes, ing, ust, app);

    } else if(searchedWord.length>2) {
        let keyword = searchKeyword(searchedWord.toLowerCase());

        // Affiche un message d'erreur si le mot recherché ne correspond pas aux critères
        displayErrorMessage(searchedWord, keyword);

        // On instancie la classe qui donne les recettes fltrées avec la barre de recherche
        let newRecipes2 = new GetSearchedData(recipes, keyword).give();

        displayRecipes(newRecipes2);

        // Mise à jour des 3 listes de recherche avancée
        const ingredientsList = new List(newRecipes2, nameOfIngredientsList).giveData();
        const ustensilsList = new List(newRecipes2, nameOfUstensilsList).giveData();
        const applianceList = new List(newRecipes2, nameOfApplianceList).giveData();

        // Listes par ordre alphabétique
        const ingredients = ingredientsList.sort();
        const ustensils = ustensilsList.sort();
        const appliance = applianceList.sort();
    
        displayList(nameOfIngredientsList, ingredients);
        displayList(nameOfUstensilsList, ustensils);
        displayList(nameOfApplianceList, appliance);

        // Mise à jour des ouvertures/fermetures des 3 listes
        openListBtn('JS-openIngredientsListBtn');
        openListBtn('JS-openUstensilsListBtn');
        openListBtn('JS-openApplianceListBtn');

        closeListBtn('JS-closeIngredientsListBtn');
        closeListBtn('JS-closeUstensilsListBtn');
        closeListBtn('JS-closeApplianceListBtn');
    
        ing = ingredients;
        app = appliance;
        ust = ustensils;

        // Mise à jour des fonctionnalités des 3 listes
        newDOM(newRecipes2);
        miniResearchBar('ingredients-search-tool', newRecipes2, ing, ust, app);
        miniResearchBar('ustensils-search-tool', newRecipes2, ing, ust, app);
        miniResearchBar('appliance-search-tool', newRecipes2, ing, ust, app);

    } else {
        console.log('Problème survenu')
    }
});


// Fonction qui récupère un tableau de mots clés en fonction de ce qui est tapé dans la barre de recherche
// Il en sort une liste de mots commençant par les "bonnes lettres"
// Cette liste diminue au fur et à mesure qu'on tape de nouvelles lettres  
function searchKeyword(word) {
    let tab = [];

    // On fixe une condition pour que seuls les mots à plus de 3 lettres soient pris en compte
    if(word.length>2) {

        sortInformations.forEach((member) => {
            const namesOfListElement = member.TabOfNames;

            // On prend chaque élément des listes et on garde les mots commençant par les bonnes lettres
            let sortedNamesOfListElement = namesOfListElement.filter((e) => {
                if(e.includes(word) === true) {
                    return true
                }
            });

            // Les éléments du tableau de mots filtrés sont ajoutés un à un dans tab
            sortedNamesOfListElement.forEach((e) => {
                tab.push(e)
            });
        });

        // On filtre chaque élément contenus dans les titres de recette
        let sortedTitles = titles.filter((e) => {
            if(e.includes(word) === true) {
                return true
            }
        });
        sortedTitles.forEach((e) => {
            tab.push(e)
        });

        // On filtre chaque élément contenu dans les descriptions
        let sortedDescriptions = descriptions.filter((e) => {
            if(e.includes(word) === true) {
                return true
            }
        });
        sortedDescriptions.forEach((e) => {
            tab.push(e)
        });
    }
    return tab
}

/*---- Message d'erreur ----*/

// Fonction qui affiche un message d'erreur si le mot recherché ne correspond pas aux critères
// Le message disparaît quand les critères sont remplis

function displayErrorMessage(word, keywords) {
    const errorMessage = document.querySelector('.JS-error');

    if(word.length>2 && keywords.length === 0) {
        errorMessage.style.display = "block";
    } else if(word.length>2 && keywords.length !== 0) {
        errorMessage.style.display = "none";
    }
}