import { firestore } from "firebase-admin";

interface ShiftConfirmRequest {
  userId: string
  shiftId: string
}

export default async function confirm({ userId, shiftId } : ShiftConfirmRequest) {
  return { done: true }
}