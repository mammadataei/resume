import { Education } from "../../schema/types.ts";
import { Header } from "./header.tsx";

export function Education({ education }: { education: Array<Education> }) {
  return (
    <div>
      <Header title="Education" />
      <div>
        {education.map(({ institution, degree, field, from, to }) => (
          <p class="">
            {institution} — {degree} of {field} — {from} - {to}
          </p>
        ))}
      </div>
    </div>
  );
}
