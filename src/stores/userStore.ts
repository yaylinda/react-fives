import create from "zustand";
import {
  LOCAL_STORAGE_CLIENT_ID,
  LOCAL_STORAGE_USERNAME,
} from "../utils/constants";
import { v4 as uuidv4 } from "uuid";

interface UserState {
  username: string | null;
  clientId: string;
  init: () => void;
}

const useUserStore = create<UserState>()((set, get) => ({
  username: "",
  clientId: "",

  /**
   *
   * @returns
   */
  init: () =>
    set(() => {
      let clientId = window.localStorage.getItem(LOCAL_STORAGE_CLIENT_ID);
      if (!clientId) {
        clientId = uuidv4();
        window.localStorage.setItem(LOCAL_STORAGE_CLIENT_ID, clientId);
      }
      const username = window.localStorage.getItem(LOCAL_STORAGE_USERNAME);
      return { clientId, username };
    }),
}));

export default useUserStore;
