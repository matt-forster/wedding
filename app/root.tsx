import type { LinksFunction, MetaFunction } from "@remix-run/cloudflare";
import styles from "./tailwind.css";

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  { rel: "manifest", href: "/site.webmanifest" },
  { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon.ico" },
  { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon.ico" },
  { rel: "apple-touch-icon", type: "image/png", sizes: "180x180", href: "/apple-touch-icon.png" },
];

export default function App() {
  return (
    <html lang="en" className="bg-black">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
