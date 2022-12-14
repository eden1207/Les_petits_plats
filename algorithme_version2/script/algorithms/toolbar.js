/*---- Barre de recherche ----*/

const searchBar = document.getElementById('search-tool');

// On associe à searchBar un eventListener 'keyup' lié à l'utilisation du clavier

searchBar.addEventListener('keyup', (e) => {

    // On récupère le mot tapé dans la barre de recherche
    const searchedWord = e.target.value;

    // Récupération des mots-clés tapés au clavier
    let keyword = searchKeyword(searchedWord.toLowerCase());

    // Affiche un message d'erreur si le mot recherché ne correspond pas aux critères

    displayErrorMessage(searchedWord, keyword);

    // On instancie la classe qui donne les recettes fltrées avec la barre de recherche
    let newRecipes = new GetSearchedData(recipes, keyword).give();

    displayRecipes(newRecipes);
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