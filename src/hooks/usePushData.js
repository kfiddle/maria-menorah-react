const usePushData = async (objectToDelete, submitted, stateChangeFunction) => {
  if (submitted) {
    fetch("https://bref-chaise-13325.herokuapp.com/delete-event", {
    // fetch("http://localhost:8080/delete-event", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(objectToDelete),
    })
      .then((response) => {
        if (response.ok) {
          // setSuccessfulDelete(true);
          stateChangeFunction(true);
        }
      })
      .catch((error) => console.log(error));
  }
};

export default usePushData;
