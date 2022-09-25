export default function First() {
  return (
    <div
      className="bg-cover bg-center-bottom bg-no-repeat h-screen w-screen grid place-items-center"
      style={{
        backgroundImage: 'url("./images/phil-botha-a0TJ3hy-UD8-unsplash.jpg")',
      }}
    >
      <div className="text-center text-6xl">
        <h1>Matthew & Dominique</h1>
        {/* <div>Forster</div> */}
      </div>

      <div className="text-center text-4xl mb-24">
        Pridis, AB
        <br />
        September 5th, 2023
      </div>

      <div className="border-t border-slate-300 flex flex-row gap-80 text-xl pt-8">
        <a className="pl-10" href="#about">
          About
        </a>
        <a className="pr-10" href="#rsvp">
          RSVP
        </a>
      </div>
    </div>
  );
}
