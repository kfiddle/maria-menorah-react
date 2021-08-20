import { useState, useEffect, Fragment } from "react";

import FoundationItemsList from "../components/events/FoundationItemsList";
import DeleteForm from "../components/delete/DeleteForm";
import GetAList from "../components/helperFunctions/GetAList";

const AllFoundationItems = (props) => {
  const [foundationItemsList, setFoundationItemsList] = useState([]);
  const [deleteFormRendered, setDeleteFormRendered] = useState(false);
  const [foundationItemToDelete, setFoundationItemToDelete] = useState(null);

  const deleteClicked = (foundationItem) => {
    setDeleteFormRendered(true);
    setFoundationItemToDelete(foundationItem);
  };

  const closeDeleteModal = () => {
    setDeleteFormRendered(false);
  };

  useEffect(() => {
    const getListOfFoundationItems = async () => {
      const allFoundationItems = await GetAList("get-foundation-items");
      setFoundationItemsList(allFoundationItems);
    };

    getListOfFoundationItems();
  }, [foundationItemsList]);

  return (
    <Fragment>
      <FoundationItemsList
        list={foundationItemsList}
        deleteClicked={deleteClicked}
      />
      ;
      {deleteFormRendered && (
        <DeleteForm
          eventToDelete={foundationItemToDelete}
          closeModal={closeDeleteModal}
        />
      )}
    </Fragment>
  );
};

export default AllFoundationItems;
