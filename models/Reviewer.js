const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }    
});

UserSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

UserSchema.set('toJSON', {
    virtuals: true
});


module.exports = Reviewer = mongoose.model("reviewer", UserSchema);
