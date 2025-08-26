import aboutImg from "../assets/aboutimg.png";
const WhoWeAre = () => {
  return (
    <section className="text-black w-full py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start">
        {/* Left Content */}
        <div className="md:w-1/2 text-left">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Who We Are</h2>
          <p className="text-neutral-600 leading-relaxed">
            At <span className="font-semibold text-orange-400">Kalida</span>, we
            take pride in delivering excellence through our wide range of
            premium construction materials and solutions. From exquisite tiles
            and luxurious sanitary fixtures to lighting, woodworks, and wellness
            products — we bring innovation and quality to every project.
          </p>
          <p className="text-neutral-600 text-base md:text-lg leading-relaxed mt-4">
            Our mission is simple: to provide top-notch materials and unmatched
            service at fair prices, ensuring your vision transforms into reality
            with professionalism and trust.
          </p>
        </div>

        {/* Right Side (Optional Image or Illustration) */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <img
            src={aboutImg}
            alt="Who We Are"
            className="rounded-2xl shadow-lg w-full max-w-lg h-110 object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
