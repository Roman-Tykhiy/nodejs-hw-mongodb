import { sortList } from '../constans/contacts.js';
export const parseSortParams = ({ sortBy, sortOrder }, contactSortFields) => {
  const parseSortOrder = sortList.includes(sortOrder) ? sortOrder : sortList[0];
  const parseSortBY = contactSortFields.includes(sortBy) ? sortBy : '_id';
  return {
    sortBy: parseSortBY,
    sortOrder: parseSortOrder,
  };
};
