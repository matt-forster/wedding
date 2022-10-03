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
  return redirect(`/wedding/${body.get("rsvpCode")}#rsvp`);
};

export const loader: LoaderFunction = async ({ request }) => ({
  fillCode: new URL(request.url).pathname.split("/")[2],
});

export default function Index() {
  const { fillCode } = useLoaderData();

  return (
    <div className="grid gap-50 place-items-center width-screen bg-gradient-to-b from-black via-black to-[#2e3440] text-[#d8dee9]">
      <Hero />
      <Info />
      <div className="pt-20 grid place-items-center w-full">
        <RSVPCode code={fillCode} />
        <Outlet />
      </div>
      <Credits />
    </div>
  );
}
