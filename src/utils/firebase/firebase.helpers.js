

export const doesEntryExist = (userListQuery, postData) => {
  return !userListQuery.docs
    .some(doc => doc.data().title.toLowerCase() === postData.title.toLowerCase());
};