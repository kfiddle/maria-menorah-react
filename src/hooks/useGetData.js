
import useUrl from "./useUrl";

const useGetData = async (
  specificFetch,
  setListFunction,
  onOrOff,
  setOnOrOff
) => {
  let initialUrl = useUrl();

  if (onOrOff) {
    let listFromBackend = await fetch(initialUrl + specificFetch);
    let listToSet = await listFromBackend.json();
    setListFunction(listToSet);
    setOnOrOff(!onOrOff);
  }
};

export default useGetData;
