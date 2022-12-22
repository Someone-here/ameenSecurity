import { firestore } from "firebase-admin";

interface CancelRequestData {
  userId: string;
  shiftId: string;
  status: "applied" | "confirmed";
}

function cancel({ userId, shiftId, status }: CancelRequestData) {
  console.log(userId, shiftId, status);
  const userDoc = firestore().collection("users").doc(userId);
  const shiftDoc = firestore().collection("shifts").doc(shiftId);
  let cancelUser;
  if (status == "applied") {
    cancelUser = userDoc.update({
      applied: firestore.FieldValue.arrayRemove(shiftDoc),
    });
  } else {
    cancelUser = userDoc.update({
      confirmed: firestore.FieldValue.arrayRemove(shiftDoc),
    });
  }
  const cancelShift = shiftDoc.update({
    applicants: firestore.FieldValue.arrayRemove(userDoc),
    numOfApplicants: firestore.FieldValue.increment(-1),
  });
  return Promise.all([cancelUser, cancelShift]);
}

export default cancel;
