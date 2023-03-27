import { ArrowTopRightOnSquareIcon } from "@heroicons/react/20/solid";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

const ExternalLinkIcon = (
  <ArrowTopRightOnSquareIcon className="inline -mr-1 ml-1 h-5 w-5" />
);

export default function Info() {
  return (
    <div
      id="info"
      className="p-10 grid place-items-start gap-8 mt-0 sm:m-10 lg:m-20 rounded-lg"
    >
      <h2 className="text-3xl text-[#eceff4]">Saturday, September 2nd, 2023</h2>
      <div>
        <h2 className="text-2xl">
          <a
            className="underline"
            href="https://www.azuridgehotel.com/"
            target="_blank"
            rel="noreferrer"
          >
            Azure Ridge Estate{ExternalLinkIcon}
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
          wedding@mattforster.ca{ExternalLinkIcon}
        </a>
        .
        <br />
        We can't wait to celebrate with everybody - see you there!
      </div>

      <div>
        <h2 className="mb-2 text-3xl text-[#eceff4]">Location</h2>
        <div>
          Azuridge Estate Hotel, 178057 272 St W, Priddis, AB T0L 1W4
          <div className="text-xs italic">
            <InformationCircleIcon className="h-4 w-4 inline" /> ~20 minutes
            from the south of Calgary
          </div>
          <br />
          <a
            className="text-[#d8dee9] text-sm underline"
            target="_blank"
            href="https://www.google.com/maps/dir//Azuridge+Estate+Hotel,+178057+272+St+W,+Priddis,+AB+T0L+1W4/@50.8868693,-114.4765116,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x53710c4fda3fcc89:0x8fe100c59e14140e!2m2!1d-114.406472!2d50.8868903"
            rel="noreferrer"
          >
            Directions from your current location{ExternalLinkIcon}
          </a>
        </div>
      </div>

      <div>
        <h2 className="mb-2 text-3xl">Schedule</h2>
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
        <div className="mt-2 italic text-xs">
          <InformationCircleIcon className="h-4 w-4 inline" /> Everything held
          on grounds at Azure Ridge
        </div>
      </div>

      <div>
        <h2 className="mb-2 text-3xl">Accommodation</h2>
        <div>
          There is limited accommodation on-site, and we've reserved those rooms
          for family and the wedding party. If your RVSP info does not include a
          room assignment, we can help you find a nearby hotel. Our
          reccomedations are:
          <ul className="list-disc list-inside ml-8">
            <li>
              <a
                className="underline"
                target="_blank"
                href="https://www.marriott.com/en-us/hotels/yycdc-delta-hotels-calgary-south/overview/"
                rel="noreferrer"
              >
                Marriott - South Calgary{ExternalLinkIcon}
              </a>
            </li>
            <li>
              <a
                className="underline"
                target="_blank"
                href="https://www.marriott.com/en-us/hotels/yyccr-residence-inn-calgary-south/overview/"
                rel="noreferrer"
              >
                Marriot - South Health Campus{ExternalLinkIcon}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <h2 className="mb-2 text-3xl">Gifts</h2>
        <div>
          We respectfully request that you do not bring gifts to the reception.
          Instead, if you like, you can make a donation to one of our favorite
          charities;{" "}
          <a
            href="https://wck.org/"
            className="underline"
            target="_blank"
            rel="noreferrer"
          >
            World Central Kitchen{ExternalLinkIcon}
          </a>{" "}
          or{" "}
          <a
            href="https://lethbridgepregcentre.com/donors/online-donations/"
            target="_blank"
            className="underline"
            rel="noreferrer"
          >
            Lethbridge Pregnancy Centre{ExternalLinkIcon}
          </a>
        </div>
      </div>
    </div>
  );
}
