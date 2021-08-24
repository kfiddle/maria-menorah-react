import Purpose from "./Purpose";

const Purposes = (props) => {
  const displayablePurposes = props.list.map((purpose) => (
    <Purpose key={purpose.id} purpose={purpose} />
  ));

  return <div>{displayablePurposes}</div>;
};

export default Purposes;
