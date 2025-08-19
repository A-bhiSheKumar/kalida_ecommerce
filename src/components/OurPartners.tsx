const OurPartners = () => {
  return (
    <section className="bg-white text-black py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto text-center md:text-left">
        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Our Projects & Partners
        </h2>

        {/* Description */}
        <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
          Over the years, we have been privileged to be part of numerous
          prestigious projects worldwide. From iconic hotel interiors to
          sprawling residential complexes, impressive commercial buildings,
          cutting-edge medical facilities, and expansive industrial complexes,
          our materials have played a role in shaping remarkable spaces.
        </p>
        <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-10">
          Our partnerships with renowned entities such as{" "}
          <span className="font-semibold text-black">
            Fairmont Hotels & Resorts, Kempinski Hoteliers, Novotel Hotels &
            Resorts
          </span>{" "}
          and many more, further validate our commitment to excellence.
        </p>

        {/* Partners Logos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center">
          <div className="flex justify-center">
            <img
              src="https://www.akamai.com/site/en/images/logo/fairmont-hotels-and-resorts-logo.jpg"
              alt="Fairmont Hotels & Resorts"
              className="h-12 md:h-16 object-contain"
            />
          </div>
          <div className="flex justify-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Kempinski_Logo_2015.svg/1200px-Kempinski_Logo_2015.svg.png"
              alt="Kempinski Hotels"
              className="h-12 md:h-16 object-contain"
            />
          </div>
          <div className="flex justify-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Novotel_logo_%282016%29.svg/2560px-Novotel_logo_%282016%29.svg.png"
              alt="Novotel Hotels & Resorts"
              className="h-12 md:h-16 object-contain"
            />
          </div>
          <div className="flex justify-center">
            <img
              src="https://dummyimage.com/200x80/e5e5e5/000&text=+More+"
              alt="More Partners"
              className="h-12 md:h-16 object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurPartners;
