/*---- Barre de recherche des listes de recherche avancée ----*/

function miniResearchBar(classMiniSearchToll, recipesData, ing, ust, app) {

    if(classMiniSearchToll === 'ingredients-search-tool') {
        const miniSearchBar = document.getElementById(classMiniSearchToll);

        miniSearchBar.addEventListener('keyup', (e) => {
    
            const searchedWord = e.target.value;
    
            let element_words = searchWord(searchedWord.toLowerCase(), ing);
    
            if(element_words.length !==0) {
                const columnNumberElement = 3;
                let lignNumberElement = Math.ceil(element_words.length/columnNumberElement);
        
                createListTAG(element_words, 'ingredient', '.listContainerIngrédients', 'ingredientListTAG', lignNumberElement, columnNumberElement, 'ingredient-color');
        
                newListDOM(recipesData, element_words, 'ingredient', 'sortBtnIngredients-color');
            }else if(element_words.length ===0) {
                const columnNumberElement = 3;
                let lignNumberElement = Math.ceil(ing.length/columnNumberElement);
        
                createListTAG(ing, 'ingredient', '.listContainerIngrédients', 'ingredientListTAG', lignNumberElement, columnNumberElement, 'ingredient-color');
        
                newListDOM(recipesData, ing, 'ingredient', 'sortBtnIngredients-color');
            }
        });
    }else if(classMiniSearchToll === 'ustensils-search-tool') {
        const miniSearchBar = document.getElementById(classMiniSearchToll);

        miniSearchBar.addEventListener('keyup', (e) => {
    
            const searchedWord = e.target.value;
    
            let element_words = searchWord(searchedWord.toLowerCase(), ust);
    
            if(element_words.length !==0) {
                const columnNumberElement = 3;
                let lignNumberElement = Math.ceil(element_words.length/columnNumberElement);
        
                createListTAG(element_words, "ustensil", '.listContainerUstensils', 'ustensilListTAG', lignNumberElement, columnNumberElement, 'tool-color');
        
                newListDOM(recipesData, element_words, 'ustensil', 'sortBtnUstensils-color');
            }else if(element_words.length ===0) {
                const columnNumberElement = 3;
                let lignNumberElement = Math.ceil(ust.length/columnNumberElement);
        
                createListTAG(ust, "ustensil", '.listContainerUstensils', 'ustensilListTAG', lignNumberElement, columnNumberElement, 'tool-color');
        
                newListDOM(recipesData, ust, 'ustensil', 'sortBtnUstensils-color');
            }
        });
    }else if(classMiniSearchToll === 'appliance-search-tool') {
        const miniSearchBar = document.getElementById(classMiniSearchToll);

        miniSearchBar.addEventListener('keyup', (e) => {
    
            const searchedWord = e.target.value;
    
            let element_words = searchWord(searchedWord.toLowerCase(), app);
    
            if(element_words.length !==0) {
                const columnNumberElement = 3;
                let lignNumberElement = Math.ceil(element_words.length/columnNumberElement);
        
                createListTAG(element_words, "appliance", '.listContainerAppliance', 'applianceListTAG', lignNumberElement, columnNumberElement, 'device-color');
        
                newListDOM(recipesData, element_words, 'appliance', 'sortBtnAppliance-color');
            }else if(element_words.length ===0) {
                const columnNumberElement = 3;
                let lignNumberElement = Math.ceil(app.length/columnNumberElement);
        
                createListTAG(app, "appliance", '.listContainerAppliance', 'applianceListTAG', lignNumberElement, columnNumberElement, 'device-color');
        
                newListDOM(recipesData, app, 'appliance', 'sortBtnAppliance-color');
            }
        });
    }
}

function searchWord(word, tabData) {
    let tab = [];

    if(word.length>2) {
        for(let i=0; i<tabData.length; i++) {
            // On prend chaque élément des listes et on garde les mots commençant par les bonnes lettres
            if(tabData[i].includes(word) === true) {
                tab.push(tabData[i])
            }
        }
    }

    return sortAllElements(tab)
};