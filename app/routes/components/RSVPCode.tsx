export default function RSVPCode({ code }: { code: string | null }) {
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

      <form method="post" action="/wedding">
        <label className="block text-sm font-medium">
          RVSP Code
          <div className="relative mt-1 rounded-md shadow-sm">
            <input
              type="text"
              name="rsvpCode"
              className="block w-full rounded-md text-black text-center border-gray-300 h-6 focus:border-[#88c0d0] focus:ring-[#8fbcbb] sm:text-sm"
              placeholder=""
              defaultValue={code ? code : ""}
            />
          </div>
        </label>

        <input
          className="mt-4 bg-transparent hover:bg-[#81a1c1] text-[#5e81ac] font-semibold hover:text-white py-2 px-4 border border-[#5e81ac] hover:border-transparent rounded"
          type="submit"
          name="action"
          value="Find"
        />
      </form>
    </div>
  );
}
