/*---- Fonctionnalité de tri des recettes par mots-clés dans les listes Ingredients/Ustensils/Appliance ----*/

/*-- Template Pattern pour définir le squelette de l'algorithme de tri --*/

// Trois classes héritent de la classe Sort
// Chacune scanne la liste des éléments cliqués respectivement dans les listes Ingredients/Ustensils/Appliance
// pour récupérer un nouveau tableau de recettes, trié selon les mots filtrés

class Sort {
    constructor(data, sortedData, keyword) {
        this._data = data
        this._sortedData = sortedData
        this._keyword = keyword
    }
}

class SortIngredients extends Sort {
    constructor(data, sortedData, keyword) {
        super(data, sortedData, keyword)
    }

    give() {
        for(let i=0; i<this._data.length; i++) {
            for(let j=0; j<this._data[i].ingredients.length; j++) {
                if(this._data[i].ingredients[j].ingredient === this._keyword || this._data[i].name === this._keyword) {
                    this._sortedData.push(this._data[i]);
                }
            }
        }
    }
}

class SortUstensils extends Sort {
    constructor(data, sortedData, keyword) {
        super(data, sortedData, keyword)
    }

    give() {
        for(let i=0; i<this._data.length; i++) {
            for(let j=0; j<this._data[i].ustensils.length; j++) {
                if(this._data[i].ustensils[j] === this._keyword) {
                    this._sortedData.push(this._data[i]);
                }
            }
        }
    }
}

class SortAppliance extends Sort {
    constructor(data, sortedData, keyword) {
        super(data, sortedData, keyword)
    }

    give() {
        for(let i=0; i<this._data.length; i++) {
            if(this._data[i].appliance === this._keyword) {
                this._sortedData.push(this._data[i]);
            }
        }
    }
}

class SortTitle extends Sort {
    constructor(data, sortedData, keyword) {
        super(data, sortedData, keyword)
    }

    give() {
        for(let i=0; i<this._data.length; i++) {
            let recipeTitle = this._data[i].name;
            if(recipeTitle === this._keyword) {
                this._sortedData.push(this._data[i]);
            }
        }
    }
}

class SortDescription extends Sort {
    constructor(data, sortedData, keyword) {
        super(data, sortedData, keyword)
    }

    give() {
        for(let i=0; i<this._data.length; i++) {
            let descriptionNameList = this._data[i].description.split(' ')
            for(let j=0; j<descriptionNameList.length; j++) {
                if(descriptionNameList[j] === this._keyword) {
                    this._sortedData.push(this._data[i]);
                }
            }
        }
    }
}

// Fonction de tri dans chacune des 3 listes
function sortAllCategories(data, sortedData, keyword) {
    new SortIngredients(data, sortedData, keyword).give();
    new SortUstensils(data, sortedData, keyword).give();
    new SortAppliance(data, sortedData, keyword).give();
    new SortTitle(data, sortedData, keyword).give();
    new SortDescription(data, sortedData, keyword).give();
    return sortedData
}

// Classe finale qui renvoye un tableau de recettes filtré par mots-clés à partir du tableau de base
class GetSortedData {
    constructor(data, keywords) {
        this._data = data
        this._keywords = keywords
    }

    //TODO mieux expliquer
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

        for(let i=0; i<this._keywords.length; i++) {
            res = sortAllCategories(this._data, res, this._keywords[i]);
        }
        return res
    }
}