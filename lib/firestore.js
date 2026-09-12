// WHAT THIS FILE DOES: Every function the app uses to read or write
// projects and reviews in the real Firestore database. Nothing else in the
// app talks to Firestore directly — it always goes through one of these
// functions instead. Every function returns the same simple shape:
// { success: true, data } when it worked, or { success: false, message }
// with a plain-English explanation when it didn't — so the screen that
// called it can always show something sensible instead of crashing.
// Deleting a project or review also deletes its uploaded images from
// Firebase Storage (via lib/storage.js), so nothing orphaned is left
// behind. These run whenever a page loads data or an admin form is saved.

import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { deleteImage } from "@/lib/storage";
import { projects as starterProjects } from "@/data/projects";
import { reviews as starterReviews } from "@/data/reviews";

const PROJECTS_COLLECTION = "projects";
const REVIEWS_COLLECTION = "reviews";
const SETUP_COLLECTION = "setup";
const SEED_DOC_ID = "starterDataImport";

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

// Permanently removes a project, and deletes its uploaded screenshot
// images from storage too, so nothing orphaned is left behind.
export async function deleteProject(id) {
  try {
    const existing = await getDoc(doc(db, PROJECTS_COLLECTION, id));
    if (existing.exists()) {
      const data = existing.data();
      const images = [
        ...(data.customerScreenshots || []),
        ...(data.adminScreenshots || []),
      ];
      await Promise.all(images.map((url) => deleteImage(url)));
    }

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

// Permanently removes a review, and deletes its uploaded client photo from
// storage too, so nothing orphaned is left behind.
export async function deleteReview(id) {
  try {
    const existing = await getDoc(doc(db, REVIEWS_COLLECTION, id));
    if (existing.exists() && existing.data().clientPhoto) {
      await deleteImage(existing.data().clientPhoto);
    }

    await deleteDoc(doc(db, REVIEWS_COLLECTION, id));
    return { success: true };
  } catch {
    return {
      success: false,
      message: "Could not delete this review. Please try again.",
    };
  }
}

// ---- ONE-TIME STARTER DATA IMPORT ----

// Copies the sample projects/reviews this site launched with (from
// data/projects.js and data/reviews.js) into the real database, once. If
// it's already been run before, it refuses to run again instead of
// creating duplicates.
export async function seedInitialData() {
  try {
    const markerRef = doc(db, SETUP_COLLECTION, SEED_DOC_ID);
    const markerSnap = await getDoc(markerRef);

    if (markerSnap.exists()) {
      return {
        success: false,
        message:
          "The starter data has already been imported. This only needs to run once.",
      };
    }

    for (const project of starterProjects) {
      const { id, ...projectData } = project;
      await setDoc(doc(db, PROJECTS_COLLECTION, String(id)), projectData);
    }

    for (const review of starterReviews) {
      const { id, ...reviewData } = review;
      await setDoc(doc(db, REVIEWS_COLLECTION, String(id)), {
        ...reviewData,
        projectId: reviewData.projectId ? String(reviewData.projectId) : "",
      });
    }

    await setDoc(markerRef, { importedAt: new Date().toISOString() });

    return {
      success: true,
      message: `Imported ${starterProjects.length} projects and ${starterReviews.length} reviews.`,
    };
  } catch {
    return {
      success: false,
      message: "The import failed partway through. Please try again.",
    };
  }
}
