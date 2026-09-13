// WHAT THIS FILE DOES: Every function the app uses to read or write
// projects, reviews, enquiries, homepage videos, and blog posts in the
// real Firestore database. Nothing else in the app talks to Firestore
// directly — it always goes through one of these functions instead. Every
// function returns the same simple shape: { success: true, data } when it
// worked, or { success: false, message } with a plain-English explanation
// when it didn't — so the screen that called it can always show something
// sensible instead of crashing. Deleting a project or review removes its
// image links from here, but does NOT delete the actual image files from
// Cloudinary — see lib/storage.js for why. These run whenever a page loads
// data or an admin form is saved.
//
// Every single database operation below goes through runWithTimeout(),
// which gives up and reports a timeout after 15 seconds if Firestore never
// answers at all. Firebase's own library does not do this by itself — left
// alone, a visitor whose connection can't complete the handshake with
// Google's servers (a network hiccup, a restrictive network, anything)
// would see a page stuck loading forever, with no way out and nothing on
// screen explaining why. This is what happened on the live homepage: three
// database reads were started together, and because one of them never
// settled, the page never left its "Loading our work..." message. Now,
// every read and write always finishes one way or another within 15
// seconds, so a page can never hang forever again.

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
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { projects as starterProjects } from "@/data/projects";
import { reviews as starterReviews } from "@/data/reviews";
import { homepageVideos as starterHomepageVideos } from "@/data/homepageVideos";
import { pageContentSections as starterPageContent } from "@/data/pageContentSeed";

const PROJECTS_COLLECTION = "projects";
const REVIEWS_COLLECTION = "reviews";
const SETUP_COLLECTION = "setup";
const SEED_DOC_ID = "starterDataImport";
const HOMEPAGE_VIDEOS_SEED_DOC_ID = "homepageVideosImport";
const ENQUIRIES_COLLECTION = "enquiries";
const HOMEPAGE_VIDEOS_COLLECTION = "homepageVideos";
const BLOG_POSTS_COLLECTION = "blogPosts";
const SETTINGS_COLLECTION = "settings";
const SITE_SETTINGS_DOC_ID = "site";
const PAGE_CONTENT_COLLECTION = "pageContent";
const PAGE_CONTENT_SEED_DOC_ID = "pageContentImport";

const FIRESTORE_TIMEOUT_MS = 15000;

// Runs one Firestore operation (any of the get/add/update/delete/set calls
// used throughout this file) with a 15-second safety timer. If Firestore
// hasn't answered by then, this gives up and reports a timeout instead of
// waiting forever — see the note at the top of this file for why that
// matters. `operation` is a function that returns the actual Firestore
// promise (e.g. () => getDocs(...)), not the promise itself, so nothing
// starts until this function is ready to race it against the timer.
function runWithTimeout(operation) {
  const operationPromise = operation();
  // If the real operation eventually settles after the timeout has already
  // won the race below, this stops it from being reported as an unhandled
  // promise rejection — it's just ignored at that point, on purpose.
  operationPromise.catch(() => {});

  let timeoutId;
  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = setTimeout(() => {
      const timeoutError = new Error(
        "The request took too long and timed out."
      );
      timeoutError.isTimeout = true;
      reject(timeoutError);
    }, FIRESTORE_TIMEOUT_MS);
  });

  return Promise.race([operationPromise, timeoutPromise]).finally(() => {
    clearTimeout(timeoutId);
  });
}

// Turns a raw Firestore error into a plain-English explanation, called out
// by name whenever it's a security-rules permission problem or a timeout,
// so neither is ever confused with a generic "something went wrong."
function describeFirestoreError(error, actionDescription) {
  if (error?.isTimeout) {
    return `Could not ${actionDescription} — the database took too long to respond. Please check your internet connection and try again.`;
  }
  const code = error?.code || "";
  if (code.includes("permission-denied")) {
    return `Could not ${actionDescription} — Firestore blocked it with a permissions error. This means your security rules (firestore.rules) either haven't been published yet, or don't allow this. Check the Rules tab under Firestore Database in the Firebase Console.`;
  }
  return `Could not ${actionDescription}: ${error?.message || "an unknown error occurred"}. Please try again.`;
}

// ---- PROJECTS ----

// Gets every project in the database.
export async function getAllProjects() {
  try {
    const snapshot = await runWithTimeout(() =>
      getDocs(collection(db, PROJECTS_COLLECTION))
    );
    const projects = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));
    return { success: true, data: projects };
  } catch (error) {
    return {
      success: false,
      message: describeFirestoreError(error, "load projects"),
    };
  }
}

