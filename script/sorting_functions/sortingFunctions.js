/*---- Fonctions de tri par mots-clés dans les listes Ingredients/Ustensils/Appliance et la barre de recherche ----*/

/*-- Template Pattern pour définir le squelette de l'algorithme de tri --*/

// Cinq classes héritent de la classe Sort
// Chacune scanne les ingredients, les ustensiles, les appareils ainsi que la description et le titre
// pour récupérer un nouveau tableau de recettes, trié selon les mots filtrés

// Classe passive dont vont hériter toutes les classes dédiées au tri
class Sort {
    constructor(data, sortedData, keyword) {
        this._data = data
        this._sortedData = sortedData
        this._keyword = keyword
    }
}

// Le principe des cinq classes qui vont suivre est de partir d'un tableau de données (data)
// On compare les éléments un à un avec des mots clés (keyword)
// Si les éléments matchent avec les mots clés, la donnée est stockée dans un tableau initialement vide (sortedData)

// Classe qui gère le tri en scannant les ingrédients des recettes
class SortIngredients extends Sort {
    constructor(data, sortedData, keyword) {
        super(data, sortedData, keyword)
    }

    give() {
        this._data.forEach((data_element) => {
            let getRecipeIngredientsList = data_element.ingredients;
            let getIngredientFromList = getRecipeIngredientsList.map(x => x.ingredient);
            getIngredientFromList.forEach((getIngredientFromList_element) => {
                // On utilise toLowerCase() pour prendre en compte les mots commençant par une minuscule ou majuscule
                if(getIngredientFromList_element.toLowerCase() === this._keyword) {
                    this._sortedData.push(data_element);
                }
            });
        });
    }
}

// Classe qui gère le tri en scannant les ustensiles des recettes
class SortUstensils extends Sort {
    constructor(data, sortedData, keyword) {
        super(data, sortedData, keyword)
    }

    give() {
        this._data.forEach((data_element) => {
            let getRecipeUstensilsList = data_element.ustensils;
            getRecipeUstensilsList.forEach((getRecipeUstensilsList_element) => {
                // On utilise toLowerCase() pour prendre en compte les mots commençant par une minuscule ou majuscule
                if(getRecipeUstensilsList_element.toLowerCase() === this._keyword) {
                    this._sortedData.push(data_element);
                }
            });
        });
    }
}

// Classe qui gère le tri en scannant les appareils des recettes
class SortAppliance extends Sort {
    constructor(data, sortedData, keyword) {
        super(data, sortedData, keyword)
    }

    give() {
        this._data.forEach((data_element) => {
            // On utilise toLowerCase() pour prendre en compte les mots commençant par une minuscule ou majuscule
            if(data_element.appliance.toLowerCase() === this._keyword) {
                this._sortedData.push(data_element);
            }
        });
    }
}

// Classe qui gère le tri en scannant le titre des recettes
class SortTitle extends Sort {
    constructor(data, sortedData, keyword) {
        super(data, sortedData, keyword)
    }

    give() {
        this._data.forEach((data_element) => {
            let recipeTitle = data_element.name;
            // On utilise toLowerCase() pour prendre en compte les mots commençant par une minuscule ou majuscule
            if(recipeTitle.toLowerCase() === this._keyword) {
                this._sortedData.push(data_element);
            }
        });
    }
}

// Classe qui gère le tri en scannant la description des recettes
class SortDescription extends Sort {
    constructor(data, sortedData, keyword) {
        super(data, sortedData, keyword)
    }

    give() {
        this._data.forEach((data_element) => {
            // Au lieu de faire un tableau.description qui renverrait à un tableau contenant des phrases,
            // on utilise split(' ') pour renvoyer un tableau de mots
            let descriptionNameList1 = data_element.description.split(' ');
            // Ponctuation à enlever (voir les explications dans recipes_description)
            const ponctuations = ['.', ',', '(', ')'];

            // Tableau final
            let descriptionNameList = deleteAllPonctuations(descriptionNameList1, ponctuations);
            // On enlève les doublons car s'il y a 2 fois le même mot (ex: "Mettre" pour la mousse au chocolat),
            // la recette sera affichée 2 fois
            let sortedDescriptionNameList = sortAllElements(descriptionNameList);
            sortedDescriptionNameList.forEach((sortedDescriptionNameList_element) => {
                // On utilise toLowerCase() pour prendre en compte les mots commençant par une minuscule ou majuscule
                if(sortedDescriptionNameList_element.toLowerCase() === this._keyword) {
                    this._sortedData.push(data_element);
                }
            });
        });
    }
}

// Fonction de tri en scannant les mots clés dans chacune des trois listes ingrédients/ustensiles/appareils
function sortAllCategories(data, sortedData, keyword) {
    new SortIngredients(data, sortedData, keyword).give();
    new SortUstensils(data, sortedData, keyword).give();
    new SortAppliance(data, sortedData, keyword).give();
    return sortedData
}

// Fonction de tri en scannant les mots clés dans chacune des trois listes ingrédients/titres/description
function sortForSearchBar(data, sortedData, keyword) {
    new SortIngredients(data, sortedData, keyword).give();
    new SortTitle(data, sortedData, keyword).give();
    new SortDescription(data, sortedData, keyword).give();
    return sortAllElements(sortedData)
}

// Classe finale qui renvoye un tableau de recettes filtré par mots-clés à partir du tableau de base
class GetSortedData {
    constructor(data, keywords) {
        this._data = data
        this._keywords = keywords
    }

    // Le principe de la fonction est de partir sur un tableau de données (ici les recettes)
    // A chaque tour de boucle, on regarde les recettes qui ont le mot clé et on les met dans un tableau (vide au début)
    // Puis le tableau sortant sera le nouveau tableau qui sera filtré par le mot clé suivant... et ainsi de suite
    // Ce système de tri permet de sélectionner les recettes qui répondent à tout les critères de filtre 

    // En conclusion, on ne garde que les recettes qui match avec TOUS les mots clés
    give() {
        let res1 = this._data;
        let res2 = [];
    
        this._keywords.forEach((keywords_element) => {
            res2 = sortAllCategories(res1, res2, keywords_element);
            res1 = res2;
            res2 = [];
        });
        return res1
    }
}


// Classe finale qui renvoye un tableau de recettes filtré avec la barre de recherche
class GetSearchedData {
    constructor(data, keywords) {
        this._data = data
        this._keywords = keywords
    }

    give() {
        let res = [];

        // Le principe de la fonction est de prendre un tableau vide
        // Au premier tour de boucle le tableau va se remplir de toutes les recettes ayant le mot clé
        // Au deuxième tour de boucle, vont s'ajouter à ce tableau les recettes qui ont le deuxième mot clé etc
        // Cela permet d'afficher toutes les recettes possibles avec la barre de recherche (plusieurs mots clés possibles quand on tape les premières lettres)
        // Puis plus on tape de lettres dans la barre de recherche, plus la liste de mots clés est petite et plus la sélection s'affine

        // En conclusion, on ne garde que les recettes qui match avec UN des mots clés
        this._keywords.forEach((keywords_element) => {
            res = sortForSearchBar(this._data, res, keywords_element);
        });
        return res
    }
}