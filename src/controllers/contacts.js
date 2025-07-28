import createHttpError from 'http-errors';

import { parsPaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

import {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
} from '../services/contacts.js';

export async function showContactsController(req, res) {
  const { page, perPage } = parsPaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const { isFavourite, contactType } = parseFilterParams(req.query);
  const userId = req.user._id;

  try {
    const contacts = await getAllContacts(
      userId,
      page,
      perPage,
      sortBy,
      sortOrder,
      isFavourite,
      contactType,
    );

    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Error retrieving contacts',
      error: error.message,
    });
  }
}

export async function showContactByIdController(req, res) {
  const { contactId } = req.params;
  const userId = req.user._id;

  const contact = await getContactById(contactId, userId);

  if (contact === null) {
    throw new createHttpError.NotFound('Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
}

export async function createNewContactController(req, res) {
  const userId = req.user._id;
  const contact = await createContact({ ...req.body, userId });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
}

export async function updateContactController(req, res) {
  const { contactId } = req.params;
  const userId = req.user._id;

  const result = await updateContact(contactId, userId, req.body);

  if (result === null) {
    throw new createHttpError.NotFound('Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result,
  });
}

export async function deleteContactController(req, res) {
  const { contactId } = req.params;
  const userId = req.user._id;

  const result = await deleteContact(contactId, userId);

  if (result === null) {
    throw new createHttpError.NotFound('Contact not found');
  }

  res.status(204).end();
}
