import { useState, useEffect } from "react";

import PayeesList from "../components/payees/PayeesList";
import GetAList from "../components/helperFunctions/GetAList";

const AllPayees = (props) => {
  const [payeesList, setPayeesList] = useState([]);

  useEffect(() => {
    const getPayees = async () => {
      const allPayees = await GetAList("get-payees");
      setPayeesList(allPayees);
    };

    getPayees();
  }, [payeesList]);

  return <PayeesList list={payeesList} />;
};

export default AllPayees;
