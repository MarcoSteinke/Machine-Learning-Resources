class Entry {

    variables;

    constructor(variables = []) {
        this.variables = [];
        
        variables.forEach(variable => this.variables.push(variable));
    }

    getDimension = () => this.variables.length;
}