import { Header } from "./header.tsx";
import type { Experience } from "../../schema/types.ts";

export function Experiences({
  experiences,
}: {
  experiences: Array<Experience>;
}) {
  return (
    <div class="">
      <Header title="Experience" />

      <div class="space-y-6">
        {experiences.map(({ company, positions }) => (
          <div class="space-y-1">
            <div class="flex justify-start items-baseline gap-1 font-medium text-sm">
              <h3 class="">{company}</h3>
            </div>

            <div class="space-y-3">
              {positions.map((position) => (
                <div>
                  <div class="flex justify-between items-center">
                    <div class="font-semibold">{position.position}</div>
                    <div class="text-0.625rem">
                      {position.from} - {position.to}
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
