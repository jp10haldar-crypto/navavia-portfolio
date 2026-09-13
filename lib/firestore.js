// WHAT THIS FILE DOES: Every function the app uses to read or write
// projects, reviews, and enquiries in the real Firestore database. Nothing
// else in the app talks to Firestore directly — it always goes through one
// of these functions instead. Every function returns the same simple shape:
// { success: true, data } when it worked, or { success: false, message }
// with a plain-English explanation when it didn't — so the screen that
// called it can always show something sensible instead of crashing.
// Deleting a project or review removes its image links from here, but
// does NOT delete the actual image files from Cloudinary — see
// lib/storage.js for why. These run whenever a page loads data or an
// admin form is saved.

import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { projects as starterProjects } from "@/data/projects";
import { reviews as starterReviews } from "@/data/reviews";

const PROJECTS_COLLECTION = "projects";
const REVIEWS_COLLECTION = "reviews";
const SETUP_COLLECTION = "setup";
const SEED_DOC_ID = "starterDataImport";
const ENQUIRIES_COLLECTION = "enquiries";

// ---- PROJECTS ----

// Gets every project in the database.
export async function getAllProjects() {
  try {
    const snapshot = await getDocs(collection(db, PROJECTS_COLLECTION));
    const projects = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));
    return { success: true, data: projects };
  } catch {
    return {
      success: false,
      message:
        "Could not load projects right now. Please check your internet connection and try again.",
    };
  }
}

// Gets one single project by its id.
export async function getProjectById(id) {
  try {
    const docSnap = await getDoc(doc(db, PROJECTS_COLLECTION, id));
    if (!docSnap.exists()) {
      return { success: false, message: "That project could not be found." };
    }
    return { success: true, data: { id: docSnap.id, ...docSnap.data() } };
  } catch {
    return {
      success: false,
      message: "Could not load this project right now. Please try again.",
    };
  }
}

// Creates a brand new project and lets Firestore generate its id.
export async function addProject(projectData) {
  try {
    const docRef = await addDoc(collection(db, PROJECTS_COLLECTION), projectData);
    return { success: true, data: { id: docRef.id, ...projectData } };
  } catch {
    return {
      success: false,
      message: "Could not save the new project. Please try again.",
    };
  }
}

// Saves changes to an existing project.
export async function updateProject(id, projectData) {
  try {
    await updateDoc(doc(db, PROJECTS_COLLECTION, id), projectData);
    return { success: true };
  } catch {
    return {
      success: false,
      message: "Could not save your changes. Please try again.",
    };
  }
}

// Permanently removes a project. Its screenshot images are NOT deleted
// from Cloudinary (the free plan doesn't allow that from the browser) —
// only the project's record, and its links to those images, are removed.
export async function deleteProject(id) {
  try {
    await deleteDoc(doc(db, PROJECTS_COLLECTION, id));
    return { success: true };
  } catch {
    return {
      success: false,
      message: "Could not delete this project. Please try again.",
    };
  }
}

// ---- REVIEWS ----

// Gets every review in the database.
export async function getAllReviews() {
  try {
    const snapshot = await getDocs(collection(db, REVIEWS_COLLECTION));
    const reviews = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));
    return { success: true, data: reviews };
  } catch {
    return {
      success: false,
      message:
        "Could not load reviews right now. Please check your internet connection and try again.",
    };
  }
}

// Gets one single review by its id.
export async function getReviewById(id) {
  try {
    const docSnap = await getDoc(doc(db, REVIEWS_COLLECTION, id));
    if (!docSnap.exists()) {
      return { success: false, message: "That review could not be found." };
    }
    return { success: true, data: { id: docSnap.id, ...docSnap.data() } };
  } catch {
    return {
      success: false,
      message: "Could not load this review right now. Please try again.",
    };
  }
}

// Creates a brand new review and lets Firestore generate its id.
export async function addReview(reviewData) {
  try {
    const docRef = await addDoc(collection(db, REVIEWS_COLLECTION), reviewData);
    return { success: true, data: { id: docRef.id, ...reviewData } };
  } catch {
    return {
      success: false,
      message: "Could not save the new review. Please try again.",
    };
  }
}

// Saves changes to an existing review.
export async function updateReview(id, reviewData) {
  try {
    await updateDoc(doc(db, REVIEWS_COLLECTION, id), reviewData);
    return { success: true };
  } catch {
    return {
      success: false,
      message: "Could not save your changes. Please try again.",
    };
  }
}

