import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";
import { Outlet, useLoaderData } from "@remix-run/react";

import Hero from "./components/Hero";
import Info from "./components/Info";
import RSVPCode from "./components/RSVPCode";
import Credits from "./components/Credits";

export const meta: MetaFunction = () => ({
  title: "Matt & Dominique's Wedding Reception",
  description: "Matt & Dominique's Wedding Reception",
  author: "Matt Forster",
});

export const action: ActionFunction = async ({ request }) => {
  const body = await request.formData();
  const rsvpCode = body.get("rsvpCode") as string;
  return redirect(`/wedding/${rsvpCode.toLowerCase()}#rsvp`);
};

export const loader: LoaderFunction = async ({ request }) => ({
  fillCode: new URL(request.url).pathname.split("/")[2],
});

export default function Index() {
  const { fillCode } = useLoaderData();

  return (
    <div className="grid gap-50 place-items-center w-screen overflow-hidden bg-gradient-to-b from-black via-black to-[#2e3440] text-[#d8dee9]">
      <Hero />
      <Info />
      <div className="pt-20 w-full">
        <RSVPCode code={fillCode} />
        <Outlet />
      </div>
      <Credits />
    </div>
  );
}
