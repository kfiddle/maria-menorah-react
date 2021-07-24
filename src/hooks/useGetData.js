import { useState, useEffect } from "react";

const useGetData = async (whichData) => {
  const [dataList, setDataList] = useState("");

  // useEffect(async () => {
  let listToReturn = [];
  let fetchUrl = "";
  if (whichData === "events") {
    // fetchUrl = "https://bref-chaise-13325.herokuapp.com/get-events";
    fetchUrl = "http://localhost:8080/get-events";
  }

  let listFromBackend = await fetch(fetchUrl);
  listToReturn = await listFromBackend.json();

  console.log(listToReturn);
  setDataList(listToReturn);
  // }, []);

  return listToReturn;
};

export default useGetData;
