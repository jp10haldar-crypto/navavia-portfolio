// WHAT THIS FILE DOES: The "Add New Project" page, visible at
// /admin/projects/new. It's just the shared ProjectForm with nothing
// pre-filled in.

import ProjectForm from "@/components/admin/ProjectForm";

export default function NewProjectPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Add New Project</h1>
      <div className="mt-8">
        <ProjectForm />
      </div>
    </div>
  );
}
