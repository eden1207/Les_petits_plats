class Title {
    constructor(data) {
        this._data = data
    }

    giveData() {
        let allElements = [];
        for(let i=0; i<this._data.length; i++) {
            let recipeTitle = this._data[i].name;
            allElements.push(recipeTitle);
        }
        return sortAllElements(allElements)
    }
}

const titles = new Title(recipes).giveData();