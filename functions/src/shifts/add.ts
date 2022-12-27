import * as admin from "firebase-admin";
import {firestore} from "firebase-admin";
import { Business } from "../db.types";

admin.initializeApp();
const firestoreRef = admin.firestore;

interface AddShiftRequest {
  start: string
  end: string
  numRequired: number
  userId: string
  payPerHour: number
  type: "guard" | "steward"
}

async function addShift(data: AddShiftRequest) {
  const start = firestore.Timestamp.fromDate(new Date(data.start));
  const end = firestore.Timestamp.fromDate(new Date(data.end));
  const businessRef = firestoreRef().collection("users").doc(data.userId);
  const shifts = firestoreRef().collection("shifts");
  const business = <Business> (await businessRef.get()).data();
  const body = {
    start: start,
    end: end,
    payPerHour: data.payPerHour,
    numRequired: data.numRequired,
    serviceRequired: data.type,
    location: business.address,
    business: businessRef,
    venue: business.venueType,
    numOfApplicants: 0,
    numOfSelected: 0
  };
  const doc = await shifts.add(body);
  return await businessRef.collection("shifts").doc(doc.id).set({ ...body, status: "advertised" });
}

export default addShift;
