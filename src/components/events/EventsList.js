import { useState, useEffect } from "react";

import EventItem from "./EventItem";

import styles from "./EventsList.module.css";

const EventsList = (props) => {
  const deleteClicked = (event) => {
    props.deleteClicked(event);
  };

  const eventsToDisplay = props.list.map((event) => (
    <EventItem event={event} key={event.id} deleteClicked={deleteClicked} />
  ));

  return (
    <div className={styles.outerContainer}>
      <div>{eventsToDisplay}</div>
    </div>
  );
};

export default EventsList;
