"use client";
import banner from "../../assets/heroimg.png";

const AboutUs = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section
        className="relative w-full h-[60vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${banner.src})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            About Us
          </h1>
        </div>
      </section>

      {/* Company Overview */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-4">Who We Are</h2>
        <p className="text-gray-600 text-lg leading-relaxed">
          At ready2move , we’re passionate about creating lasting homes. For
          over a decade, we’ve helped individuals and families discover
          beautiful living spaces that match their dreams and lifestyle.
          <br />
          <br />
          We take pride in our transparency, commitment, and client-first
          approach—making real estate transactions simpler, smoother, and more
          rewarding.
        </p>
      </section>

      {/* Vision and Mission */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-2xl font-semibold mb-2">Our Mission</h3>
            <p className="text-gray-700 leading-relaxed">
              To redefine real estate by providing world-class services and
              simplifying property transactions for our clients.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-2">Our Vision</h3>
            <p className="text-gray-700 leading-relaxed">
              To be the most trusted and sought-after real estate brand
              globally, where dreams of owning property come true.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
