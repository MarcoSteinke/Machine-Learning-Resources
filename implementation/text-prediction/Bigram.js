class Bigram {

    previous
    next
    probability
    static input = [];
    static wordCountMap = new Map();

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

    static countWords() {
        if(Bigram.input && Bigram.input.length > 0) {
            Bigram.input.forEach(
                (word) => {
                    if(!Bigram.wordCountMap.get(word)) {
                        Bigram.wordCountMap.set(word, 1);
                    } else {
                        Bigram.wordCountMap.set(word, Bigram.wordCountMap.get(word) + 1);
                    }
                }
            )
        }
    }
}