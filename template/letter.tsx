import { Contact } from "./components/contact.tsx";
import { Header } from "./components/header.tsx";
import type { Letter } from "../schema/types.ts";
import { loadCoverLetter } from "../utils/loadResume.ts";

export async function Letter(): Promise<JSX.Element> {
  const letter = await loadCoverLetter();

  const { title, name, contact, company, recipient, body } = letter;

  return (
    <div class="font-sans font-normal text-xs text-slate-800 leading-relaxed tracking-wide">
      <div class="flex pt-6">
        <div class="w-1/3 space-y-8 pr-6">
          <div class="space-y-1">
            <Header title={title} />
            <h1 class="text-4xl font-bold text-stone-700">{name}</h1>
          </div>

          <Contact contact={contact} />
        </div>

        <div class="w-2/3 pl-6 space-y-8 text-sm leading-relaxed tracking-wide text-slate-700">
          <p>{new Date().toDateString()}</p>

          <div class="">
            <p>
              {recipient.firstName} {recipient.lastName}
            </p>
            <p>{recipient.title}</p>
            <p>{company}</p>
          </div>

          <div class="space-y-2">
            <p>Dear {recipient.firstName},</p>
            <div class="space-y-2">
              {body.map((paragraph) => <p>{paragraph}</p>)}
            </div>
          </div>

          <div>
            <p>Regards,</p>
            <p>{name}</p>
            <p>{title}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
