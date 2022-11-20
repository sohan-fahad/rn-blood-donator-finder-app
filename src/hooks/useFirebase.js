import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  doc,
  collection,
  getFirestore,
  addDoc,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import intializeFirebase from "../firebase/firebase.init";
import { showMessage } from "react-native-flash-message";

import {
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth/react-native";
import { useSelector } from "react-redux";

const useFirebase = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const auth = getAuth();
  const app = intializeFirebase();
  const db = getFirestore(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe;
  });

  const createAccount = async (
    email,
    password,
    name,
    phoneNumber,
    division,
    district,
    subDistrict,
    bloodGroup,
    lastDonate
  ) => {
    setIsLoading(true);
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
            bloodGroup,
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
        setErrorMessage(errorMessage);
      });

    setIsLoading(false);
  };

  const login = (email, password) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
        if (userCredential.user) {
          setUser(userCredential.user);
          setErrorMessage("");
          showMessage({
            message: "",
            description: "Sign in successfull!",
            type: "success",
          });
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorMessage);
        console.log(errorMessage);
      });
    setIsLoading(false);
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        setErrorMessage(error.errorCode, error.errorMessage);
      });
  };

  const getUserData = async (id) => {
    const q = query(collection(db, "users"), where("id", "==", id));
    const aa = onSnapshot(q, (querySnapshot) => {
      list = [];
      querySnapshot.docs.forEach((item) => {
        setUserInfo(item.data());
        // console.log(item.data());
      });
    });

    return aa;
  };

  return {
    createAccount,
    user,
    logOut,
    login,
    isLoading,
    userInfo,
    getUserData,
  };
};

export default useFirebase;
