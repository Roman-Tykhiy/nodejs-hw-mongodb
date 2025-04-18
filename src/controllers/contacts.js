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
  const data = await getContacts({ ...paginationParams, ...sortParams });
  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactsByIdControllers = async (req, res) => {
  const { contactId } = req.params;

  const data = await getContactsById(contactId);
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
  const data = await addContact(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};

export const patchContactsController = async (req, res) => {
  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body);

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
  const { contactId } = req.params;
  const data = await deleteContact(contactId);
  if (!data) {
    throw createHttpError(404, `Contact not found`);
  }
  res.status(204).send();
};
