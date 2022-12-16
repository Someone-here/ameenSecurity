import { https } from "firebase-functions";
import { add } from "./shifts";

exports.addShift = https.onCall(add);