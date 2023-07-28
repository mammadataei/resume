import { renderJSX } from "../deps.ts";
import { Layout } from "../template/layout.tsx";
import { Resume } from "../template/resume.tsx";
import { Letter } from "../template/letter.tsx";

export function renderResume() {
  return renderJSX(
    <Layout>
      <Resume />
    </Layout>,
  );
}

export function renderLetter() {
  return renderJSX(
    <Layout>
      <Letter />
    </Layout>,
  );
}
