//Misc

//Components
import ItemHistoryEntry from "../item-history-entry/item-history-entry.comp";

//Icons
import { AiOutlineFieldNumber } from "react-icons/ai";

//Styled Components
import {
  HISTORY_HEADER,
  HISTORY_STAT,
  HISTORY_STATS,
  NO_HISTORY
} from "./list-display-item-history.styles";

const ListDisplayItemHistory = ({ show }) => {

  const { historyChange, id } = show;

  return (
    <div>
      {
        historyChange.length ? (
          <HISTORY_HEADER>
            <AiOutlineFieldNumber />
            <HISTORY_STAT>Line Readability</HISTORY_STAT>
            <HISTORY_STAT>Known Instances</HISTORY_STAT>
            <HISTORY_STAT>Uknown Morphs</HISTORY_STAT>
            <HISTORY_STAT>Updated</HISTORY_STAT>
            <HISTORY_STAT></HISTORY_STAT>
          </HISTORY_HEADER>
        ) : ""
      }
      <HISTORY_STATS>
        {
          historyChange.length ? (
            historyChange.map((entry, index) => <ItemHistoryEntry historyEntry={entry} key={index} arrayIndex={index} showId={id} />)
          ) : (
            <NO_HISTORY>No history so far</NO_HISTORY>
          )
        }
      </HISTORY_STATS>
    </div >
  );
};

export default ListDisplayItemHistory;