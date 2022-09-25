import type { MetaFunction } from "@remix-run/cloudflare";

import Hero from "../components/Hero";
import Info from "../components/Info";
import RVSP from "../components/RVSP";
import Credits from "../components/Credits";

export const meta: MetaFunction = () => ({
  title: "Matt & Dominique's Wedding",
  description: "Matt & Dominique's Wedding",
  author: "Matt Forster",
});

export default function Index() {
  return (
    <div className="grid gap-60 place-items-stretch width-100 overflow-x-hidden bg-gradient-to-b from-black via-black to-[#2e3440] text-[#eceff4]">
      <Hero/>
      <Info/>
      <RVSP/>
      <Credits/>
    </div>
  );
}