// Gets one single project by its id.
export async function getProjectById(id) {
  try {
    const docSnap = await runWithTimeout(() =>
      getDoc(doc(db, PROJECTS_COLLECTION, id))
    );
    if (!docSnap.exists()) {
      return { success: false, message: "That project could not be found." };
    }
    return { success: true, data: { id: docSnap.id, ...docSnap.data() } };
  } catch (error) {
    return {
      success: false,
      message: describeFirestoreError(error, "load this project"),
    };
  }
}

// Creates a brand new project and lets Firestore generate its id.
export async function addProject(projectData) {
  try {
    const docRef = await runWithTimeout(() =>
      addDoc(collection(db, PROJECTS_COLLECTION), projectData)
    );
    return { success: true, data: { id: docRef.id, ...projectData } };
  } catch (error) {
    return {
      success: false,
      message: describeFirestoreError(error, "save the new project"),
    };
  }
}

// Saves changes to an existing project.
export async function updateProject(id, projectData) {
  try {
    await runWithTimeout(() =>
      updateDoc(doc(db, PROJECTS_COLLECTION, id), projectData)
    );
    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: describeFirestoreError(error, "save your changes"),
    };
  }
}

// Permanently removes a project. Its screenshot images are NOT deleted
// from Cloudinary (the free plan doesn't allow that from the browser) —
// only the project's record, and its links to those images, are removed.
export async function deleteProject(id) {
  try {
    await runWithTimeout(() => deleteDoc(doc(db, PROJECTS_COLLECTION, id)));
    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: describeFirestoreError(error, "delete this project"),
    };
  }
}

// ---- REVIEWS ----

// Gets every review in the database.
export async function getAllReviews() {
  try {
    const snapshot = await runWithTimeout(() =>
      getDocs(collection(db, REVIEWS_COLLECTION))
    );
    const reviews = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));
    return { success: true, data: reviews };
  } catch (error) {
    return {
      success: false,
      message: describeFirestoreError(error, "load reviews"),
    };
  }
}

// Gets one single review by its id.
export async function getReviewById(id) {
  try {
    const docSnap = await runWithTimeout(() =>
      getDoc(doc(db, REVIEWS_COLLECTION, id))
    );
    if (!docSnap.exists()) {
      return { success: false, message: "That review could not be found." };
    }
    return { success: true, data: { id: docSnap.id, ...docSnap.data() } };
  } catch (error) {
    return {
      success: false,
      message: describeFirestoreError(error, "load this review"),
    };
  }
}

// Creates a brand new review and lets Firestore generate its id.
export async function addReview(reviewData) {
  try {
    const docRef = await runWithTimeout(() =>
      addDoc(collection(db, REVIEWS_COLLECTION), reviewData)
    );
    return { success: true, data: { id: docRef.id, ...reviewData } };
  } catch (error) {
    return {
      success: false,
      message: describeFirestoreError(error, "save the new review"),
    };
  }
}

// Saves changes to an existing review.
export async function updateReview(id, reviewData) {
  try {
    await runWithTimeout(() =>
      updateDoc(doc(db, REVIEWS_COLLECTION, id), reviewData)
    );
    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: describeFirestoreError(error, "save your changes"),
    };
  }
}

// Permanently removes a review. Its client photo is NOT deleted from
// Cloudinary (the free plan doesn't allow that from the browser) — only
// the review's record, and its link to that photo, are removed.
export async function deleteReview(id) {
  try {
    await runWithTimeout(() => deleteDoc(doc(db, REVIEWS_COLLECTION, id)));
    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: describeFirestoreError(error, "delete this review"),
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
    const docRef = await runWithTimeout(() =>
      addDoc(collection(db, ENQUIRIES_COLLECTION), {
        fullName: enquiryData.fullName,
        email: enquiryData.email,
        phone: enquiryData.phone || "",
        country: enquiryData.country,
        needType: enquiryData.needType,
        budgetRange: enquiryData.budgetRange || "",
        message: enquiryData.message,
        status: "New",
        createdAt: serverTimestamp(),
      })
    );
    return { success: true, data: { id: docRef.id } };
  } catch (error) {
    return {
      success: false,
      message: describeFirestoreError(error, "send your enquiry"),
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
    const snapshot = await runWithTimeout(() => getDocs(enquiriesQuery));
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
    await runWithTimeout(() =>
      updateDoc(doc(db, ENQUIRIES_COLLECTION, id), { status })
    );
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
    await runWithTimeout(() => deleteDoc(doc(db, ENQUIRIES_COLLECTION, id)));
    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: describeFirestoreError(error, "delete this enquiry"),
    };
  }
}

