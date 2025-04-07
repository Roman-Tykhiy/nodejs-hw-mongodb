import { Schema, model } from "mongoose";

const MyContactSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    
    phoneNumber: {
        type: Number,
        require: true,
    },

    email: {
        type: String,
        require: true,
    },

    isFavourite: {
        type: Boolean,
        require: true,
    },
    contactType: {
        type: String,
        require: true,
    },

    createdAt: {
        type: String,
        require: true,
    },

    updatedAt: {
        type: String,
        require: true,
    },

});

const contactCollection = model("contacts", MyContactSchema);
export default contactCollection;