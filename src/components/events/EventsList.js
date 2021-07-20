import { useState, useEffect } from "react";

import EventItem from "./EventItem";

import styles from "./EventsList.module.css";

const EventsList = (props) => {
  useEffect(() => {
    console.log(props.list);
  }, [props.list]);

  const eventsToDisplay = props.list.map((event) => (
    <EventItem event={event} key={event.id} />
  ));

  return (
    <div>
      <div>{eventsToDisplay}</div>
      <div>{props.list.length}</div>
    </div>
  );
};

export default EventsList;
