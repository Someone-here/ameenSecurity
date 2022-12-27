import { firestore } from "firebase-admin"

export interface Contacts {
  avatar: string
  lastContact: firestore.Timestamp
  ref: firestore.DocumentReference
  lastMessage: string
  name: string
}

export interface Business {
  name: string
  venueType: string
  email: string
  role: string
  pointOfContactName: string
  pointOfContactNumber: string
  address: string
  avatar: string
}

export interface Steward {
  firstName: string
  lastName: string
  avatar: string
  email: string
  phoneNumber: string
  rating: number
}

export interface Guard {
  firstName: string
  lastName: string
  avatar: string
  SIA: string
  address: string
  email: string
  dateOfBirth: string
  phoneNumber: string
  rating: number
  skills: string[]
}

export interface Shift {
  venueType: string
  start: firestore.Timestamp
  end: firestore.Timestamp
  business: firestore.DocumentReference
  
}