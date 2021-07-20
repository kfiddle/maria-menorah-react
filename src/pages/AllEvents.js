import { useState, useEffect } from "react";

import EventsList from "../components/events/EventsList";

const AllEvents = (props) => {
  const [eventsList, setEventsList] = useState([]);

  useEffect(() => {
    const getListOfEvents = async () => {
      let eventsFromBackend = await fetch(
        "https://bref-chaise-13325.herokuapp.com/get-events"
      );
      let incomingEventsList = await eventsFromBackend.json();
      setEventsList(incomingEventsList);
    };

    getListOfEvents();
  }, [eventsList]);

  return <EventsList list={eventsList} />;
};

export default AllEvents;
