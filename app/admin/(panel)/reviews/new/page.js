// WHAT THIS FILE DOES: The "Add New Review" page, visible at
// /admin/reviews/new. It's just the shared ReviewForm with nothing
// pre-filled in.

import ReviewForm from "@/components/admin/ReviewForm";

export default function NewReviewPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Add New Review</h1>
      <div className="mt-8">
        <ReviewForm />
      </div>
    </div>
  );
}
