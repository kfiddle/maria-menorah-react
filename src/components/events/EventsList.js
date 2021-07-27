import { useState, useEffect } from "react";

import EventItem from "./EventItem";

import styles from "./EventsList.module.css";

const EventsList = (props) => {
  let listOfSplits = [];

  props.list.forEach((event) => {
    const splitEvent = event.split(",");
    listOfSplits.push(splitEvent);
  });

  const deleteClicked = (event) => {
    props.deleteClicked(event);
  };

  const eventsToDisplay = listOfSplits.map((event) => (
    <EventItem event={event} key={event[4]} deleteClicked={deleteClicked} />
  ));

  return (
    <div className={styles.outerContainer}>
      <div>{eventsToDisplay}</div>
    </div>
  );
};

export default EventsList;
