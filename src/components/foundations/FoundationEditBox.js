import { useRef } from "react";

import useMoney from "../../hooks/useMoney";
import Card from "../UI/Card";

const FoundationEditBox = (props) => {
  const { id, leftOverPennies, contributionInPennies } = props.foundation;

  const originalDollarsRef = useRef();
  const originalCentsRef = useRef();
  const leftOverDollarsRef = useRef();
  const leftOverCentsRef = useRef();

  const realLeftOverAmount = useMoney(leftOverPennies);
  const realOriginal = useMoney(contributionInPennies);

  const submitEdits = async () => {
    const foundationToSubmit = {
      id: id,
      contributionInPennies:
        originalDollarsRef.current.value * 100 +
        +originalCentsRef.current.value,
      leftOverPennies:
        leftOverDollarsRef.current.value * 100 +
        +leftOverCentsRef.current.value,
    };

    console.log(foundationToSubmit);

    fetch("https://bref-chaise-13325.herokuapp.com/edit-foundation", {
    // fetch("http://localhost:8080/edit-foundation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(foundationToSubmit),
    }).then((result) => {
      if (result.ok) {
        props.closeModal();
      }
    });
  };

  return (
    <Card>
      <div>
        <h3>Original contribution</h3>
        <input
          placeholder={realOriginal.dollars}
          ref={originalDollarsRef}
        ></input>
        <input placeholder={realOriginal.cents} ref={originalCentsRef}></input>
      </div>
      <div>
        <h3>Remaining Amount</h3>
        <input
          placeholder={realLeftOverAmount.dollars}
          ref={leftOverDollarsRef}
        ></input>
        <input
          placeholder={realLeftOverAmount.cents}
          ref={leftOverCentsRef}
        ></input>
      </div>

      <div>
        <button onClick={submitEdits}>Submit</button>
      </div>
    </Card>
  );
};

export default FoundationEditBox;
