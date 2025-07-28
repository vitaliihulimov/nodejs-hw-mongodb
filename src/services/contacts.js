import { ContactCollection } from '../models/contact.js';

export async function getAllContacts(
  userId,
  page,
  perPage,
  sortBy,
  sortOrder,
  isFavourite,
  contactType,
) {
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const filter = { userId };

  if (typeof isFavourite === 'boolean') {
    filter.isFavourite = isFavourite;
  }

  if (contactType) {
    filter.contactType = contactType;
  }

  const contactsQuery = ContactCollection.find(filter);

  const [totalItems, data] = await Promise.all([
    ContactCollection.countDocuments(filter),
    contactsQuery
      .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
      .skip(skip)
      .limit(perPage),
  ]);

  const totalPages = Math.ceil(totalItems / perPage);

  return {
    data,
    page,
    perPage,
    totalItems,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: totalPages > page,
  };
}

export function getContactById(contactId, userId) {
  return ContactCollection.findOne({ _id: contactId, userId });
}

export function createContact(payload) {
  return ContactCollection.create(payload);
}

export function updateContact(contactId, userId, payload) {
  return ContactCollection.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
    { new: true },
  );
}

export function deleteContact(contactId, userId) {
  return ContactCollection.findOneAndDelete({ _id: contactId, userId });
}
