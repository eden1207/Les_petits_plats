/*---- Barre de recherche des listes de recherche avancée ----*/

miniResearchBar('ingredients-search-tool');
miniResearchBar('ustensils-search-tool');
miniResearchBar('appliance-search-tool');

function miniResearchBar(classMiniSearchToll) {

    if(classMiniSearchToll === 'ingredients-search-tool') {
        const miniSearchBar = document.getElementById(classMiniSearchToll);

        miniSearchBar.addEventListener('keyup', (e) => {
    
            const searchedWord = e.target.value;
    
            let element_words = searchWord(searchedWord.toLowerCase(), ingredients);
    
            if(element_words.length !==0) {
                const columnNumberElement = 3;
                let lignNumberElement = Math.ceil(element_words.length/columnNumberElement);
        
                createListTAG(element_words, 'ingredient', '.listContainerIngrédients', 'ingredientListTAG', lignNumberElement, columnNumberElement, 'ingredient-color');
        
                newListDOM(recipes, element_words, 'ingredient', 'sortBtnIngredients-color');
            }
        });
    }else if(classMiniSearchToll === 'ustensils-search-tool') {
        const miniSearchBar = document.getElementById(classMiniSearchToll);

        miniSearchBar.addEventListener('keyup', (e) => {
    
            const searchedWord = e.target.value;
    
            let element_words = searchWord(searchedWord.toLowerCase(), ustensils);
    
            if(element_words.length !==0) {
                const columnNumberElement = 3;
                let lignNumberElement = Math.ceil(element_words.length/columnNumberElement);
        
                createListTAG(element_words, "ustensil", '.listContainerUstensils', 'ustensilListTAG', lignNumberElement, columnNumberElement, 'tool-color');
        
                newListDOM(recipes, element_words, 'ustensil', 'sortBtnUstensils-color');
            }
        });
    }else if(classMiniSearchToll === 'appliance-search-tool') {
        const miniSearchBar = document.getElementById(classMiniSearchToll);

        miniSearchBar.addEventListener('keyup', (e) => {
    
            const searchedWord = e.target.value;
    
            let element_words = searchWord(searchedWord.toLowerCase(), appliance);
    
            if(element_words.length !==0) {
                const columnNumberElement = 3;
                let lignNumberElement = Math.ceil(element_words.length/columnNumberElement);
        
                createListTAG(element_words, "appliance", '.listContainerAppliance', 'applianceListTAG', lignNumberElement, columnNumberElement, 'device-color');
        
                newListDOM(recipes, element_words, 'appliance', 'sortBtnAppliance-color');
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