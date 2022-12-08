/*-- Gestion des filtres de recherche avancée --*/

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


// Création de tableaux pour stocker les mots clés pour le tri. Les autres servent
// pour tout autre opération de transfert de mots clés entre les mots disponibles
// dans la liste des choix et les mots non disponibles, qui sont utilisé pour filtrer les recettes

    // Tableau pour mettre à jour la liste de filtres de recherche avancée après qu'on ait cliqué sur un élément
    let listSorted = [];

    // Tableau pour mettre la liste des mots clés cliqués
    let keywords = [];

    // Tableau pour mettre la liste des mots clés retirés du DOM
    let deletedKeyword = [];
    let sortBtnIds = [];

for(let i=0; i<sortInformations.length; i++) {

    // Classe contenant le DOM de la liste ingrédients/ustensiles/appareil
    let nameOfList = sortInformations[i].NameOfList;

    // Liste de filtres de recherche avancée
    let list = sortInformations[i].TabOfNames;

    // Code couleur de la liste ingrédients/ustensiles/appareil
    let colorOfList = sortInformations[i].ColorOfList;

    // Noms des Id de chaque éléments des listes ingrédients/ustensiles/appareil
    let nameOfListElementID = sortInformations[i].NameOfListElementID;

    newDOM(list, listSorted, nameOfList, colorOfList, nameOfListElementID);
}



// On travaille avec la liste d'ingrédients, chacun associé à un ID
// La fonction newDOM associe à chaque membre un EventListenner pour qu'au clique, l'élément soit éjecté
// de la liste et pour lui afficher son bouton filtre
// Si on ne se contente que de cette étape, il va y avoir un bug quand on va cliquer sur un autre membre de la liste
// En effet, vu que la liste à diminuer d'un membre, les ID risquent de ne plus correspondre à l'élément cliqué
// et la fonction ne répondra plus
// C'est pourquoi on utilise la récursivité pour redéfinir les EventListeners pour la nouvelle liste, et ainisi de suite ...

function newDOM(data, sortedData, nameOfList, colorOfList, nameOfListElementID) {

    for(let i=0; i<data.length; i++) {
        document.getElementById(nameOfListElementID + i).addEventListener('click', () => {

            /*-- Etape 1: on récupère le mot cliqué sous forme d'un mot clé --*/

            // Les éléments composés (ex: beurre fondu) pose problème car l'algorithme ne prend que le 
            // premier élément (ici beurre) et génère des conflits (ici avec 'beurre' seul)
            // Pour y remédier, on colle les éléments composés (beurrefondu) avec replace()

            const regex = /\s+/g; // pour enlever les espaces dans une phrase

            // Le mot est mis dans le tableau de mise à jour des éléments de la liste DOM
            deletedKeyword.push(data[i].replace(regex, ''));

            // et mis dans un tableau des mots clés pour la fonction filtre des recettes
            keywords.push(data[i]);

            /*-- Etape 2: On affiche le bouton DOM de filtre avancé correspondant --*/

            // Mot affiché dans le bouton
            let btnTitle = data[i];
            // id associé à l'affichage du bouton (display flex/none)
            let id = 'close' + deletedKeyword + 'Btn';
            // Couleur du bouton
            //let colorBtn = 'sortBtnIngredients-color';
            let colorBtn = colorOfList;
            // id associé à la fermeture du bouton
            let close_id = 'close' + deletedKeyword;

            // Observer Pattern qui affiche le bouton DOM de filtre avancé correspondant
            new SortBtnDOM(btnTitle, colorBtn, id, close_id).give();


            /*-- Etape 3: on supprime ce mot clé de la liste puis on met à jour les données
                 pour qu'au prochain clique, on travaille avec les mêmes types de données 
                 (un tableau de donné à jour et un tableau vide) --*/

            sortedData = upDateList(data, i);
            data = sortedData;
            sortedData = [];

            /*-- Etape 4: fonctionnalité de fermeture des boutons DOM de filtres avancés --*/
            
            // On créé un tableau qui répertorie les id des bouton fermeture
            // Cela permet d'un associe les EventListener pour 3 choses:
            // Desactiver l'affichage des boutons, remettre le mot dans la liste DOM et enlever le mot des mots clés de filtre
            sortBtnIds.push(close_id);
            closeSortBtn(sortBtnIds, keywords, data, sortedData, nameOfList, colorOfList, nameOfListElementID);

            // Etape 5: On met à jour le tableau de mot clé supprimer de la liste DOM pour l'opération suivante
            
            deletedKeyword = [];

            // Etape 6: On affiche la nouvelle liste

            displayList(nameOfList, data);

            // Etape 7: On met à jour l'affichage des recettes

            let newRecipes = new GetSortedData(recipes, keywords).give();
            displayRecipes(newRecipes);

            // Etape 8: On utilise la récursivité pour répéter les étapes à chaque clique...
            
            newDOM(data, sortedData, nameOfList, colorOfList, nameOfListElementID);
        });
    }
}


