import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";
import { Outlet, useLoaderData } from "@remix-run/react";

import Hero from "~/components/Hero";
import Info from "~/components/Info";
import RVSP from "~/components/RVSP";
import Credits from "~/components/Credits";

export const meta: MetaFunction = () => ({
  title: "Matt & Dominique's Wedding Reception",
  description: "Matt & Dominique's Wedding Reception",
  author: "Matt Forster",
});

export const action: ActionFunction = async ({ request }) => {
  const body = await request.formData();

  // TODO: Set 'visited' on RVSP
  const rvspCode = body.get("rvspCode");

  return redirect(`/wedding/${rvspCode}#rsvp`);
};

export const loader: LoaderFunction = async ({ request }) => ({
  fillCode: new URL(request.url).pathname.split("/")[2],
});

export default function Index() {
  const { fillCode } = useLoaderData();

  return (
    <div className="grid gap-60 place-items-stretch width-screen bg-gradient-to-b from-black via-black to-[#2e3440] text-[#d8dee9]">
      <Hero />
      <Info />
      <RVSP code={fillCode} />
      <Outlet />
      <Credits />
    </div>
  );
}
