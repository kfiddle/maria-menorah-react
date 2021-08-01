import { useState, useEffect } from "react";

import MasterBudget from "../components/masterBudget/MasterBudget";

const HelenMaster = () => {
  const [budget, setFoundationsList] = useState([]);

  useEffect(() => {
    const getListOfFoundations = async () => {
      let foundationsFromBackend = await fetch(
        // "https://bref-chaise-13325.herokuapp.com/get-foundations"
        "http://localhost:8080/get-foundations"
      );
    
      let incomingFoundationsList = await foundationsFromBackend.json();
      setFoundationsList(incomingFoundationsList);
    };

    getListOfFoundations();
  }, []);

  return <FoundationsList list={foundationsList} />;

};

export default HelenMaster;
