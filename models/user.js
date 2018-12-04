const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

UserSchema = new Schema({

    Account_id: mongoose.Schema.ObjectId,

    createdAt: {
        type: Date,
        default: Date.now
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true

    },

    password: {
        type: String,
        required: true,

    },

    // apikey: {
    //     type: String,
    //     // required: true,
    //     unique: true
    // }

})

UserSchema.pre("save", (next) => {


    // ENCRYPT PASSWORD
    const user = this;
    // if (!user.isModified("password")) { // If user is not modifing password send request
    //     return next();
    // }
    bcrypt.genSalt(10, (err, salt) => { // Ten rounds of salting
        bcrypt.hash(user.password, salt, (err, hash) => { // Hash user password with salt
            user.password = hash; // Update password attribute to be the hash password
            next(); // Continue
        });
    });
});

// Need to use function to enable this.password to work.
UserSchema.methods.comparePassword = function (password, done) {
    console.log("This is the password argument for comapre password:", password)
    console.log("This is the this.password argument for compare password:", this.password)
    bcrypt.compare(password, this.password, (err, isMatch) => { // Comapre hashed password to rehashed password to confirm

        done(err, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);