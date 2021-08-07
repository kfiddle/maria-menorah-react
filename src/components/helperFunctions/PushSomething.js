import WhichServer from "./WhichServer";

const PushSomething = async (objectToPush, pushFunction) => {
  const whichServer = WhichServer();

  let responseAfterPushing = await fetch(whichServer + pushFunction, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(objectToPush),
  });

  return responseAfterPushing.ok;

};

export default PushSomething;
