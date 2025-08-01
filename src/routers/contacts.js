import express from 'express';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  showContactsController,
  showContactByIdController,
  createNewContactController,
  updateContactController,
  deleteContactController,
} from '../controllers/contacts.js';

import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';

import { contactShema, updateContactShema } from '../validation/contact.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

const router = express.Router();

router.use(authenticate);

router.get('/', ctrlWrapper(showContactsController));
router.get('/:contactId', isValidId, ctrlWrapper(showContactByIdController));

router.post(
  '/',
  validateBody(contactShema),
  ctrlWrapper(createNewContactController),
);

router.patch(
  '/:contactId',
  isValidId,
  validateBody(updateContactShema),
  ctrlWrapper(updateContactController),
);

router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));

export default router;
