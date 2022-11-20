import { initializeApp, getAnalytics } from "firebase/app";
import firbaseConfig from "./firbase.config";

const app = initializeApp(firbaseConfig);
// const analytics = getAnalytics(app);

const intializeFirebase = () => {
  //   analytics();
  return app;
};

export default intializeFirebase;
