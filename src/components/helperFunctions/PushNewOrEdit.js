import WhichServer from "./WhichServer";

const PushNewOrEdit = async (objectToPush, pushFunction, addOrModify) => {
  const whichServer = WhichServer();

  let fullUrlToSend = `${whichServer}${pushFunction}/${addOrModify}`;

  let response = await fetch(fullUrlToSend, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(objectToPush),
  });

  return response;

};

export default PushNewOrEdit;
