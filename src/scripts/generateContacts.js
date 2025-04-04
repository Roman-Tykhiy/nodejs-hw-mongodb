import { createFakeContact } from "../utils/createFakeContact.js";
import { readContacts } from "../utils/readContacts.js";
import { writeContacts } from "../utils/writeContacts.js";
export const generateContacts = async (number) => { 
    const contactList = await readContacts();
    const newcontactList = Array(number).fill(0).map(() => createFakeContact())
    await writeContacts([...contactList, ...newcontactList])
    
};

generateContacts(5);