// ---- HOMEPAGE VIDEOS ----
//
// These are the general "About Our Business" videos shown in the
// homepage's "How We Work" section — separate from the per-project
// walkthrough videos, which live on each project's own detail page.

// Gets every homepage video, in display order (lowest number first).
export async function getAllHomepageVideos() {
  try {
    const videosQuery = query(
      collection(db, HOMEPAGE_VIDEOS_COLLECTION),
      orderBy("displayOrder", "asc")
    );
    const snapshot = await runWithTimeout(() => getDocs(videosQuery));
    const videos = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));
    return { success: true, data: videos };
  } catch (error) {
    return {
      success: false,
      message: describeFirestoreError(error, "load the homepage videos"),
    };
  }
}

// Gets one single homepage video by its id.
export async function getHomepageVideoById(id) {
  try {
    const docSnap = await runWithTimeout(() =>
      getDoc(doc(db, HOMEPAGE_VIDEOS_COLLECTION, id))
    );
    if (!docSnap.exists()) {
      return { success: false, message: "That video could not be found." };
    }
    return { success: true, data: { id: docSnap.id, ...docSnap.data() } };
  } catch (error) {
    return {
      success: false,
      message: describeFirestoreError(error, "load this video"),
    };
  }
}

// Creates a brand new homepage video and lets Firestore generate its id.
export async function addHomepageVideo(videoData) {
  try {
    const docRef = await runWithTimeout(() =>
      addDoc(collection(db, HOMEPAGE_VIDEOS_COLLECTION), videoData)
    );
    return { success: true, data: { id: docRef.id, ...videoData } };
  } catch (error) {
    return {
      success: false,
      message: describeFirestoreError(error, "save the new video"),
    };
  }
}

// Saves changes to an existing homepage video.
export async function updateHomepageVideo(id, videoData) {
  try {
    await runWithTimeout(() =>
      updateDoc(doc(db, HOMEPAGE_VIDEOS_COLLECTION, id), videoData)
    );
    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: describeFirestoreError(error, "save your changes"),
    };
  }
}

// Permanently removes a homepage video.
export async function deleteHomepageVideo(id) {
  try {
    await runWithTimeout(() =>
      deleteDoc(doc(db, HOMEPAGE_VIDEOS_COLLECTION, id))
    );
    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: describeFirestoreError(error, "delete this video"),
    };
  }
}

// Saves a brand new display order for every video at once, after they've
// been dragged into a new arrangement (orderedVideos is the full list, in
// its new order — the first one gets displayOrder 1, the next 2, and so on).
export async function reorderHomepageVideos(orderedVideos) {
  try {
    await runWithTimeout(() =>
      Promise.all(
        orderedVideos.map((video, index) =>
          updateDoc(doc(db, HOMEPAGE_VIDEOS_COLLECTION, video.id), {
            displayOrder: index + 1,
          })
        )
      )
    );
    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: describeFirestoreError(error, "save the new video order"),
    };
  }
}

// Copies the starter draft videos (from data/homepageVideos.js) into the
// real database, once — so there's something to edit in the admin panel
// instead of starting from a totally blank list. Refuses to run twice.
export async function seedHomepageVideos() {
  const markerRef = doc(db, SETUP_COLLECTION, HOMEPAGE_VIDEOS_SEED_DOC_ID);

  try {
    const markerSnap = await runWithTimeout(() => getDoc(markerRef));
    if (markerSnap.exists()) {
      return {
        success: false,
        message:
          "The starter videos have already been imported. This only needs to run once.",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: describeFirestoreError(
        error,
        "check whether the starter videos were already imported"
      ),
    };
  }

  try {
    for (const video of starterHomepageVideos) {
      const { id, ...videoData } = video;
      await runWithTimeout(() =>
        setDoc(doc(db, HOMEPAGE_VIDEOS_COLLECTION, String(id)), videoData)
      );
    }
  } catch (error) {
    return {
      success: false,
      message: describeFirestoreError(error, "save the starter videos"),
    };
  }

  try {
    await runWithTimeout(() =>
      setDoc(markerRef, { importedAt: new Date().toISOString() })
    );
  } catch (error) {
    return {
      success: false,
      message: describeFirestoreError(
        error,
        "record that the video import finished"
      ),
    };
  }

  return {
    success: true,
    message: `Imported ${starterHomepageVideos.length} starter videos as drafts.`,
  };
}

// ---- BLOG POSTS ----
//
// Drafts (published: false) are only readable by the signed-in admin —
// that's enforced by firestore.rules, not just by this code — so a
// "preview" link for an unpublished post only works while you're signed
// in. Published posts are readable by anyone.

// Gets every PUBLISHED blog post, newest first. Used by the public blog
// pages. Deliberately queries with a "published == true" filter (instead
// of fetching everything and filtering here) because the security rules
// require it — Firestore would otherwise refuse the whole request if any
// draft were mixed into the results.
export async function getPublishedBlogPosts() {
  try {
    const postsQuery = query(
      collection(db, BLOG_POSTS_COLLECTION),
      where("published", "==", true)
    );
    const snapshot = await runWithTimeout(() => getDocs(postsQuery));
    const posts = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));
    posts.sort((a, b) => (a.publishedDate < b.publishedDate ? 1 : -1));
    return { success: true, data: posts };
  } catch (error) {
    return {
      success: false,
      message: describeFirestoreError(error, "load blog posts"),
    };
  }
}

