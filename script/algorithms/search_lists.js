/*-- Gestion des filtres de recherche avancée --*/

// Création de tableaux pour stocker les mots clés pour le tri. Les autres servent
// pour tout autre opération de transfert de mots clés entre les mots disponibles
// dans la liste des choix et les mots non disponibles, qui sont utilisé pour filtrer les recettes

// Tableau pour mettre la liste des mots clés cliqués
let keywords = [];

// Tableau pour mettre la liste des mots clés retirés du DOM
let deletedKeyword = [];
let sortBtnIds = [];

// Déclaration des variables contenant les 3 listes de recherche avancée
let ing = ingredients;
let app = appliance;
let ust = ustensils;

// On travaille avec des listes de tags de recherche avancée, chacun associé à un ID
// La fonction newDOM associe à chaque membre un EventListenner pour qu'au clique, l'élément soit envoyée
// dans une liste de mots-clés (utilisée par une fonction de filtre) et pour lui afficher son bouton filtre
// Si on ne se contente que de cette étape, il va y avoir un bug quand on va cliquer sur un autre membre de la liste
// En effet, vu que la liste à diminuer d'un membre, les ID risquent de ne plus correspondre à l'élément cliqué
// et la fonction ne répondra plus
// C'est pourquoi on utilise la récursivité pour redéfinir les EventListeners pour la nouvelle liste, et ainsi de suite ...

newDOM(recipes);


function newDOM(recipesData) {
    newListDOM(recipesData, ing, 'ingredient', 'sortBtnIngredients-color');
    newListDOM(recipesData, app, 'appliance', 'sortBtnAppliance-color');
    newListDOM(recipesData, ust, 'ustensil', 'sortBtnUstensils-color');
}

