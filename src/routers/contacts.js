import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { addContactsControler, getContactsByIdControllers, getContactsController, patchContactsController, deleteContactsController} from "../controllers/contacts.js";

const contactsRouter = Router();
contactsRouter.get("/", ctrlWrapper(getContactsController));
contactsRouter.get("/:contactId", ctrlWrapper(getContactsByIdControllers));
contactsRouter.post("/", ctrlWrapper(addContactsControler));
contactsRouter.patch("/:contactId", ctrlWrapper(patchContactsController));
contactsRouter.delete("/:contactId", ctrlWrapper(deleteContactsController));
export default contactsRouter;