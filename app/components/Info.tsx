export default function Info() {
  return (
    <div
      id="info"
      className="grid justify-center place-items-start gap-4 mt-0 sm:m-10 lg:m-20 p-4 rounded-lg"
    >
      <h2 className="text-3xl text-[#eceff4]">Saturday, September 2nd, 2023</h2>
      <div>
        <h2 className="text-2xl">
          <a className="" href="https://www.azuridgehotel.com/">
            Azure Ridge Estate
          </a>
        </h2>
      </div>

      <div>
        Third time's the charm! We're finally having our celebration. We're so
        excited to share the day with everybody. A closer venue, with more
        options for accommodation and higher flexibility - we hope that this
        opens up the opportunity for more people to join us. This website serves
        as the main source of information for the event. We have the same RSVP
        process, but we've added a few more details to help you plan.
        <br />
        <br />
        If you have any questions, please reach out to us at{" "}
        <a className="underline" href="mailto:wedding@mattforster.ca">
          wedding@mattforster.ca
        </a>
        .
        <br />
        We can't wait to celebrate with everybody - see you there!
      </div>

      <h2 className="text-3xl text-[#eceff4]">Location</h2>
      <div>
        Azuridge Estate Hotel, 178057 272 St W, Priddis, AB T0L 1W4
        <div className="text-xs text-light">
          ~20 minutes from the south of Calgary
        </div>
        <br />
        <a
          className="text-[#d8dee9] text-sm underline"
          target="_blank"
          href="https://www.google.com/maps/dir/49.6678073,-112.9134037/Azuridge+Estate+Hotel+Chic+rooms,+plus+fine+dining+%26+a+spa/@50.2873197,-114.2127867,9z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x53710c4fda3fcc89:0x8fe100c59e14140e!2m2!1d-114.406472!2d50.8868903"
          rel="noreferrer"
        >
          Directions from your current location{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 mb-1 inline-block"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
            />
          </svg>
        </a>
      </div>

      <h2 className="text-3xl">Schedule</h2>
      <div className="grid grid-cols-3 gap-4 place-items-stretch ml-10">
        <div className="font-bold">Saturday, Sept. 2nd</div>
        <div className="font-bold">Time</div>
        <div className="font-bold">Location</div>

        <div className="">Ceremony</div>
        <div>4:00 PM</div>
        <div>Outdoor Ceremony</div>

        <div className="">Cocktails</div>
        <div>4:30 PM</div>
        <div></div>

        <div className="">Dinner</div>
        <div>6:30 PM</div>
        <div>Indoor Reception</div>

        <div className="mt-8 font-bold">Sunday, Sept. 3rd</div>
        <div className="mt-8 font-bold">Time</div>
        <div className="mt-8 font-bold">Location</div>

        <div className="">Breakfast</div>
        <div>9:00 AM</div>
        <div></div>
      </div>
      <div className="font-light text-sm">
        Everything held on grounds at Azure Ridge
      </div>
    </div>
  );
}
