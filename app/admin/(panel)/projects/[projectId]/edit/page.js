// WHAT THIS FILE DOES: The "Edit Project" page, visible at
// /admin/projects/[projectId]/edit. It first loads that one project from
// the database, then hands its current details to the shared ProjectForm
// so the fields start out already filled in. Runs in the browser because
// it fetches data after the page opens.

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProjectById } from "@/lib/firestore";
import ProjectForm from "@/components/admin/ProjectForm";

export default function EditProjectPage() {
  const { projectId } = useParams();
  const [project, setProject] = useState(undefined); // undefined = still loading
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let isMounted = true;

    getProjectById(projectId).then((result) => {
      if (!isMounted) return;
      if (result.success) {
        setProject(result.data);
      } else {
        setLoadError(result.message);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [projectId]);

  if (loadError) {
    return <p className="text-muted">{loadError}</p>;
  }

  if (project === undefined) {
    return <p className="text-muted">Loading project...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Edit Project</h1>
      <div className="mt-8">
        <ProjectForm projectId={projectId} initialProject={project} />
      </div>
    </div>
  );
}
