class Bigram {

    previous
    next
    probability
    static input = [];
    static wordCountMap = new Map();
    static SEPARATORS = ['.', ',', '!', '?', ''];
    static bigrams = [];

    constructor(previous, next) {
        this.previous = previous;
        this.next = next;
        this.findProbability();
    } 

    findProbability() {
        let sum = 0;
        Bigram.wordCountMap.get(this.previous).forEach(
            (index) => {
                if(Bigram.wordCountMap.get(this.next).includes(index+1)) {
                    sum++;
                }
            }
        )

        this.probability = sum / Bigram.wordCountMap.get(this.previous).length;

        console.log(this.toString());
    }

    toString() {
        return `P(${this.previous} | ${this.next}) = ${this.probability}`;
    }

    static formatInput(input) {

        Bigram.input = input
            .replaceAll("^", "$")
            .replaceAll(", ", ",")
            .replaceAll(". ", ".")
            .replaceAll("! ", "!")
            .replaceAll("? ", "?")
            .replaceAll(",", "^,^")
            .replaceAll(".", "^.^")
            .replaceAll("!", "^!^")
            .replaceAll("?", "^?^")
            .replaceAll(" ", "^")
            .split("^");

        let i = 1;
        while(i < Bigram.input.length) {
            if(Bigram.isSeparator(Bigram.input[Bigram.input.length - 1])) {
                Bigram.input.pop();
            }
            i++;
        }
    } 

    static isSeparator(character) {
        return Bigram.SEPARATORS.includes(character);
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

            for(let i = 0; i < Bigram.input.length - 1; i++) {
                Bigram.bigrams.push(new Bigram(Bigram.input[i], Bigram.input[i+1]));
            }

        }
    }

    static hasBigrams() {
        return Bigram.bigrams && Bigram.bigrams.length > 0 && Bigram.hasWordsCounted();
    }

    static getBigramsAsFormattedStrings() {
        if(Bigram.hasBigrams()) {
            let output = [];
    
            Bigram.bigrams.forEach(
                (bigram) => function(bigram) {
                    output.push(`P(${Bigram.previous}| ${Bigram.next}) = ${Bigram.getProbability()}`);
                }
            )
        }

        return output;
    }

    
}

let input = "One Ring to rule them all, One Ring to find them, \
One Ring to bring them all, and in the darkness bind them.";

Bigram.formatInput(input);
console.log(Bigram.input);
Bigram.countWords();
console.log(Bigram.wordCountMap);

Bigram.generateBigrams();
