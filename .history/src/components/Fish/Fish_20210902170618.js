import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react";

import { Navbar } from "../";
import { FishTable } from "../";
import { FishStoreContext } from "../../index";

export const Fish = observer(() => {
  const { fishState, listFish, addFish, removeFish } =
    useContext(FishStoreContext);

  useEffect(() => {
    listFish();
  }, [fishState]);

  return (
    <div>
      <Navbar />
      <div className="mt-3 mb-3" />
      <FishTable
        showAdd
        showDelete
        showID
        enableHash
        fish={fishState.fish}
        addFish={addFish}
        removeFish={removeFish}
        fishError={fishState.error}
      />
    </div>
  );
});

export default Fish;
