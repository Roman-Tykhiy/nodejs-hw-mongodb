import contactCollection from "../db/models/MyContact.js";

export const getContacts = () => contactCollection.find();
export const getContactsById = (contactId) => contactCollection.findOne({ _id: contactId });
export const addContact = payload => contactCollection.create(payload);
export const updateContact = async (contactID, payload) => {
    const data = await contactCollection.findOneAndUpdate({ _id: contactID }, payload, {
        new: true,
    });
    return data;
};

export const deleteContact = async (contactID) => contactCollection.findByIdAndDelete({_id:contactID})