// Fonction qui vise à prendre l'élément i d'un tableau (correspondant à l'élément cliqué) pour le supprimer
function upDateList(data, number) {
    // on prend l'indice de l'élément dans le tableau
    let indexElement = data.indexOf(data[number])
    // puis on le supprime du tableau
    data.splice(indexElement, 1);
    return data
}

// Constructor Pattern pour l'affichage des boutons de filtre avancé 
class SortBtnDOM {
    constructor(title, color, id, close_id) {
        this._title = title
        this._color = color
        this._id = id
        this._close_id = close_id
    }

    give() {

        // on créé le pattern html
        let sortBtnDOM = `<div class="sortBtn sortBtn_dimensions sortBtn_border ${this._color}" id=${this._id}>
                                <h3>${this._title}</h3>
                                <button class="close-sortBtn ${this._color}" id=${this._close_id}><i class="fa-regular fa-circle-xmark"></i></button>
                          </div>`;
    
        // pour l'injecter dans la div consacrée à l'affichage des boutons
        // L'opération s'accumule à chaque clique
        document.querySelector('.JS-sortElements').innerHTML += sortBtnDOM;
    
        // L'élément passe d'un display none à flex pour le faire apparaître
        document.getElementById(this._id).style.display = "flex";
    }
}



// Fonction de fermeture des boutons DOM des filtres avancés
// La fonction annule l'affichage du bouton cliqué, récupère le mot clé pour le supprimer des filtres
// et pour l'afficher dans la liste des filtres disponibles
// Puis mise à jour de l'affichage et des fonctionnalités de la liste de recherche avancée
function closeSortBtn(sortBtnIds, keywords, data, sortedData, nameOfList, colorOfList, nameOfListElementID) {
    for(let i=0; i<sortBtnIds.length; i++) {
        document.getElementById(sortBtnIds[i]).addEventListener('click', () => {

            // L'id d'affichage du bouton de recherche avancé et l'id de son bouton de fermeture
            // sont similaires (à un 'Btn') près
            // Cela rend plus facile le lien entre l'EventListener au clique et l'annulation de l'affichage
            // du bouton DOM
            let id = sortBtnIds[i] + 'Btn';
            // Création d'un tableau vide pour faciliter le transfert du mot correspondant
            // de la liste des mots à filtrer à la liste des filtres disponibles
            let returnKeywordTab = [];
            const regex = /\s+/g; // pour enlever les espaces dans une phrase

            // annulation de l'affichage du bouton DOM
            document.getElementById(id).style.display = "none";

            // A partir de la valeur du bouton filtre cliqué, on retrouve le mot correspondant
            // dans les mots à filtrer ... avant de le remettre dans la liste des filtres disponibles
            // La différence entre les keywords et le sortBtnIds est le 'close' devant ce dernier
            // substr() supprime cet élément (5 pour retirer les 5 premières lettres 'c''l''o''s''e')
            for(let j=0; j<keywords.length; j++) {
                if(keywords[j].replace(regex, '') === sortBtnIds[i].substr(5)) {
                    returnKeywordTab.push(keywords[j]);
                }
            }

            let returnKeyword = returnKeywordTab[0];

            // Mise à jour des mots filtres pour enlever le mot cliqué des filtres
            for(let j=0; j<keywords.length; j++) {
                if(keywords[j] === returnKeyword) {
                    keywords = upDateList(keywords, j);
                }
            }

            // Mise à jour du tableau d'ingrédients/appareils/ustensiles puis remis dans l'ordre alphabétique
            data.push(returnKeyword);
            data.sort();

            // On affiche les mises à jour de la liste DOM
            displayList(nameOfList, data);

            // On met à jour l'affichage des recettes
            let newRecipes = new GetSortedData(recipes, keywords).give();
            displayRecipes(newRecipes);

            // On met à jour les fonctionnalités de la liste DOM
            newDOM(data, sortedData, nameOfList, colorOfList, nameOfListElementID);
        });
    }
}