// Gets EVERY blog post, draft or published — admin-only (see
// firestore.rules). Used by the admin blog list.
export async function getAllBlogPosts() {
  try {
    const snapshot = await runWithTimeout(() =>
      getDocs(collection(db, BLOG_POSTS_COLLECTION))
    );
    const posts = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));
    posts.sort((a, b) => (a.publishedDate < b.publishedDate ? 1 : -1));
    return { success: true, data: posts };
  } catch (error) {
    return {
      success: false,
      message: describeFirestoreError(error, "load blog posts"),
    };
  }
}

// Gets one PUBLISHED blog post by its web-address slug. Used by the real,
// public post page. The query explicitly includes "published == true" —
// not just to filter results, but because Firestore's security rules
// require it: for a search/query (as opposed to "get this exact id"),
// Firestore must be able to tell from the search itself, before even
// looking at the data, that every possible result satisfies the rule. A
// search that only asked for a matching slug (without also saying
// "published") couldn't prove that in advance, so Firestore refused it
// outright for a signed-out visitor — even when the one post it would
// have found really was published. This function exists specifically to
// avoid that trap. Distinguishes "no such post" from "something went
// wrong" in its result, so the page can be honest about which happened.
export async function getPublishedBlogPostBySlug(slug) {
  try {
    const postsQuery = query(
      collection(db, BLOG_POSTS_COLLECTION),
      where("slug", "==", slug),
      where("published", "==", true)
    );
    const snapshot = await runWithTimeout(() => getDocs(postsQuery));
    if (snapshot.empty) {
      return {
        success: false,
        notFound: true,
        message: "That post could not be found.",
      };
    }
    const docSnap = snapshot.docs[0];
    return { success: true, data: { id: docSnap.id, ...docSnap.data() } };
  } catch (error) {
    return {
      success: false,
      notFound: false,
      message: describeFirestoreError(error, "load this post"),
    };
  }
}

// Gets one blog post by its web-address slug, draft or published — for
// admin use only (the admin form calling this is always signed in, so the
// "or signed in" half of the rule applies no matter what the search looks
// like). Used to check whether a slug is already taken by a different post.
export async function getBlogPostBySlug(slug) {
  try {
    const postsQuery = query(
      collection(db, BLOG_POSTS_COLLECTION),
      where("slug", "==", slug)
    );
    const snapshot = await runWithTimeout(() => getDocs(postsQuery));
    if (snapshot.empty) {
      return { success: false, message: "That post could not be found." };
    }
    const docSnap = snapshot.docs[0];
    return { success: true, data: { id: docSnap.id, ...docSnap.data() } };
  } catch (error) {
    return {
      success: false,
      message: describeFirestoreError(error, "load this post"),
    };
  }
}

// Gets one blog post by its database id. Used by the admin edit and
// preview pages.
export async function getBlogPostById(id) {
  try {
    const docSnap = await runWithTimeout(() =>
      getDoc(doc(db, BLOG_POSTS_COLLECTION, id))
    );
    if (!docSnap.exists()) {
      return { success: false, message: "That post could not be found." };
    }
    return { success: true, data: { id: docSnap.id, ...docSnap.data() } };
  } catch (error) {
    return {
      success: false,
      message: describeFirestoreError(error, "load this post"),
    };
  }
}

