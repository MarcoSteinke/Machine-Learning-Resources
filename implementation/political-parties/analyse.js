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

    getParticipation = () => this.getTotalDifference(new Vector(new Array(this.values.length).fill(0)));

    // finding the right metric to form the party landscape (left, center, right)
    getParticipationFactor = () => this.getParticipation() / this.values.length;
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

// sort parties by their participationFactor
let sortedByParticipationFactor = tmpPartyObjects.sort((a,b) => b.value.getParticipationFactor() - a.value.getParticipationFactor()).map(p => {p.participationFactor = p.value.getParticipationFactor(); return p})
console.log(sortedByParticipationFactor);

// neural network:
let inputLabels = [];

for(let i = 1; i <= partiesWithTotalValue[0].value.values.length; i++) inputLabels.push(`x${i}`);

// Helper function to transform 
function arrayToObject(array) {
    
    let dataMap = new Map();
    
    for(let i = 0; i < array.length; i++) {
        dataMap.set(`x${i+1}`, array[i]);
    }  
    
    return Object.fromEntries(dataMap);
}

// Sigmoid function
function sig(t) {
    return 1 / ( 1 + Math.pow(Math.E, -t));
}


let inputs = partiesWithTotalValue.map(party => arrayToObject(party.value.values.map(v => {return sig(v)})));

const options = {
    task: 'regression',
    inputs: inputLabels,
    debug: true,
    layers: [
        {
          type: 'dense',
          units: 88,
          activation: 'relu'
        },
        {
          type: 'dense',
          units: 24,
          activation: 'sigmoid'
        },
        {
          type: 'dense',
          units: 1,
          activation: 'sigmoid'
        }
      ]
  }

const nn = ml5.neuralNetwork(options);

inputs.forEach(
    (party, index) => {
        nn.addData(party, {output: index});
    }
)

nn.normalizeData();

const trainingOptions = {
    epochs: 64,
    batchSize: 12
}

nn.train(trainingOptions, finishedTraining);

function finishedTraining() {
    console.log('Training finished.');
}

function handleResults(error, result) {
    if(error){
      console.error(error);
      return;
    }
    console.log(result); // {label: 'red', confidence: 0.8};
}
