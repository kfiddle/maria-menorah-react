import { useState, useEffect } from "react";

import EventItem from "./EventItem";

import styles from "./EventsList.module.css";

const EventsList = (props) => {
  const eventsToDisplay = props.list.map((event) => (
    <EventItem event={event} key={event.id} />
  ));

  return (
    <div>
      <div>{eventsToDisplay}</div>
    </div>
  );
};

export default EventsList;
