import contactCollection from '../db/models/MyContact.js';
import { calcPaginationData } from '../utils/calkPaginationData.js';
import { sortList } from '../constans/contacts.js';
export const getContacts = async ({
  page = 1,
  perPage = 5,
  sortBy = '_id',
  sortOrder = sortList[0],
}) => {
  const skip = (page - 1) * perPage;
  const data = await contactCollection
    .find()
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });
  const totalItems = await contactCollection.find().countDocuments();
  const { totalPages, hasNextPage, hasPreviousPage } = calcPaginationData({
    page,
    perPage,
    totalItems,
  });
  return {
    data,
    page,
    perPage,
    totalItems,
    totalPages,
    hasNextPage,
    hasPreviousPage,
  };
};
export const getContactsById = (contactId) =>
  contactCollection.findOne({ _id: contactId });
export const addContact = (payload) => contactCollection.create(payload);
export const updateContact = async (contactID, payload) => {
  const data = await contactCollection.findOneAndUpdate(
    { _id: contactID },
    payload,
  );
  return data;
};

export const deleteContact = async (contactID) =>
  contactCollection.findByIdAndDelete({ _id: contactID });
