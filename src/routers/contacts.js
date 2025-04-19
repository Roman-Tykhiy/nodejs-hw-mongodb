import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  addContactsControler,
  getContactsByIdControllers,
  getContactsController,
  patchContactsController,
  deleteContactsController,
} from '../controllers/contacts.js';
import { validateBody } from '../utils/validateBody.js';
import { contactaddShema, contactupdateShema } from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
const contactsRouter = Router();
contactsRouter.get('/', ctrlWrapper(getContactsController));
contactsRouter.get(
  '/:contactId',
  isValidId,
  ctrlWrapper(getContactsByIdControllers),
);
contactsRouter.post(
  '/',
  validateBody(contactaddShema),
  ctrlWrapper(addContactsControler),
);
contactsRouter.patch(
  '/:contactId',
  isValidId,
  validateBody(contactupdateShema),
  ctrlWrapper(patchContactsController),
);
contactsRouter.delete(
  '/:contactId',
  isValidId,
  ctrlWrapper(deleteContactsController),
);
export default contactsRouter;
