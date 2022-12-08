/*------ Gestion de l'affichage de la page web ------*/

// Création d'un Constructor Pattern pour la gestion de la carte de chaque recette

class Recipe {
    constructor(data) {
        this._id = data.id
        this._name = data.name
        this._servings = data.servings
        this._ingredients = data.ingredients
        this._time = data.time
        this._description = data.description
        this._appliance = data.appliance
        this._ustensils = data.ustensils
    }

    get id() {
        return this._id
    }

    get ingredients() {
        return this._ingredients
    }

    create() {
        return `<article class="receipe">
                        <div class="receipe-image"></div>
                        <div class="receipe-background">
                                <div class="receipe-title">
                                        <h1>${this._name}</h1>
                                        <h2><i class="fa-regular fa-clock"></i> ${this._time} min</h2>
                                </div>
                                <div class="receipe-description">
                                        <ul id="${this._id}" class="allIngredients allIngredients_dimensions allIngredients_border"></ul>
                                        <p class="receipe-text">${this._description}</p>
                                </div>
                        </div>
                </article>`;
    }
}

// Fonction qui génère la liste des ingrédients pour chaque recette

function displayIngredients(tab) {
    if(tab.ingredient === undefined) {
        tab.ingredient = ''
    }
    if(tab.quantity === undefined) {
        tab.quantity = ''
    }
    if(tab.unit === undefined) {
        tab.unit = ''
    }
    return `<li>${tab.ingredient}: ${tab.quantity}${tab.unit}</li>`
}

// Fonction que génère l'affichage de chaque carte de recette à partir du Constructor Pattern

function displayRecipes(tab) {

    // Définition de la classe dans laquelle on va mettre toutes les recettes
    const recipesDisplay = document.querySelector(".allReceipes");

    // Réinitialisation de l'affichage des recettes
    recipesDisplay.innerHTML = '';

    // Génération des cartes de recette
    for(let i=0; i<tab.length; i++) {
        recipesDisplay.innerHTML += new Recipe(tab[i]).create();
    }

    // On ajoute dans chaque carte, la liste des ingrédients pour chaque recette
    for(let i=1; i<tab.length+1; i++) {    
        let id = new Recipe(tab[i-1]).id;
        let recipeIngredients = new Recipe(tab[i-1]).ingredients;
        
        for(let j=0; j<recipeIngredients.length; j++) {
            document.getElementById(id.toString()).innerHTML += displayIngredients(recipeIngredients[j]);
        }
    }
}

displayRecipes(recipes);