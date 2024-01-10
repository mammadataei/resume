import { Project } from "../../schema/types.ts";
import { Header } from "./header.tsx";

export function Projects({ projects }: { projects: Array<Project> }) {
  return (
    <div class="space-y-0.5">
      <Header title="Open source projects" />

      <div class="space-y-4">
        {projects.map(({ name, description, url }) => (
          <div class="space-y-0.5">
            <a
              href={url}
              target="_blank"
              class="inline-flex items-center justify-start space-x-1 font-semibold"
            >
              <span>{name}</span>
              <span class="i-lucide:external-link text-xs text-gray-600"></span>
            </a>

            <p>{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
