import contactCollection from "../db/models/MyContact.js";

export const getContacts = () => contactCollection.find();
export const getContactsById = (id) => contactCollection.findOne({ _id: id });