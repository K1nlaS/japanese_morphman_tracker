//Misc
import { uuidv4 } from "@firebase/util";

//Checks if there is a show with the same title in the DB
export const doesEntryExist = (userListQuery, postData) => {
  const anilistTitleFilter = (anilistTitles) => {
    if (!anilistTitles) return false;

    if (!anilistTitles.english) {
      anilistTitles.english = anilistTitles.native;
    }

    return Object.values(anilistTitles).some(title => title.toLowerCase() === postData.title.toLowerCase());
  };

  return userListQuery.docs
    .filter(doc => doc.id !== postData.id)
    .some(doc => doc.data().title.toLowerCase() === postData.title.toLowerCase() || anilistTitleFilter(doc.data().Media ? doc.data().Media.title : null));
};

//Saves and returns current state of the list item to be added to the history log
export const createHistoryEntry = (listItemDoc, postData) => {
  const { knownInstances, lineReadability, uknownMorphs, updatedAt } = listItemDoc.data();

  const historyEntry = {
    id: uuidv4(),
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

//Reads a file made by Morphman's readability analyzer and extracts show's title, known instances and line readability
export const batchReaderFile = (fileRaw) => {
  let rawArray = fileRaw.split(/\r?\n/);
  rawArray = rawArray.map(l => l.split("/"));

  const readyArray = rawArray
    .map(line => {
      line[0] = line[0].split("\\").slice(-1).join("");
      line = line.toString("/");

      line = line.replace(/\t/g, '/').split("/");

      return line;
    }).map(item => {
      const updateItem = {
        title: "",
        lineReadability: "",
        knownInstances: "",
      };

      updateItem.title = item[0];
      updateItem.knownInstances = item[8];
      updateItem.lineReadability = item[10];

      return updateItem;
    });

  return readyArray;
};