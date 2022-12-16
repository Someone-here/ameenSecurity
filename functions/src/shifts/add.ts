import * as admin from "firebase-admin";
import {firestore} from "firebase-admin";
import {FieldValue} from "firebase-admin/firestore";

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

interface Contacts {
  avatar: string
  lastContact: firestore.Timestamp
  ref: firestore.DocumentReference
  lastMessage: string
  name: string
}

interface Business {
  name: string
  venueType: string
  email: string
  role: string
  pointOfContactName: string
  pointOfContactNumber: string
  address: string
  avatar: string
  advertised: firestore.DocumentReference[]
  completed: firestore.DocumentReference[]
  confirmed: firestore.DocumentReference[]
  contacts: Contacts[]
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
    status: "new",
    venue: business.venueType,
    numOfApplicants: 0,
    applicants: [],
  };
  const doc = await shifts.add(body);
  await businessRef.update({advertised: FieldValue.arrayUnion(doc)});
  return {shift: doc};
}

export default addShift;
