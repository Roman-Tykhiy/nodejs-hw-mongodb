import contactCollection from '../db/models/MyContact.js';
import { calcPaginationData } from '../utils/calkPaginationData.js';
import { sortList } from '../constans/contacts.js';
export const getContacts = async ({
  page = 1,
  perPage = 5,
  sortBy = '_id',
  sortOrder = sortList[0],
  filters = {},
}) => {
  const skip = (page - 1) * perPage;

  const contactsQuery = contactCollection.find({ userId: filters });

  const totalItems = await contactCollection
    .find()
    .merge(contactsQuery)
    .countDocuments();

  const data = await contactsQuery
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });

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
export const getContactsById = async (contactId, filters) => {
  const contactsQuery = contactCollection.findOne({
    _id: contactId,
    userId: filters,
  });

  const data = await contactsQuery;
  return data;
};

export const addContact = (payload) => contactCollection.create(payload);
export const updateContact = async (contactId, payload, filters) => {
  const data = await contactCollection.findOneAndUpdate(
    { _id: contactId, userId: filters },
    payload,
  );
  return data;
};

export const deleteContact = (contactId, filters) =>
  contactCollection.findOneAndDelete({ _id: contactId, userId: filters });
