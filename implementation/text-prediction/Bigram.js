class Bigram {

    previous
    next
    probability
    static input = [];

    constructor(previous, next, probability) {
        this.previous = previous;
        this.next = next;
        this.probability = probability;
    } 

    findProbability() {
        // run some logic
    }

    static formatInput(input) {
        Bigram.input = input
            .replaceAll("^", "$")
            .replaceAll(", ", ",")
            .replaceAll(". ", ".")
            .replaceAll("! ", "!")
            .replaceAll("? ", "?")
            .replaceAll(",", "^")
            .replaceAll(".", "^")
            .replaceAll("!", "^")
            .replaceAll("?", "^")
            .replaceAll(" ", "^")
            .split("^");
    } 
}