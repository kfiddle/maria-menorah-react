import { useState, useEffect } from "react";

import FoundationsList from "../components/foundations/FoundationsList";

const AllFoundations = () => {
  const [foundationsList, setFoundationsList] = useState([]);

  useEffect(() => {
    const getListOfFoundations = async () => {
      let foundationsFromBackend = await fetch(
        "https://bref-chaise-13325.herokuapp.com/get-foundations"
        // "http://localhost:8080/get-foundations"
      );
      let incomingFoundationsList = await foundationsFromBackend.json();
      console.log(incomingFoundationsList);
      setFoundationsList(incomingFoundationsList);
    };

    getListOfFoundations();
  }, [foundationsList]);

  return <FoundationsList list={foundationsList} />;
};

export default AllFoundations;
