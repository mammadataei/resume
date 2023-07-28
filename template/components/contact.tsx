import { Header } from "./header.tsx";
import type { Contact } from "../../schema/types.ts";

export function Contact({ contact }: { contact: Contact }) {
  const { email, address, phone, profiles } = contact;

  return (
    <div class="">
      <Header title="Contact Info" />
      <p>{email}</p>
      <p>
        {address} {phone}
      </p>

      <div class="pt-3 space-y-2">
        {profiles.map(({ platform, url }) => (
          <div class="">
            <h3 class="font-medium">{platform}</h3>
            <a href={url} target="_blank" class="inline-block">
              <span>{url.replace("https://", "")}</span>
              <span class="i-lucide:external-link text-xs text-gray-600 ml-1">
              </span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
