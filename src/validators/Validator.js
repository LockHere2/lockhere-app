
export default class Validator {

    constructor(errors) {
        this.errors = errors;
        this.isValid = !Object.keys(this.errors).length;
    }
    
}
