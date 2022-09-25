export default function First() {
  return (
    <div
      id="hero"
      className="bg-cover bg-center-bottom bg-no-repeat h-screen w-screen grid place-items-center justify-center"
      style={{
        backgroundImage: 'url("./images/phil-botha-a0TJ3hy-UD8-unsplash.jpg")',
      }}
    >
      <div className="text-center">
        <div>You are invited to the third-attempt reception of</div>
        <h1 className="text-3xl lg:text-6xl text-[#eceff4]">
          Matthew & Dominique
        </h1>
        <div className="text-3xl lg:text-6xl">Forster</div>
      </div>

      <div className="text-center bg-grey lg:text-3xl mb-24">
        Azure Ridge Estate,
        <br />
        Foothills, AB
        <br />
        Saturday, September 2nd, 2023
      </div>

      <div className="border-t border-slate-300 flex flex-row lg:gap-80 text-xl pt-8">
        <a className="pr-10 font-bold hover:text-[#81a1c1]" href="#info">
          About
        </a>
        <a className="pl-10 font-bold hover:text-[#81a1c1]" href="#rsvp">
          RSVP
        </a>
      </div>
    </div>
  );
}
