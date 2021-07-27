import { useState, useEffect, Fragment } from "react";

import EventsList from "../components/events/EventsList";
import DeleteForm from "../components/delete/DeleteForm";
import useGetData from "../hooks/useGetData";

const AllEvents = (props) => {
  const [eventsList, setEventsList] = useState([]);
  const [deleteFormRendered, setDeleteFormRendered] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [pageLoaded, setPageLoaded] = useState(false);

  useGetData("/get-stringable-events", setEventsList, pageLoaded, setPageLoaded);

  const deleteClicked = (event) => {
    setDeleteFormRendered(true);
    setEventToDelete(event);
  };

  const closeDeleteModal = () => {
    setDeleteFormRendered(false);
  };

  useEffect(() => {
    setPageLoaded(true);
  }, []);



  return (

    // <div>{eventsList}</div>
    
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
