//Checks if there is a show with the same title in the DB
export const doesEntryExist = (userListQuery, postData) => {
  return userListQuery.docs
    .filter(doc => doc.id !== postData.id)
    .some(doc => doc.data().title.toLowerCase() === postData.title.toLowerCase());
};

//Saves and returns current state of the list item to be added to the history log
export const createHistoryEntry = (listItemDoc, postData) => {
  const { knownInstances, lineReadability, uknownMorphs, updatedAt } = listItemDoc.data();

  const historyEntry = {
    knownInstances,
    lineReadability,
    uknownMorphs,
    updatedAt
  };

  if (historyEntry.lineReadability !== postData.lineReadability || historyEntry.knownInstances !== postData.knownInstances) {
    return historyEntry;
  }

  return null;
};