export default function First() {
  return (
    <div
      id="hero"
      className="bg-cover bg-center-bottom bg-no-repeat h-screen w-screen grid place-items-center"
      style={{
        backgroundImage: "url('/images/space.jpg')",
      }}
    >
      <div className="h-screen w-screen grid place-items-center justify-center bg-gradient-to-b from-black/90 via-transparent">
        <div className="text-center">
          <div>You are invited to the third-attempt reception of</div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-[#eceff4]">
            Matthew & Dominique <br /> Forster
          </h1>
        </div>

        {/* <div className="grid w-full h-1/3 text-center place-items-center bg-grey lg:text-3xl mb-24 rounded-lg">
          Azure Ridge Estate,
          <br />
          Foothills, AB
          <br />
          Saturday, September 2nd, 2023
        </div> */}

        <div className="border-t border-slate-300 flex flex-row lg:gap-80 text-xl pt-8">
          <a className="pr-10 ml-8 font-bold hover:text-[#81a1c1]" href="#info">
            About
          </a>
          <a className="pl-10 mr-8 font-bold hover:text-[#81a1c1]" href="#rsvp">
            RSVP
          </a>
        </div>
      </div>
    </div>
  );
}
