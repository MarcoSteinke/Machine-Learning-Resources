// Database/API Mockup
class Database {

    constructor() {
        this.db = [];
    }

    save(person) {
        this.db.push(person);
    }

    formatData() {
        let results = [];
        this.db.forEach(person => results.push({name: person.name.first, gender: (person.gender === "male") ? 1 : 0}));

        return results;
    }
}

const database = new Database();