import { generateCSS } from "../utils/generateCSS.tsx";

export async function Layout({
  children,
}: {
  children: JSX.Element;
}): Promise<JSX.Element> {
  const css = await generateCSS();

  return (
    <html dir="ltr">
      <head>
        <meta charset="utf-8" />
        <title>Resume</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@unocss/reset/tailwind.min.css"
        />
        <style dangerouslySetInnerHTML={{ __html: css }}></style>
      </head>

      <body>{children}</body>
    </html>
  );
}
