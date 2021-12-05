class Vector {

    constructor(values) {
        this.values = values;
    }

    getDimension = () => this.values.length;

    getValues = () => this.values;

    getTotalDifference(anotherVector) {
        let diff = 0;
        this.values.forEach((e,i) => { return (this.values[i] != anotherVector.values[i]) ? diff++ : diff = diff; })
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

console.log(tmpPartyObjects);

let partiesWithTotalValue = tmpPartyObjects.map(party => {party.totalValue = party.value.values.reduce((a,b) => a+b); return party})

console.log(partiesWithTotalValue);

// Print parties which received the same totalValue
for(let i = 0; i < partiesWithTotalValue.length; i++)
  for(let j = 0; j < partiesWithTotalValue.length; j++)
    if(partiesWithTotalValue[i].totalValue == partiesWithTotalValue[j].totalValue && i != j) 
        console.log(
            `party1 = ${partiesWithTotalValue[i].name} (${i}),\nparty2 = ${partiesWithTotalValue[j].name} (${j}),\ntotalValue = ${partiesWithTotalValue[i].totalValue},\ndifference = ${partiesWithTotalValue[i].value.getTotalDifference(partiesWithTotalValue[j].value)}\n`
        )