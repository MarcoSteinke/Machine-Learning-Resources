class Bigram {

    previous
    next
    probability
    static input = [];
    static wordCountMap = new Map();
    static SEPARATORS = ['.', ',', '!', '?', '', "\n"];
    static bigrams = [];

    constructor(next, previous) {
        this.next = next;
        this.previous = previous;
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
    }

    toString() {
        return `P(${this.next} | ${this.previous}) = ${this.probability}`;
    }

    static formatInput(input) {

        Bigram.input = [];

        Bigram.input = input
            .replaceAll("^", "$")
            .replaceAll("\"", "")
            .replaceAll("-", "")
            .replaceAll(";", "")
            .replaceAll(", ", ",")
            .replaceAll(". ", ".")
            .replaceAll("! ", "!")
            .replaceAll("? ", "?")
            .replaceAll(",", "^,^")
            .replaceAll(".", "^.^")
            .replaceAll("!", "^!^")
            .replaceAll("?", "^?^")
            .replaceAll("\n ", "\n")
            .replaceAll("\n", "^\n^")
            .replaceAll(" ", "^")
            .split("^");

        let i = 1;
        while(i < Bigram.input.length) {
            if(Bigram.isSeparator(Bigram.input[Bigram.input.length - 1])) {
                Bigram.input.pop();
            }
            i++;
        }

        Bigram.input = Bigram.input.map((entry) => (entry.toLowerCase()));

        console.log(Bigram.input);
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
        Bigram.wordCountMap.clear();
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
        let existingBigramHashes = [];
        Bigram.bigrams = [];
        if(Bigram.hasWordsCounted()) {

            for(let i = 0; i < Bigram.input.length - 1; i++) {
                if(!(Bigram.SEPARATORS.includes(Bigram.input[i+1]) || Bigram.SEPARATORS.includes(Bigram.input[i]))) {
                    if(!existingBigramHashes.includes(Bigram.input[i+1] + Bigram.input[i])) {
                        Bigram.bigrams.push(new Bigram(Bigram.input[i+1], Bigram.input[i]));
                        existingBigramHashes.push(Bigram.input[i+1] + Bigram.input[i]);
                    }
                }
            }

        }
    }

    static hasBigrams() {
        return Bigram.bigrams && Bigram.bigrams.length > 0 && Bigram.hasWordsCounted();
    }

    static hasProbabilities() {
        return Bigram.bigrams.filter(b => b.probability == null).length == 0;
    }

    static getBigramsAsFormattedStrings() {
        return Bigram.hasBigrams() ? Bigram.bigrams.map(bigram => bigram.toString()) : [];
    }

    static clearDOM() {
        document.querySelectorAll(".col").forEach(
            (col) => (col.innerHTML = '')
        );
    }

    static selectMostProbableForWord(word) {
        if(Bigram.hasBigrams() && Bigram.hasProbabilities()) {

            return Bigram.bigrams
                .filter(bg => bg.previous == word)
                .sort(function(a,b) {return b.probability-a.probability;})
                .splice(0,3);

        } else return [];
    }

    static addProbabilitiesToTheDOM() {
        Bigram.formatInput(document.querySelector("#input").value);
        Bigram.countWords();
        Bigram.generateBigrams();
        Bigram.clearDOM();
        for(let i = 0; i < Bigram.bigrams.length; i++) {
            document.querySelectorAll(".col")[i % 2].insertAdjacentHTML("beforeend", `<p style=\"font-size: 1.1rem;\">${Bigram.bigrams[i].toString()}</p><br>`);
        }

        document.querySelector("#listlength").innerHTML = `The training data had a length of ${Math.round(Bigram.input.length * 0.80)} words.`;
    }
}

let input = "One Ring to rule them all, One Ring to find them, \
One Ring to bring them all, and in the darkness bind them.";
