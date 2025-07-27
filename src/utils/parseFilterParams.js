const parseType = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return;
  const existingTypes = (type) => ['home', 'personal'].includes(type);

  if (existingTypes(type)) return type;
};

const parseIsFavourite = (value) => {
  if (typeof value !== 'string') return;
  if (value === 'true') return true;
  if (value === 'false') return false;
  return;
};

export const parseFilterParams = (query) => {
  const { contactType, isFavourite } = query;

  const parsedType = parseType(contactType);
  const parsedIsFavourite = parseIsFavourite(isFavourite);

  return {
    contactType: parsedType,
    isFavourite: parsedIsFavourite,
  };
};
