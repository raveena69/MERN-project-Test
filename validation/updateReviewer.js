const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateUpdateUserInput(data) {
    let errors = {};
    data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    if (Validator.isEmpty(data.firstName)) {
        errors.firstName = "First Name field is required";
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    };
};
