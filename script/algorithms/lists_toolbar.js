/*---- Barre de recherche des listes de recherche avancée ----*/

miniResearchBar('ingredients-search-tool', recipes, ingredients, ustensils, appliance);
miniResearchBar('ustensils-search-tool', recipes, ingredients, ustensils, appliance);
miniResearchBar('appliance-search-tool', recipes, ingredients, ustensils, appliance);

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
            }
        });
    }
}

function searchWord(word, tabData) {
    let tab = [];

    if(word.length>2) {

        let sorteData = tabData.filter((e) => {
            if(e.includes(word) === true) {
                return e
            }
        });

        sorteData.forEach((e) => {
            tab.push(e)
        });
    }

    return sortAllElements(tab)
};