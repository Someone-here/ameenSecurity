import firebase from "@react-native-firebase/app";
import functions from "@react-native-firebase/functions";

const functionInstance = firebase.app().functions("europe-west2")
functionInstance.useEmulator("localhost", 5001);

export default functionInstance;