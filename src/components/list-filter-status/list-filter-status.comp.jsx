//Misc
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

//Components
import { NavLink } from "react-router-dom";

//Selectors
import { selectList } from "../../store/list/list.selector";

//Styled Components
import {
  STATUS_FILTER_CONTAINER,
  FILTER_HEADER,
  FILTER_BODY,
  NAV_ITEM
} from "./list-filter-status.styles";

const countsInitial = {
  all: 0,
  watching: 0,
  ready: 0,
  planning: 0,
  completed: 0,
  legacy: 0,
};

const ListFilterStatus = () => {

  const { list } = useSelector(selectList);

  const counts = useRef(countsInitial);
  const { all, watching, planning, completed, legacy, ready } = counts.current;

  useEffect(() => {

    counts.current = { ...countsInitial };

    for (const show of Object.keys(list)) {
      const { status } = show;

      switch (status) {
        case "Watching":
          counts.current.watching++;
          counts.current.all++;
          break;

        case "Ready":
          counts.current.ready++;
          counts.current.all++;
          break;

        case "Planning":
          counts.current.planning++;
          counts.current.all++;
          break;

        case "Completed":
          counts.current.completed++;
          counts.current.all++;
          break;

        case "Legacy":
          counts.current.legacy++;
          counts.current.all++;
          break;

        default:
          break;
      }
    }
  }, [list]);

  return (
    <STATUS_FILTER_CONTAINER>
      <FILTER_HEADER>List</FILTER_HEADER>

      <FILTER_BODY>
        <NAV_ITEM>
          <NavLink to={"/home/"}>All <span>{all}</span></NavLink>
        </NAV_ITEM>

        <NAV_ITEM>
          <NavLink to={"/home/Watching"}>Watching <span>{watching}</span></NavLink>
        </NAV_ITEM>

        <NAV_ITEM>
          <NavLink to={"/home/Ready"}>Ready <span>{ready}</span></NavLink>
        </NAV_ITEM>

        <NAV_ITEM>
          <NavLink to={"/home/Planning"}>Planning <span>{planning}</span></NavLink>
        </NAV_ITEM>

        <NAV_ITEM>
          <NavLink to={"/home/Completed"}>Completed <span>{completed}</span></NavLink>
        </NAV_ITEM>

        <NAV_ITEM>
          <NavLink to={"/home/Legacy"}>Legacy <span>{legacy}</span></NavLink>
        </NAV_ITEM>
      </FILTER_BODY>

    </STATUS_FILTER_CONTAINER>
  );
};

export default ListFilterStatus;