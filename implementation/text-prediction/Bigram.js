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
        const SEPARATORS = ['.', ',', '!', '?', ''];


        Bigram.input = input
            .replaceAll("^", "$")
            .replaceAll(", ", ",")
            .replaceAll(". ", ".")
            .replaceAll("! ", "!")
            .replaceAll("? ", "?")
            .replaceAll(",", "^,^")
            .replaceAll(".", "^.^")
            .replaceAll("!", "^,^")
            .replaceAll("?", "^,^")
            .replaceAll(" ", "^")
            .split("^");

        let i = 1;
        while(i < Bigram.input.length) {
            if(SEPARATORS.includes(Bigram.input[Bigram.input.length - 1])) {
                Bigram.input.pop();
            }
            i++;
        }
    } 

    static hasInput() {
        return Bigram.input && Bigram.input.length > 0;
    }

    static isFormatted() {
        return Bigram.hasInput() && Bigram.input.join("").indexOf(" ") == -1;
    }

    static hasWordsCounted() {
        return Bigram.wordCountMap.size > 0;
    }

    static countWords() {
        let i = 0;
        if(Bigram.hasInput() && Bigram.isFormatted()) {
            Bigram.input.forEach(
                (word) => {
                    if(!Bigram.wordCountMap.has(word)) {
                        Bigram.wordCountMap.set(word, [i++]);
                    } else {
                        let tmpArr = Bigram.wordCountMap.get(word);
                        tmpArr.push(i++);
                        Bigram.wordCountMap.set(word, tmpArr);
                    }
                }
            )
        }
    }

    static generateBigrams() {
        if(Bigram.hasWordsCounted()) {


        }
    }
}

let input = "One Ring to rule them all, 1$ Ring to find them, \
One Ring to bring them all, and in the darkness bind them.";

Bigram.formatInput(input);
console.log(Bigram.input);
Bigram.countWords();
console.log(Bigram.wordCountMap);
