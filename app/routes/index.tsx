import type { MetaFunction } from '@remix-run/cloudflare';

export const meta: MetaFunction = () => ({
  title: "Matt & Dominique's Wedding",
  description: "Matt & Dominique's Wedding",
  author: "Matt Forster",
  refresh: {
    httpEquiv: "refresh",
    content: "0; url=/wedding"
  }
})

export default function Index() {
  return (<></>)
}
