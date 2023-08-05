import { Header } from "./components/header.tsx";
import { Contact } from "./components/contact.tsx";
import type { Resume } from "../schema/types.ts";
import { loadResume } from "../utils/loadResume.ts";
import { Experiences } from "./components/experiences.tsx";

export function List({
  title,
  items,
}: {
  title: string;
  items: Array<string>;
}) {
  return (
    <div class="">
      <Header title={title} />

      <ul class="list-disc pl-4">
        {items.map((item) => (
          <li class="">{item}</li>
        ))}
      </ul>
    </div>
  );
}

export async function Resume() {
  const resume = await loadResume();

  const {
    title,
    name,
    contact,
    skills,
    tools,
    education,
    experiences,
    projects,
  } = resume;

  return (
    <div class="font-sans font-normal text-xs text-slate-800 leading-relaxed tracking-wide">
      <div class="flex">
        <div class="w-1/3 space-y-8 pr-6">
          <div class="space-y-1">
            <Header title={title} />
            <h1 class="text-4xl font-bold text-stone-700">{name}</h1>
          </div>

          <Contact contact={contact} />
          <List title="Skills" items={skills} />
          <List title="Tools and Technologies" items={tools} />

          <div class="">
            <Header title="Education" />
            <p class="font-medium">
              {education[0].degree} of {education[0].field}
            </p>
            <p>{education[0].institution}</p>
            <p>
              {education[0].from} - {education[0].to}
            </p>
          </div>

          {/* <div class="space-y-1">
            <Header title={title} />
            <h1 class="text-4xl font-bold text-stone-700">{name}</h1>
          </div> */}
        </div>

        <div class="w-2/3 pl-6 space-y-6">
          {/* <div class="">
          <Header title="Summary" />
            <p>{summary}</p>
          </div> */}

          <Experiences experiences={experiences} />

          <div class="">
            <Header title="Open source projects" />
            <div class="space-y-4">
              {projects.map(({ name, description, url }) => (
                <div class="">
                  <a
                    href={url}
                    target="_blank"
                    class="inline-flex items-center justify-start space-x-1 font-medium text-sm"
                  >
                    <span>{name}</span>
                    <span class="i-lucide:external-link text-xs text-gray-600"></span>
                  </a>

                  <p class="pt-1">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
