export default function Fourth() {
  return (
    <div
      className="bg-cover bg-center-bottom bg-no-repeat w-screen h-40 grid place-items-end gap-0 text-xs"
      style={{
        backgroundImage: 'url("/images/landscape.png")',
      }}
    >
      <div>
        <div className="mr-8">
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
        <div className="mr-8 mb-8">
          Made with{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 inline-block text-red-600"
            aria-label="love"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>{" "}
          by Matt
        </div>
      </div>
    </div>
  );
}
