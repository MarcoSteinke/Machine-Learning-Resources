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

let input = "One Ring to rule them all, 1$ Ring to find them, \
One Ring to bring them all, and in the darkness bind them";

Bigram.formatInput(input);
console.log(Bigram.input);
Bigram.countWords();
console.log(Bigram.wordCountMap);
