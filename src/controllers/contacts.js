import createHttpError from 'http-errors';
import {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
} from '../services/contacts.js';

export async function showContactsController(req, res, next) {
  try {
    const contacts = await getAllContacts();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
}

export async function showContactByIdController(req, res, next) {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
      throw new createHttpError.NotFound('Contact not found');
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
}

export async function createNewContactController(req, res, next) {
  try {
    const contact = await createContact(req.body);
    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateContactController(req, res, next) {
  try {
    const result = await updateContact(req.params.contactId, req.body);

    if (!result) {
      throw new createHttpError.NotFound('Contact not found');
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteContactController(req, res, next) {
  try {
    const result = await deleteContact(req.params.contactId);

    if (!result) {
      throw new createHttpError.NotFound('Contact not found');
    }

    res.status(204).end();
  } catch (error) {
    next(error);
  }
}
