import { useEffect } from "react";

const useGetData =  (whichData) => {
  useEffect(async () => {
    let listToReturn = [];
    let fetchUrl = "";
    if (whichData === "purposes") {
      fetchUrl = "https://bref-chaise-13325.herokuapp.com/get-purposes";
    }

    let listFromBackend = await fetch(fetchUrl);
    listToReturn = await listFromBackend.json();

    return listToReturn;
  }, [whichData]);
};

export default useGetData;
