import { makeAutoObservable, runInAction } from "mobx";
import React from "react";

import axios from "axios";

import config from "../../config.json";

class RootStore {
  constructor() {
    makeAutoObservable(this);
  }

  rootState = {
    fish: [],

    heartbeat: {
      fishbase: {
        status: "",
      },
    },

    error: null,
  };

  heartbeat = () => {
    axios({
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
      url: config.server.baseURL + "/heartbeat",
    })
      .then((res) => {
        runInAction(() => {
          this.rootState.heartbeat.fishbase.status =
            res?.data?.fishbase?.status;
        });
      })
      .catch((err) => {
        console.log(err?.response?.data);
      });
  };

  listFish = () => {
    axios({
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
      url: config.server.baseURL + "/fish",
    })
      .then((res) => {
        runInAction(() => {
          this.rootState.fish = res.data.fish;
        });
      })
      .catch((err) => {
        console.log(err?.response?.data);
      });
  };

  addFish = ({
    genus,
    species,
    commonName,
    name,
    color,
    gender,
    purchaseDate,
    count,
  }) => {
    axios({
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      url: config.server.baseURL + "/fish",
      data: {
        genus,
        species,
        commonName,
        name,
        color,
        gender: gender.toUpperCase(),
        purchaseDate,
        count,
      },
    })
      .then((res) => {
        runInAction(() => {
          this.rootState.fish.push(res?.data?.fish);
        });
      })
      .catch((err) => {
        runInAction(() => {
          console.log(err);
          this.rootState.error = err?.response?.data?.message;
        });
      });
  };

  removeFish = (id) => {
    axios({
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      url: config.server.baseURL + "/fish/" + id,
    })
      .then(() => {
        runInAction(() => {
          this.rootState.fish = this.rootState.fish.filter((e) => e.id !== id);
        });
      })
      .catch((err) => {
        runInAction(() => {
          console.log(err);
          this.rootState.error = err?.response?.data?.message;
        });
      });
  };
}

const rootStore = new RootStore();
const RootStoreContext = React.createContext(rootStore);
export default RootStoreContext;