// Creates a brand new blog post and lets Firestore generate its id.
export async function addBlogPost(postData) {
  try {
    const docRef = await runWithTimeout(() =>
      addDoc(collection(db, BLOG_POSTS_COLLECTION), postData)
    );
    return { success: true, data: { id: docRef.id, ...postData } };
  } catch (error) {
    return {
      success: false,
      message: describeFirestoreError(error, "save the new post"),
    };
  }
}

// Saves changes to an existing blog post.
export async function updateBlogPost(id, postData) {
  try {
    await runWithTimeout(() =>
      updateDoc(doc(db, BLOG_POSTS_COLLECTION, id), postData)
    );
    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: describeFirestoreError(error, "save your changes"),
    };
  }
}

// Permanently removes a blog post. Its cover image is NOT deleted from
// Cloudinary (the free plan doesn't allow that from the browser) — only
// the post's record, and its link to that image, are removed.
export async function deleteBlogPost(id) {
  try {
    await runWithTimeout(() => deleteDoc(doc(db, BLOG_POSTS_COLLECTION, id)));
    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: describeFirestoreError(error, "delete this post"),
    };
  }
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
    const markerSnap = await runWithTimeout(() => getDoc(markerRef));
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
      await runWithTimeout(() =>
        setDoc(doc(db, PROJECTS_COLLECTION, String(id)), projectData)
      );
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
      await runWithTimeout(() =>
        setDoc(doc(db, REVIEWS_COLLECTION, String(id)), {
          ...reviewData,
          projectId: reviewData.projectId ? String(reviewData.projectId) : "",
        })
      );
    }
  } catch (error) {
    return {
      success: false,
      message: describeFirestoreError(error, "save the starter reviews"),
    };
  }

  try {
    await runWithTimeout(() =>
      setDoc(markerRef, { importedAt: new Date().toISOString() })
    );
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

// ---- SITE SETTINGS ----
//
// A single small document holding on/off switches for the public site that
// you might want to change without editing code — right now, just whether
// the "Admin Login" link shows in the public footer. Anyone can read this
// (the public footer needs to check it), but only a signed-in admin can
// change it.

// Gets the site settings. If the settings document doesn't exist yet (e.g.
// nobody has changed anything from the defaults), returns sensible defaults
// instead of an error — so the public site never breaks just because this
// hasn't been saved once yet.
const DEFAULT_SOCIAL_LINK = { url: "", enabled: false };

// The full shape of the site settings document, with every field's
// default value. Any field missing from what's actually saved (because
// nothing has been set yet, or a new setting was added after your last
// save) falls back to the default here — so the public site always has a
// sensible value for every setting, never a missing/undefined one.
export const DEFAULT_SITE_SETTINGS = {
  showAdminLoginLink: true,
  businessEmail: "",
  whatsappNumber: "",
  phoneNumber: "",
  socialLinks: {
    linkedin: { ...DEFAULT_SOCIAL_LINK },
    instagram: { ...DEFAULT_SOCIAL_LINK },
    facebook: { ...DEFAULT_SOCIAL_LINK },
    youtube: { ...DEFAULT_SOCIAL_LINK },
    twitter: { ...DEFAULT_SOCIAL_LINK },
    threads: { ...DEFAULT_SOCIAL_LINK },
    pinterest: { ...DEFAULT_SOCIAL_LINK },
    github: { ...DEFAULT_SOCIAL_LINK },
  },
  featuredWorkEnabled: true,
  homepageVideosEnabled: true,
  homepageReviewsEnabled: true,
  homepageEnquiryFormEnabled: true,
  blogEnabled: true,
  servicesEnabled: true,
};

export async function getSiteSettings() {
  try {
    const docSnap = await runWithTimeout(() =>
      getDoc(doc(db, SETTINGS_COLLECTION, SITE_SETTINGS_DOC_ID))
    );
    if (!docSnap.exists()) {
      return { success: true, data: DEFAULT_SITE_SETTINGS };
    }
    const saved = docSnap.data();
    return {
      success: true,
      data: {
        ...DEFAULT_SITE_SETTINGS,
        ...saved,
        socialLinks: {
          ...DEFAULT_SITE_SETTINGS.socialLinks,
          ...(saved.socialLinks || {}),
        },
      },
    };
  } catch (error) {
    // If settings can't be read for any reason, default to everything ON
    // rather than silently hiding pages, sections, or your own way in.
    return { success: true, data: DEFAULT_SITE_SETTINGS };
  }
}

// Updates the site settings. Admin-only (see firestore.rules).
export async function updateSiteSettings(settingsData) {
  try {
    await runWithTimeout(() =>
      setDoc(doc(db, SETTINGS_COLLECTION, SITE_SETTINGS_DOC_ID), settingsData, {
        merge: true,
      })
    );
    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: describeFirestoreError(error, "save the settings"),
    };
  }
}

