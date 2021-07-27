import { useState, useEffect } from "react";

import FoundationsList from "../components/foundations/FoundationsList";

import useGetData from "../hooks/useGetData";

const AllFoundations = () => {
  const [foundationsList, setFoundationsList] = useState([]);
  const [pageLoaded, setPageLoaded] = useState(false);

  useGetData(
    "/get-stringable-foundations",
    setFoundationsList,
    pageLoaded,
    setPageLoaded
  );

  useEffect(async () => {
    setPageLoaded(true)
    
  }, []);


  return <FoundationsList list={foundationsList} />;
  // return <div>{foundationsList}</div>;
};

export default AllFoundations;
