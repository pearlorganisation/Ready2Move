"use client";

const AboutUs = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">About Us</h1>

      <p className="text-gray-700 mb-4 text-lg leading-relaxed">
        Welcome to{" "}
        <span className="font-semibold text-blue-600">YourPropertyHub</span> —
        your trusted partner in finding the perfect home, investment property,
        or dream location. We specialize in connecting buyers and sellers
        through a seamless and transparent real estate experience.
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
        Who We Are
      </h2>
      <p className="text-gray-700 mb-4 leading-relaxed">
        With a passion for property and a commitment to service, we are a team
        of real estate professionals dedicated to simplifying the buying and
        selling process. Whether you're searching for a cozy apartment, a
        luxurious villa, or a commercial space, we’re here to help you every
        step of the way.
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
        What We Offer
      </h2>
      <ul className="list-disc list-inside text-gray-700 mb-4 leading-relaxed">
        <li>Verified property listings with complete details and images</li>
        <li>Smart search filters to help you find exactly what you need</li>
        <li>
          Professional support for site visits, legal advice, and documentation
        </li>
        <li>Affordable housing to premium real estate solutions</li>
      </ul>

      <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
        Why Choose Us?
      </h2>
      <p className="text-gray-700 mb-4 leading-relaxed">
        At <span className="font-semibold text-blue-600">YourPropertyHub</span>,
        we believe real estate is not just about buildings — it's about people,
        dreams, and futures. We prioritize honesty, reliability, and customer
        satisfaction above all else.
      </p>

      <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
        Get in Touch
      </h2>
      <p className="text-gray-700 leading-relaxed">
        Have questions? Looking for something specific? Our team is just a call
        or click away.
        <br />
        <span className="font-medium">📞 Phone:</span> +91-9876543210
        <br />
        <span className="font-medium">📧 Email:</span>{" "}
        support@yourpropertyhub.com
      </p>
    </div>
  );
};

export default AboutUs;
