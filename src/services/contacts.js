import contactCollection from "../db/models/MyContact.js";

export const getContacts = () => contactCollection.find();
export const getContactsById = (contactId) => contactCollection.findOne({ _id: contactId });