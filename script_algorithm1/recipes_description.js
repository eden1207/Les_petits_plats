class Description {
    constructor(data) {
        this._data = data
    }

    giveData() {
        let allElements = [];
        for(let i=0; i<this._data.length; i++) {
            let descriptionNameList = this._data[i].description.split(' ');
            for(let j=0; j<descriptionNameList.length; j++) {
                allElements.push(descriptionNameList[j]);
            }
        }
        return sortAllElements(allElements)
    }
}

const descriptions = new Description(recipes).giveData();