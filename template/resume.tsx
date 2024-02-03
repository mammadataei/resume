import type { Resume } from "../schema/types.ts";
import { Contact } from "./components/contact.tsx";
import { Education } from "./components/education.tsx";
import { Experiences } from "./components/experiences.tsx";
import { List } from "./components/list.tsx";
import { loadResume } from "../utils/loadResume.ts";
import { Projects } from "./components/projects.tsx";
import { Summary } from "./components/summary.tsx";

export async function Resume() {
  const resume = await loadResume();

  const {
    title,
    name,
    contact,
    skills,
    education,
    experiences,
    projects,
    summary,
  } = resume;

  return (
    <div class="font-sans font-normal text-xs text-slate-700 leading-relaxed tracking-wide">
      <div class="space-y-4">
        <div class="space-y-1">
          <div class="flex items-center gap-2 text-2xl font-bold text-sky-600">
            <h1 class="">{name}</h1>
            <span>—</span>
            <h1 class="">{title}</h1>
          </div>

          <Contact contact={contact} />
        </div>

        <Summary summary={summary} />

        <List title="Skills" items={skills.map((group) => group.join(", "))} />

        <Experiences experiences={experiences} />

        <Projects projects={projects} />

        <Education education={education} />
      </div>
    </div>
  );
}
