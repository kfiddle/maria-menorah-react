import "./App.css";
import MainNavigation from "./components/mainNavigation/MainNavigation";

function App() {
  const submitPurpose = () => {
    const purposeTitleToSend = "boozeAndCigarettes";

    const dataToSubmit = {
      title: purposeTitleToSend,
    };

    fetch("https://bref-chaise-13325.herokuapp.com/add-purpose", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSubmit),
    }).catch((error) => console.log(error));
  };

  return (
    <div className="App">
      <MainNavigation />
      
      
    </div>
  );
}

export default App;