function newListDOM(recipesData, tabData, NameOfListElementID, ColorOfList) {
    tabData.forEach((member) => {
        let j = tabData.indexOf(member);

        // Noms des Id de chaque éléments des listes ingrédients/ustensiles/appareil
        let nameOfListElementID = NameOfListElementID;
        // Code couleur de la liste ingrédients/ustensiles/appareil
        let colorOfList = ColorOfList;

        document.getElementById(nameOfListElementID + j).addEventListener('click', () => {

            /*-- Etape 1: on récupère le mot cliqué sous forme d'un mot clé --*/

            // Les éléments composés (ex: beurre fondu) pose problème car l'algorithme ne prend que le 
            // premier élément (ici beurre) et génère des conflits (ici avec 'beurre' seul)
            // Pour y remédier, on colle les éléments composés (beurrefondu) avec replace()

            const regex = /\s+/g; // pour enlever les espaces dans une phrase

            // Le mot est mis dans le tableau de mise à jour des éléments de la liste DOM
            deletedKeyword.push(member.replace(regex, ''));

            // et mis dans un tableau des mots clés pour la fonction filtre des recettes
            keywords.push(member);

            /*-- Etape 2: Affichage du tag au clique --*/

            // Mot affiché dans le bouton
            let btnTitle = member;
            // id associé à l'affichage du bouton (display flex/none)
            let id = 'close' + deletedKeyword + 'Btn';
            // Couleur du bouton
            let colorBtn = colorOfList;
            // id associé à la fermeture du bouton
            let close_id = 'close' + deletedKeyword;
            deletedKeyword = [];

            // Observer Pattern qui affiche le bouton DOM de filtre avancé correspondant
            new SortBtnDOM(btnTitle, colorBtn, id, close_id).give();

            /*-- Etape 3: Fermeture des tags --*/

            // On créé un tableau qui répertorie les id des bouton fermeture
            // Cela permet d'en associer les EventListener pour 3 choses:
            // Desactiver l'affichage des boutons, remettre le mot dans la liste DOM et enlever le mot des mots clés de filtre
            sortBtnIds.push(close_id);
            closeSortBtn(recipesData);

            /*-- Etape 4: Filtre et affichage des recettes --*/

            let newRecipes = new GetSortedData(recipesData, keywords).give();
            displayRecipes(newRecipes);

            /*-- Etape 5: Nouvelles listes DOM à partir des nouvelles recettes --*/

            ing = new List(newRecipes, nameOfIngredientsList).giveData();
            ust = new List(newRecipes, nameOfUstensilsList).giveData();
            app = new List(newRecipes, nameOfApplianceList).giveData();

            // Listes par ordre alphabétique
            ing = ing.sort();
            ust = ust.sort();
            app = app.sort();

            // En plus de la mise à jour, il faut supprimer de la liste les mots-clés sélectionnés
            ing = updateTAG(ing, keywords);
            app = updateTAG(app, keywords);
            ust = updateTAG(ust, keywords);

            /*-- Etape 6: Affichage des nouvelles listes --*/

            displayList(nameOfIngredientsList, ing);
            displayList(nameOfUstensilsList, ust);
            displayList(nameOfApplianceList, app);

            openListBtn('JS-openIngredientsListBtn');
            openListBtn('JS-openUstensilsListBtn');
            openListBtn('JS-openApplianceListBtn');

            closeListBtn('JS-closeIngredientsListBtn');
            closeListBtn('JS-closeUstensilsListBtn');
            closeListBtn('JS-closeApplianceListBtn');

            /*-- Etape 7: On utilise la récursivité pour répéter les étapes à chaque clique... --*/

            newDOM(recipesData);
        });
    });
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


// Fonction pour supprimer des listes de filtres les mots-clés sélectionnés
function updateTAG(tagTab, keywords) {
    keywords.forEach((member1) => {
        let keyword = member1;
        tagTab.forEach((member2) => {
            if(keyword === member2) {
                let indexElement = tagTab.indexOf(member2)
                // puis on le supprime du tableau
                tagTab.splice(indexElement, 1);
            }
        });
    });
    return tagTab
}


// Fonction de fermeture des boutons DOM des filtres avancés
// La fonction annule l'affichage du bouton cliqué, récupère le mot clé pour le supprimer des filtres
// Puis mise à jour de l'affichage et des fonctionnalités de la liste de recherche avancée
function closeSortBtn(recipesData) {
  sortBtnIds.forEach((member) => {
      document.getElementById(member).addEventListener('click', () => {

          // L'id d'affichage du bouton de recherche avancé et l'id de son bouton de fermeture
          // sont similaires (à un 'Btn') près
          // Cela rend plus facile le lien entre l'EventListener au clique et l'annulation de l'affichage
          // du bouton DOM
          let id = member + 'Btn';
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

          returnKeywordTab = keywords.filter((e) => {
              if(e.replace(regex, '') === member.substr(5)) {
                return true
              }
            });

          let returnKeyword = returnKeywordTab[0];

          // Mise à jour des mots filtres pour enlever le mot cliqué des filtres
          keywords = keywords.filter((e) => {
                if(e !== returnKeyword) {
                    return true
                }
            });

          // On met à jour l'affichage des recettes
          let newRecipes = new GetSortedData(recipesData, keywords).give();
          displayRecipes(newRecipes);

          // On affiche les mises à jour de la liste DOM
          ing = new List(newRecipes, nameOfIngredientsList).giveData();
          ust = new List(newRecipes, nameOfUstensilsList).giveData();
          app = new List(newRecipes, nameOfApplianceList).giveData();

          ing = ing.sort();
          ust = ust.sort();
          app = app.sort();

          displayList(nameOfIngredientsList, ing);
          displayList(nameOfUstensilsList, ust);
          displayList(nameOfApplianceList, app);

          openListBtn('JS-openIngredientsListBtn');
          openListBtn('JS-openUstensilsListBtn');
          openListBtn('JS-openApplianceListBtn');

          closeListBtn('JS-closeIngredientsListBtn');
          closeListBtn('JS-closeUstensilsListBtn');
          closeListBtn('JS-closeApplianceListBtn');

          newDOM(recipesData);
        });
    });
}