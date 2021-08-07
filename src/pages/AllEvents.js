import { useState, useEffect, Fragment } from "react";

import EventsList from "../components/events/EventsList";
import DeleteForm from "../components/delete/DeleteForm";
import GetAList from "../components/helperFunctions/GetAList";

const AllEvents = (props) => {
  const [eventsList, setEventsList] = useState([]);
  const [deleteFormRendered, setDeleteFormRendered] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  const deleteClicked = (event) => {
    setDeleteFormRendered(true);
    setEventToDelete(event);
  };

  const closeDeleteModal = () => {
    setDeleteFormRendered(false);
  };

  useEffect(() => {
    const getListOfEvents = async () => {
      const allEvents = await GetAList("get-events");
      setEventsList(allEvents);
    };

    getListOfEvents();
  }, []);

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
