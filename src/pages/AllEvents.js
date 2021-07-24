import { useState, useEffect, Fragment } from "react";

import EventsList from "../components/events/EventsList";
import DeleteForm from "../components/delete/DeleteForm";
import useUrl from "../hooks/useUrl";

const AllEvents = (props) => {
  const [eventsList, setEventsList] = useState([]);
  const [deleteFormRendered, setDeleteFormRendered] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  const appropriateFetchUrl = useUrl();

  const deleteClicked = (event) => {
    setDeleteFormRendered(true);
    setEventToDelete(event);
  };

  const closeDeleteModal = () => {
    setDeleteFormRendered(false);
  };

  useEffect(() => {
    const getListOfEvents = async () => {
      let eventsFromBackend = await fetch(appropriateFetchUrl + "/get-events");
      let incomingEventsList = await eventsFromBackend.json();
      setEventsList(incomingEventsList);
    };

    getListOfEvents();
  }, [eventsList]);

  return (
    <Fragment>
      <EventsList list={eventsList} deleteClicked={deleteClicked} />;
      {deleteFormRendered && (
        <DeleteForm
          eventToDelete={eventToDelete}
          closeModal={closeDeleteModal}
        />
      )}
    </Fragment>
  );
};

export default AllEvents;
