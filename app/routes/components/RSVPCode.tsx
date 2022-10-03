import { ArrowPathIcon } from '@heroicons/react/20/solid'
import { Form, useTransition } from "@remix-run/react";

export default function RSVPCode({ code }: { code: string | null }) {
  const transition = useTransition();

  return (
    <div
      id="rsvp"
      className="grid gap-4 justify-center place-items-center text-center"
    >
      <h2 className="text-4xl font-bold">RSVP</h2>
      <div className="italic font-light">
        You can come back and update this anytime before{" "}
        <span className="font-bold not-italic">July 8th, 2023</span>.
      </div>

      <Form method="post" action="/wedding">
        <label className="block text-sm font-medium">
          RSVP Code
          <fieldset
            disabled={["submitting", "loading"].includes(transition.state)}
            className="relative mt-1 rounded-md shadow-sm"
          >
            <input
              type="text"
              name="rsvpCode"
              className="block w-full rounded-md text-black text-center border-gray-300 h-6 focus:border-[#88c0d0] focus:ring-[#8fbcbb] sm:text-sm"
              placeholder=""
              defaultValue={code ? code : ""}
            />
          </fieldset>
        </label>

        <div className="grid place-items-center">
          <button
            type="submit"
            className="mt-4 bg-transparent hover:bg-[#81a1c1] text-[#5e81ac] font-semibold hover:text-white py-2 px-4 border border-[#5e81ac] hover:border-transparent rounded"
          >
            {["submitting", "loading"].includes(transition.state) ? <ArrowPathIcon className="animate-spin h-6 w-6" /> : "Find"}
          </button>
        </div>
      </Form>
    </div>
  );
}
