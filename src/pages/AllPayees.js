import { useState, useEffect } from "react";

import useTestHook from "../hooks/useTestHook";

import PayeesList from "../components/payees/PayeesList";

const AllPayees = (props) => {
  const [payeesList, setPayeesList] = useState([]);

  const multiplyByThree = useTestHook();

  useEffect(() => {
    const getListOfPayees = async () => {
      let payeesFromBackend = await fetch(
        "https://bref-chaise-13325.herokuapp.com/get-payees"
        // "http://localhost:8080/get-payees"
      );

      let incomingPayeesList = await payeesFromBackend.json();
      setPayeesList(incomingPayeesList);
    };

    console.log(() => { multiplyByThree(7)});

    getListOfPayees();
  }, []);



  return <PayeesList list={payeesList}/>;
};

export default AllPayees;
