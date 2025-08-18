import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import { firebaseConfig, firebaseValidKey } from "../utils/keys";
import { setDataInLocalStorage } from "../helper";

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
export const requestForToken = async () => {
  try {
    const token = await getToken(messaging, {
      vapidKey: firebaseValidKey,
    });
    setDataInLocalStorage("fcmToken", token);
  } catch (error) {
    console.error("An error occurred while retrieving token. ", error);
  }
};
