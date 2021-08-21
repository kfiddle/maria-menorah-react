import { useRef } from "react";

import useMoney from "../../hooks/useMoney";
import Card from "../UI/Card";

import PushSomething from "../helperFunctions/PushSomething";
import MoneySplitter from "../helperFunctions/MoneySplitter";

const FoundationEditBox = (props) => {
  const { id, leftOverPennies, contributionInPennies } = props.foundation;

  const originalMoneyRef = useRef();
  // const leftOverMoneyRef = useRef();

  // const realLeftOverAmount = useMoney(leftOverPennies);
  const realOriginal = useMoney(contributionInPennies);

  const submitEdits = async () => {
    let originalPenniesToSend =
      originalMoneyRef.current.value === ""
        ? contributionInPennies
        : MoneySplitter(originalMoneyRef.current.value);

    // let remainingPenniesToSend =
    //   leftOverMoneyRef.current.value === ""
    //     ? leftOverPennies
    //     : MoneySplitter(leftOverMoneyRef.current.value);

    const foundationToSubmit = {
      id: id,
      contributionInPennies: originalPenniesToSend,
      // leftOverPennies: remainingPenniesToSend,
    };

    console.log(foundationToSubmit);

    let response = await PushSomething(foundationToSubmit, "/edit-foundation");
    if (response.ok) {
      props.closeModal();
    }
  };

  return (
    <Card>
      <div>
        <h3>Original contribution</h3>
        <input
          style={{ paddingLeft: "1rem" }}
          placeholder={`${realOriginal.dollars}.${realOriginal.cents}`}
          ref={originalMoneyRef}
        ></input>
      </div>
      {/* <div>
        <h3>Remaining Amount</h3>
        <input
          style={{ paddingLeft: "1rem", marginBottom: '1rem' }}
          placeholder={`${realLeftOverAmount.dollars}.${realLeftOverAmount.cents}`}
          ref={leftOverMoneyRef}
        ></input>
      </div> */}

      <div>
        <button onClick={submitEdits}>Submit</button>
      </div>
    </Card>
  );
};

export default FoundationEditBox;
