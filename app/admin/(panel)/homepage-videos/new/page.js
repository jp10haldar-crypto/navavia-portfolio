// WHAT THIS FILE DOES: The "Add New Video" page, visible at
// /admin/homepage-videos/new. It's just the shared HomepageVideoForm with
// nothing pre-filled in.

import HomepageVideoForm from "@/components/admin/HomepageVideoForm";

export default function NewHomepageVideoPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Add New Video</h1>
      <div className="mt-8">
        <HomepageVideoForm />
      </div>
    </div>
  );
}
