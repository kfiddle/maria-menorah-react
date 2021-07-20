import { useState } from 'react';

import EntryForm from "./components/entry/EntryForm";
import MainNavigation from "./components/mainNavigation/MainNavigation";

import "./App.css";

function App() {
  const [entryFormRendered, setEntryFormRendered] = useState(false);

  const openModalHandler = () => {
    setEntryFormRendered(true);
  };
  const closeModalHandler = () => {
    setEntryFormRendered(false);
  };


  

  return (
    <div className="App">
      <MainNavigation entryFormClicked={openModalHandler} />
      {entryFormRendered && <EntryForm />};
      

    </div>
  );
}

export default App;

// function App() {


//   return (
//     <CartProvider>
//       {cartRendered && <Cart closeModal={closeModalHandler} />}
//       <Header openCart={openModalHandler} />
//       <main>
//         <Meals />
//       </main>
//     </CartProvider>
//   );
// }



// const submitPurpose = () => {
//   const purposeTitleToSend = "boozeAndCigarettes";

//   const dataToSubmit = {
//     title: purposeTitleToSend,
//   };

//   fetch("https://bref-chaise-13325.herokuapp.com/add-purpose", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(dataToSubmit),
//   }).catch((error) => console.log(error));
// };