// ---- PAGE CONTENT (the admin "Pages" section editor) ----
//
// Every public page (Home, Services, Projects, Reviews, Blog, Contact) is
// built out of an ordered list of "sections" stored here, one document per
// section. Anyone can read them (the public pages need to display them);
// only a signed-in admin can add, edit, delete, or reorder them. A few
// section types (Featured Work, the "How We Work" videos, client reviews,
// the blog list) are "automatic" — their actual repeating content still
// comes from the projects/reviews/homepageVideos/blogPosts collections as
// before; only their heading, subheading, order, and visibility live here.

// Gets every section for one page, in display order. Sorting happens here
// in code (not via Firestore's own orderBy) to match how the rest of this
// file avoids needing a special database index for ordered queries.
export async function getPageSections(page) {
  try {
    const sectionsQuery = query(
      collection(db, PAGE_CONTENT_COLLECTION),
      where("page", "==", page)
    );
    const snapshot = await runWithTimeout(() => getDocs(sectionsQuery));
    const sections = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));
    sections.sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
    return { success: true, data: sections };
  } catch (error) {
    return {
      success: false,
      message: describeFirestoreError(error, "load this page's content"),
    };
  }
}

// Adds a new section. Admin-only (see firestore.rules).
export async function addPageSection(sectionData) {
  try {
    const docRef = await runWithTimeout(() =>
      addDoc(collection(db, PAGE_CONTENT_COLLECTION), sectionData)
    );
    return { success: true, data: { id: docRef.id } };
  } catch (error) {
    return {
      success: false,
      message: describeFirestoreError(error, "add this section"),
    };
  }
}

// Updates an existing section. Admin-only (see firestore.rules).
export async function updatePageSection(id, sectionData) {
  try {
    await runWithTimeout(() =>
      updateDoc(doc(db, PAGE_CONTENT_COLLECTION, id), sectionData)
    );
    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: describeFirestoreError(error, "save this section"),
    };
  }
}

// Deletes a section. Admin-only (see firestore.rules).
export async function deletePageSection(id) {
  try {
    await runWithTimeout(() =>
      deleteDoc(doc(db, PAGE_CONTENT_COLLECTION, id))
    );
    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: describeFirestoreError(error, "delete this section"),
    };
  }
}

// Saves a new display order for a page's sections after dragging one into
// a new position. Admin-only (see firestore.rules).
export async function reorderPageSections(orderedSections) {
  try {
    await runWithTimeout(() =>
      Promise.all(
        orderedSections.map((section, index) =>
          updateDoc(doc(db, PAGE_CONTENT_COLLECTION, section.id), {
            displayOrder: index + 1,
          })
        )
      )
    );
    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: describeFirestoreError(error, "save the new section order"),
    };
  }
}

// Copies the starter sections (from data/pageContentSeed.js) into the real
// database, once — these are the site's existing words, exactly as they
// appeared before this system existed, so nothing is lost and every page
// starts out fully editable instead of blank. Refuses to run twice.
export async function seedPageContent() {
  const markerRef = doc(db, SETUP_COLLECTION, PAGE_CONTENT_SEED_DOC_ID);

  try {
    const markerSnap = await runWithTimeout(() => getDoc(markerRef));
    if (markerSnap.exists()) {
      return {
        success: false,
        message:
          "The starter page content has already been imported. This only needs to run once.",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: describeFirestoreError(
        error,
        "check whether the starter page content was already imported"
      ),
    };
  }

  try {
    for (const section of starterPageContent) {
      await runWithTimeout(() =>
        addDoc(collection(db, PAGE_CONTENT_COLLECTION), section)
      );
    }
  } catch (error) {
    return {
      success: false,
      message: describeFirestoreError(error, "save the starter page content"),
    };
  }

  try {
    await runWithTimeout(() =>
      setDoc(markerRef, { importedAt: new Date().toISOString() })
    );
  } catch (error) {
    return {
      success: false,
      message: describeFirestoreError(
        error,
        "record that the page content import finished"
      ),
    };
  }

  return {
    success: true,
    message: `Imported ${starterPageContent.length} sections across every page.`,
  };
}
