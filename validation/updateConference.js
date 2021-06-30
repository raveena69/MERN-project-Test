const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateUpdateUserInput(data) {
    let errors = {};
    data.guestSpeaker = !isEmpty(data.guestSpeaker) ? data.guestSpeaker : "";
    data.description = !isEmpty(data.description) ? data.description : "";
    if (Validator.isEmpty(data.guestSpeaker)) {
        errors.guestSpeaker = "Guest Speaker field is required";
    }
    if (Validator.isEmpty(data.description)) {
        errors.description = "Description field is required";
    } 
    return {
        errors,
        isValid: isEmpty(errors)
    };
};
