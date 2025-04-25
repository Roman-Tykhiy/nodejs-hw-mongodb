import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { contactSortFields } from '../db/models/MyContact.js';
import {
  addContact,
  deleteContact,
  getContacts,
  getContactsById,
  updateContact,
} from '../services/contacts.js';

export const getContactsController = async (req, res) => {
  const paginationParams = parsePaginationParams(req.query);
  const sortParams = parseSortParams(req.query, contactSortFields);
  const filters = req.user._id;
  const data = await getContacts({
    ...paginationParams,
    ...sortParams,
    filters,
  });
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactsByIdControllers = async (req, res) => {
  const { contactId } = req.params;
  const filters = req.user._id;
  const data = await getContactsById(contactId, filters);
  if (!data) {
    throw createHttpError(404, `Contact not found`);
  }
  res.json({
    status: 200,
    message: `Successfully find contact with id ${contactId}`,
    data,
  });
};

export const addContactsControler = async (req, res) => {
  const { _id: userId } = req.user;
  const data = await addContact({ ...req.body, userId });
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};

export const patchContactsController = async (req, res) => {
  const filters = req.user._id;
  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body, filters);

  if (!result) {
    throw createHttpError(404, `Contact not found`);
  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result,
  });
};

export const deleteContactsController = async (req, res) => {
  const filters = req.user._id;
  const { contactId } = req.params;
  const data = await deleteContact(contactId, filters);

  if (!data) {
    throw createHttpError(404, `Contact not found`);
  }
  res.status(204).send();
};
