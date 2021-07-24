import { useState, useEffect } from "react";

import FoundationsList from "../components/foundations/FoundationsList";
import useUrl from "../hooks/useUrl";

const AllFoundations = () => {
  const [foundationsList, setFoundationsList] = useState([]);

  const appropriateUrl = useUrl();
  useEffect(() => {
    const getListOfFoundations = async () => {
      let foundationsFromBackend = await fetch(
        appropriateUrl + "/get-foundations"
      );
      let incomingFoundationsList = await foundationsFromBackend.json();
      setFoundationsList(incomingFoundationsList);
    };

    getListOfFoundations();
  }, [foundationsList]);

  return <FoundationsList list={foundationsList} />;
};

export default AllFoundations;