// Permanently removes a review. Its client photo is NOT deleted from
// Cloudinary (the free plan doesn't allow that from the browser) — only
// the review's record, and its link to that photo, are removed.
export async function deleteReview(id) {
  try {
    await deleteDoc(doc(db, REVIEWS_COLLECTION, id));
    return { success: true };
  } catch {
    return {
      success: false,
      message: "Could not delete this review. Please try again.",
    };
  }
}

// ---- ENQUIRIES ----

// Submits a new enquiry from the public contact form. Anyone can call
// this (even signed-out visitors — see firestore.rules), which is why it
// only accepts the specific fields the contact form collects, rather than
// taking whatever is handed to it. The arrival date/time and the "New"
// status are set here automatically, not by whoever is filling in the form.
export async function addEnquiry(enquiryData) {
  try {
    const docRef = await addDoc(collection(db, ENQUIRIES_COLLECTION), {
      fullName: enquiryData.fullName,
      email: enquiryData.email,
      phone: enquiryData.phone || "",
      country: enquiryData.country,
      needType: enquiryData.needType,
      budgetRange: enquiryData.budgetRange || "",
      message: enquiryData.message,
      status: "New",
      createdAt: serverTimestamp(),
    });
    return { success: true, data: { id: docRef.id } };
  } catch {
    return {
      success: false,
      message:
        "Could not send your enquiry right now. Please check your internet connection and try again.",
    };
  }
}

// Gets every enquiry, newest first. Admin-only (see firestore.rules).
export async function getAllEnquiries() {
  try {
    const enquiriesQuery = query(
      collection(db, ENQUIRIES_COLLECTION),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(enquiriesQuery);
    const enquiries = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));
    return { success: true, data: enquiries };
  } catch (error) {
    return {
      success: false,
      message: describeFirestoreError(error, "load enquiries"),
    };
  }
}

// Changes one enquiry's status (New / Contacted / In Discussion / Won / Lost).
export async function updateEnquiryStatus(id, status) {
  try {
    await updateDoc(doc(db, ENQUIRIES_COLLECTION, id), { status });
    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: describeFirestoreError(error, "update this enquiry's status"),
    };
  }
}

// Permanently removes an enquiry.
export async function deleteEnquiry(id) {
  try {
    await deleteDoc(doc(db, ENQUIRIES_COLLECTION, id));
    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: describeFirestoreError(error, "delete this enquiry"),
    };
  }
}

// Turns a raw Firestore error into a plain-English explanation, called out
// by name whenever it's a security-rules permission problem so it's never
// confused with a generic "something went wrong."
function describeFirestoreError(error, actionDescription) {
  const code = error?.code || "";
  if (code.includes("permission-denied")) {
    return `Could not ${actionDescription} — Firestore blocked it with a permissions error. This means your security rules (firestore.rules) either haven't been published yet, or don't allow this. Check the Rules tab under Firestore Database in the Firebase Console.`;
  }
  return `Could not ${actionDescription}: ${error?.message || "an unknown error occurred"}. Please try again.`;
}

// ---- ONE-TIME STARTER DATA IMPORT ----

// Copies the sample projects/reviews this site launched with (from
// data/projects.js and data/reviews.js) into the real database, once. If
// it's already been run before, it refuses to run again instead of
// creating duplicates. Each stage is checked separately so that if
// anything fails, the real reason is reported — never swallowed into a
// generic "something went wrong" message.
export async function seedInitialData() {
  const markerRef = doc(db, SETUP_COLLECTION, SEED_DOC_ID);

  try {
    const markerSnap = await getDoc(markerRef);
    if (markerSnap.exists()) {
      return {
        success: false,
        message:
          "The starter data has already been imported. This only needs to run once.",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: describeFirestoreError(
        error,
        "check whether the starter data was already imported"
      ),
    };
  }

  try {
    for (const project of starterProjects) {
      const { id, ...projectData } = project;
      await setDoc(doc(db, PROJECTS_COLLECTION, String(id)), projectData);
    }
  } catch (error) {
    return {
      success: false,
      message: describeFirestoreError(error, "save the starter projects"),
    };
  }

  try {
    for (const review of starterReviews) {
      const { id, ...reviewData } = review;
      await setDoc(doc(db, REVIEWS_COLLECTION, String(id)), {
        ...reviewData,
        projectId: reviewData.projectId ? String(reviewData.projectId) : "",
      });
    }
  } catch (error) {
    return {
      success: false,
      message: describeFirestoreError(error, "save the starter reviews"),
    };
  }

  try {
    await setDoc(markerRef, { importedAt: new Date().toISOString() });
  } catch (error) {
    return {
      success: false,
      message: describeFirestoreError(
        error,
        "record that the import finished"
      ),
    };
  }

  return {
    success: true,
    message: `Imported ${starterProjects.length} projects and ${starterReviews.length} reviews.`,
  };
}
