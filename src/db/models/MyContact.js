import { Schema, model } from "mongoose";

const MyContactSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    
    phoneNumber: {
        type: String,
        require: true,
    },

    email: {
        type: String,
    },

    isFavourite: {
        type: Boolean,
        default: false,
    },
    contactType: {
        type: String,
        enum: ["work", "home", "personal"],
        require: true,
        default: ["personal"],
    },
},
{ timestamps: true}
);

const contactCollection = model("contacts", MyContactSchema);
export default contactCollection;