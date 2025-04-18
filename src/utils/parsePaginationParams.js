const parseNumber = (value, defoultValue) => {
  if (typeof value !== 'string') return defoultValue;
  const parseValue = parseInt(value);
  if (Number.isNaN(parseValue)) return defoultValue;
  return parseValue;
};
export const parsePaginationParams = ({ page, perPage }) => {
  const parsePage = parseNumber(page, 1);
  const parsePerPage = parseNumber(perPage, 10);

  return {
    page: parsePage,
    perPage: parsePerPage,
  };
};
