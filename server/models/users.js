const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    type: {
        type: String,
        required: true,
        enum: ["Tutor", "Student","Admin"],
        default: "Student",
    },
    subscriptions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Courses",
            required: true,
        }
    ],
    institution: {
        type: String,
    },
    bio: {
        type: String,
    },
    image: {
        type: String,
    },
    push_notification: {
        type: Object,
    },
    bookmarks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Courses",
            required: true,
        }
    ],
    status:{
        type:Boolean,
        default:false
    }
},
    {
        timestamps: true,
    });
// Encrypt password using bcrypt
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});
// Match user entered password to hashed password in database
userSchema.methods.matchPasswords = async function (enteredPassword) {
    try {
        return await bcrypt.compare(String(enteredPassword), this.password);
    } catch (error) {
        throw new Error("Error comparing passwords: " + error.message);
    }
};

module.exports = mongoose.model("User", userSchema);