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
        for(let i=0; i<this._data.length; i++) {
            for(let j=0; j<this._data[i].ingredients.length; j++) {
                // On utilise toLowerCase() pour prendre en compte les mots commençant par une minuscule ou majuscule
                if(this._data[i].ingredients[j].ingredient.toLowerCase() === this._keyword) {
                    this._sortedData.push(this._data[i]);
                }
            }
        }
    }
}

// Classe qui gère le tri en scannant les ustensiles des recettes
class SortUstensils extends Sort {
    constructor(data, sortedData, keyword) {
        super(data, sortedData, keyword)
    }

    give() {
        for(let i=0; i<this._data.length; i++) {
            for(let j=0; j<this._data[i].ustensils.length; j++) {
                // On utilise toLowerCase() pour prendre en compte les mots commençant par une minuscule ou majuscule
                if(this._data[i].ustensils[j].toLowerCase() === this._keyword) {
                    this._sortedData.push(this._data[i]);
                }
            }
        }
    }
}

// Classe qui gère le tri en scannant les appareils des recettes
class SortAppliance extends Sort {
    constructor(data, sortedData, keyword) {
        super(data, sortedData, keyword)
    }

    give() {
        for(let i=0; i<this._data.length; i++) {
            // On utilise toLowerCase() pour prendre en compte les mots commençant par une minuscule ou majuscule
            if(this._data[i].appliance.toLowerCase() === this._keyword) {
                this._sortedData.push(this._data[i]);
            }
        }
    }
}

// Classe qui gère le tri en scannant le titre des recettes
class SortTitle extends Sort {
    constructor(data, sortedData, keyword) {
        super(data, sortedData, keyword)
    }

    give() {
        for(let i=0; i<this._data.length; i++) {
            let recipeTitle = this._data[i].name;
            // On utilise toLowerCase() pour prendre en compte les mots commençant par une minuscule ou majuscule
            if(recipeTitle.toLowerCase() === this._keyword) {
                this._sortedData.push(this._data[i]);
            }
        }
    }
}

// Classe qui gère le tri en scannant la description des recettes
class SortDescription extends Sort {
    constructor(data, sortedData, keyword) {
        super(data, sortedData, keyword)
    }

    give() {
        for(let i=0; i<this._data.length; i++) {
            // Au lieu de faire un tableau.description qui renverrait à un tableau contenant des phrases,
            // on utilise split(' ') pour renvoyer un tableau de mots
            let descriptionNameList1 = this._data[i].description.split(' ');
            // Ponctuation à enlever (voir les explications dans recipes_description)
            const ponctuations = ['.', ',', '(', ')'];

            // Tableau final
            let descriptionNameList = deleteAllPonctuations(descriptionNameList1, ponctuations);
            // On enlève les doublons car s'il y a 2 fois le même mot (ex: "Mettre" pour la mousse au chocolat),
            // la recette sera affichée 2 fois
            let sortedDescriptionNameList = sortAllElements(descriptionNameList);
            for(let j=0; j<sortedDescriptionNameList.length; j++) {
                // On utilise toLowerCase() pour prendre en compte les mots commençant par une minuscule ou majuscule
                if(sortedDescriptionNameList[j].toLowerCase() === this._keyword) {
                    this._sortedData.push(this._data[i]);
                }
            }
        }
    }
}

// TODO Mettre à jour les commentaires et vérifier qu'il n'y a plus de bug sur les tris

// Fonction de tri en scannant les mots clés dans chacune des cinq listes
function sortAllCategories(data, sortedData, keyword) {
    new SortIngredients(data, sortedData, keyword).give();
    new SortUstensils(data, sortedData, keyword).give();
    new SortAppliance(data, sortedData, keyword).give();
    //new SortTitle(data, sortedData, keyword).give();
    //new SortDescription(data, sortedData, keyword).give();
    return sortedData
}

function sortForSearchBar(data, sortedData, keyword) {
    new SortIngredients(data, sortedData, keyword).give();
    //new SortUstensils(data, sortedData, keyword).give();
    //new SortAppliance(data, sortedData, keyword).give();
    new SortTitle(data, sortedData, keyword).give();
    new SortDescription(data, sortedData, keyword).give();
    return sortAllElements(sortedData)
    //return sortedData
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
    
        for(let i=0; i<this._keywords.length; i++) {
            res2 = sortAllCategories(res1, res2, this._keywords[i]);
            res1 = res2;
            res2 = [];
        }
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
        for(let i=0; i<this._keywords.length; i++) {
            // TODO voir si le changement fonctionne
            //res = sortAllCategories(this._data, res, this._keywords[i]);
            res = sortForSearchBar(this._data, res, this._keywords[i]);
        }
        return res
    }
}