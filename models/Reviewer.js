const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    reviewerName: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    userName: {
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
