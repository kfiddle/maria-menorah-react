import WhichServer from "./WhichServer";

const GetAList = async (whichList) => {
  const whichServer = WhichServer();

  let listOfThingsFromBackend = await fetch(whichServer + whichList);

  let incomingList = await listOfThingsFromBackend.json();
  return incomingList;
};

export default GetAList;
