import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import {
  setDoc,
  Timestamp,
  doc,
  collection,
  getFirestore,
  addDoc,
} from "firebase/firestore";
import { useState } from "react";
import intializeFirebase from "../firebase/firebase.init";
import { showMessage } from "react-native-flash-message";

const useFirebase = () => {
  const auth = getAuth();
  const app = intializeFirebase();
  const db = getFirestore(app);

  const [errorMessage, setErrorMessage] = useState("");

  const createAccount = async (
    email,
    password,
    name,
    phoneNumber,
    division,
    district,
    subDistrict,
    lastDonate,
    navigation
  ) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        if (user.accessToken) {
          const userInfo = {
            id: user.uid,
            name,
            email,
            phoneNumber,
            division,
            district,
            subDistrict,
            donationLis: [lastDonate],
            image: "",
          };

          const docRef = await addDoc(collection(db, "users"), userInfo);
          if (docRef.id) {
            showMessage({
              message: "",
              description: "Sign up successfull!",
              type: "success",
            });
            navigation.navigate("Home");
          }
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return { createAccount };
};

export default useFirebase;
