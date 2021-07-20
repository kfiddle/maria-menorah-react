import { useState, useEffect } from "react";

import MainNavigation from "./components/mainNavigation/MainNavigation";
import EventsList from "./components/events/EventsList";
import EntryForm from "./components/entry/EntryForm";

import "./App.css";
import FoundationsList from "./components/foundations/Foundations";

function App() {
  const [entryFormRendered, setEntryFormRendered] = useState(false);
  const [foundationsListClicked, setFoundationsListClicked] = useState(false);
  const [eventsList, setEventsList] = useState([]);

  let incomingEventsList = [];

  useEffect(() => {
    const getListOfEvents = async () => {
      let eventsFromBackend = await fetch(
        "https://bref-chaise-13325.herokuapp.com/get-events"
      );
      incomingEventsList = await eventsFromBackend.json();
      setEventsList(incomingEventsList);
    };

    getListOfEvents();
  }, [eventsList]);

  const openModalHandler = (navItem) => {
    if (navItem === "entry") {
      setEntryFormRendered(true);
    } else if (navItem === "foundations") {
      setFoundationsListClicked(true);
    }
  };
  const closeModalHandler = () => {
    setEntryFormRendered(false);
  };

  return (
    <div className="App">
      <MainNavigation navClicked={openModalHandler} />
      {entryFormRendered && <EntryForm closeModal={closeModalHandler} />};
      {/* <EventsList list={eventsList} /> */}
      <FoundationsList />
    </div>
  );
}

export default App;

// const submitPurpose = () => {
//   const purposeTitleToSend = "boozeAndCigarettes";

//   const dataToSubmit = {
//     title: purposeTitleToSend,
//   };

//   fetch("https://bref-chaise-13325.herokuapp.com/add-purpose", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(dataToSubmit),
//   }).catch((error) => console.log(error));
// };
