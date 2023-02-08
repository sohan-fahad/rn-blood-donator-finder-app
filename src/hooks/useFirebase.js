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
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import intializeFirebase from "../firebase/firebase.init";
import { showMessage } from "react-native-flash-message";

import {
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth/react-native";

const useFirebase = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [donors, setDonors] = useState([]);

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
            uid: user.uid,
            name,
            email,
            phoneNumber,
            division,
            district,
            subDistrict,
            bloodGroup,
            donationList: [lastDonate],
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
    const q = query(collection(db, "users"), where("uid", "==", id));
    const snapShot = onSnapshot(q, (querySnapshot) => {
      querySnapshot.docs.forEach((item) => {
        setUserInfo({ id: item.id, ...item.data() });
      });
    });

    return snapShot;
  };

  const getSearchResult = (bloodGroup, division, district, subDistrict) => {
    const q = query(
      collection(db, "users"),
      where("bloodGroup", "==", bloodGroup),
      where("division", "==", division),
      where("district", "==", district),
      where("subDistrict", "==", subDistrict)
    );

    let list = [];
    setDonors([]);
    onSnapshot(q, (querySnapshot) => {
      querySnapshot.docs.forEach((item) => {
        list = [...list, item.data()];
        setDonors(() => list);
      });
    });
    console.log(list);
  };

  const updateImage = async (url) => {
    try {
      const userRef = doc(db, "users", userInfo.id);
      const updateObj = {
        bloodGroup: userInfo.bloodGroup,
        division: userInfo.division,
        district: userInfo.district,
        subDistrict: userInfo.subDistrict,
        donationList: userInfo.donationList,
        image: url,
        name: userInfo.name,
        phoneNumber: userInfo.phoneNumber,
        uid: userInfo.uid,
      };
      await updateDoc(userRef, updateObj);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    createAccount,
    user,
    logOut,
    login,
    isLoading,
    userInfo,
    getUserData,
    updateImage,
    getSearchResult,
    donors,
    db,
  };
};

export default useFirebase;
