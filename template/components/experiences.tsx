import { Header } from "./header.tsx";
import type { Experience } from "../../schema/types.ts";

export function Experiences({
  experiences,
}: {
  experiences: Array<Experience>;
}) {
  return (
    <div class="space-y-0.5">
      <Header title="Experience" />

      <div class="space-y-4">
        {experiences.map(({ company, positions }) => (
          <div class="space-y-1">
            <div class="flex justify-start items-baseline gap-1 font-semibold text-sm text-slate-700">
              <h3 class="">{company}</h3>
            </div>

            <div class="space-y-2">
              {positions.map((position) => (
                <div>
                  <div class="flex justify-start items-center gap-1 text-sky-600">
                    <div class="font-semibold">{position.position}</div>
                    <span>—</span>
                    <div class="text-0.625rem">
                      {position.from} - {position.to} (
                      {duration(
                        new Date(position.from),
                        position.to === "Present"
                          ? new Date()
                          : new Date(position.to)
                      )}
                      )
                    </div>
                  </div>

                  <ul class="list-disc pl-4 pt-1 space-y-0.5">
                    {position.highlights.map((highlight) => (
                      <li
                        class=""
                        dangerouslySetInnerHTML={{
                          __html: highlight,
                        }}
                      ></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const duration = (from: Date, to: Date) => {
  const diff = to.getTime() - from.getTime();
  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 30 * 12));
  const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30)) % 12;

  return `${years === 0 ? "" : `${years} year${years > 1 ? "s" : ""} `}${
    months === 0 ? "" : `${months} month${months > 1 ? "s" : ""}`
  }`;
};
