import { Header } from "./header.tsx";
import type { Contact } from "../../schema/types.ts";

export function Contact({ contact }: { contact: Contact }) {
  const { email, address, phone, profiles } = contact;

  return (
    <div class="flex gap-1">
      {/* <Header title="Contact" /> */}
      <p>
        {address} {phone}
      </p>

      <span>—</span>

      <a class="underline" href={`mailto:${email}`}>
        {email}
      </a>

      <span>—</span>
      {profiles.map(({ platform, url }, index) => (
        <div class="flex items-center gap-1">
          {/* <h3 class="font-medium">{platform}</h3> */}
          <a
            href={url}
            target="_blank"
            class="flex items-center inline-block underline"
          >
            <span>{url.replace("https://", "")}</span>
            <span class="i-lucide:external-link text-xs text-gray-600 ml-1"></span>
          </a>
          {index !== profiles.length - 1 && <span>—</span>}
        </div>
      ))}
    </div>
  );
}
