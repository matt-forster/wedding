import { HeartIcon } from "@heroicons/react/24/outline";

export default function Fourth() {
  return (
    <div
      className="bg-cover bg-center-bottom bg-no-repeat w-screen h-40 grid text-right place-items-end gap-0 text-xs"
      style={{
        backgroundImage: 'url("/images/landscape.png")',
      }}
    >
      <div>
        <div className="mr-4">
          Cover photo by{" "}
          <a
            target="_blank"
            className="underline"
            href="https://unsplash.com/@philbotha?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
            rel="noreferrer"
          >
            Phil Botha
          </a>{" "}
          on Unsplash
        </div>
        <div className="mr-4 mb-4">
          Made with <HeartIcon className="text-red-600 inline w-4 h-4" /> by
          Matt
        </div>
      </div>
    </div>
  );
}
