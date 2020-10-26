class Person {

    constructor(id, name, gender, motherName) {
        this._id = id;
        this._name = name;
        this._gender = gender;
        this._motherName = motherName;
        this._isMarried = false;
        this._partner = null;
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get gender() {
        return this._gender;
    }
    get motherName() {
        return this._motherName;
    }
    get isMarried() {
        return this._isMarried;
    }
    get partner() {
        return this._partner;
    }
    set isMarried(val) {
        this._isMarried = val;
    }
    set partner(id) {
        this._partner = id;
    }

}

module.exports = Person;