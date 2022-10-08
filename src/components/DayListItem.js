import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";


export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots
  });
  const formatSpots = function (spots) {
    if (props.spots === 0) {
      return "no spots availble";
    }
    if (props.spots === 1) {
      return "1 spot available";
    }
    return `${props.spots} spots available`;
  }
  return (
    <li
      className={dayClass}
      onClick={() => props.setDay(props.name)}
    >
      {props.children}
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{props.formatSpots} spots remaining</h3>
    </li>
  );
}