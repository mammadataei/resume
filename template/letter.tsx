import type { Letter } from "../schema/types.ts";
import { loadCoverLetter } from "../utils/loadResume.ts";

export async function Letter(): Promise<JSX.Element> {
  const letter = await loadCoverLetter();

  const { title, name, contact, company, recipient, body } = letter;

  return (
    <div class="space-y-8 font-sans font-normal text-xs leading-relaxed tracking-wide">
      <header class="space-y-0.5 text-slate-700">
        <h1 class="text-2xl font-bold text-sky-600">{name}</h1>
        <h2 class="text-sm font-medium">{title}</h2>

        <div class="pt-1">
          <p>Phone: {contact.phone} </p>
          <p>
            Email:{" "}
            <a class="underline" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
          </p>
        </div>
      </header>

      <main class="w-3/4 space-y-8 text-sm leading-relaxed tracking-wide text-slate-800">
        <p>{new Date().toDateString()}</p>

        <div>
          <p>
            {recipient.firstName} {recipient.lastName}
          </p>
          <p>{recipient.title}</p>
          <p>{company}</p>
        </div>

        <div class="space-y-2">
          <p>Dear {recipient.firstName},</p>
          <div class="space-y-2">
            {body.map((paragraph) => (
              <p>{paragraph}</p>
            ))}
          </div>
        </div>

        <div>
          <p>Regards,</p>
          <p>{name}</p>
        </div>
      </main>
    </div>
  );
}
