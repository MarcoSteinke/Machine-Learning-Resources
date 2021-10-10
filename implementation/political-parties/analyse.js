class Vector {

    constructor(values) {
        this.values = values;
    }

    getDimension = () => this.values.length;

    getValues = () => this.values;

    getTotalDifference(anotherVector) {
        let diff = 0;
        for(let i = 0; i < this.values.length; i++) {
            diff += (this.values[i] != anotherVector.values[i]) ? 1 : 0;
        }

        return diff;
    }
}
  
let tmpParties = [...document.querySelector("#aussen > div.rand10px > div:nth-child(9) > table > tbody > tr:nth-child(1)").cells].map(c => c.innerText).slice(2, [...document.querySelector("#aussen > div.rand10px > div:nth-child(9) > table > tbody > tr:nth-child(1)").cells].length).map(party => party.replace("\n", ""))

let tmpPartyObjects = [];
tmpParties.forEach(party => { tmpPartyObjects.push({name: party, value: []}) });

[...[...document.querySelectorAll(".tabscroll")].map(table => [...table.firstElementChild.rows]).map(array => array.splice(1, array.length-2))].flat().forEach((row) => {
    [...row.cells].splice(2).forEach(cell => { 
        if(cell.innerText == 'Ja') { tmpPartyObjects[cell.cellIndex-2].value.push(1); }
        else if(cell.innerText == 'Nein') { tmpPartyObjects[cell.cellIndex-2].value.push(-1); }
        else { tmpPartyObjects[cell.cellIndex-2].value.push(0); }
    } );
});

tmpPartyObjects = tmpPartyObjects.map(party => {return {name: party.name, value: new Vector(party.value)}})

tmpPartyObjects