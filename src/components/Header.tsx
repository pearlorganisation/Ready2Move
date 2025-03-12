import Image from "next/image";
import logo from "../assets/logo.png";
import Link from "next/link";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <nav className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-3">
          <Image src={logo} className="h-8" alt="Ready2Move Logo" width={32} height={32} />
          <span className="text-xl font-bold text-gray-900">Ready2Move</span>
        </Link>
        <input type="checkbox" id="menu-toggle" className="hidden peer" />
        <label htmlFor="menu-toggle" className="lg:hidden p-2 text-gray-900 hover:bg-gray-200 rounded-lg cursor-pointer">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </label>
        <div className="absolute top-16 left-0 w-full bg-white shadow-md p-4 hidden peer-checked:block  lg:flex lg:w-auto lg:relative lg:top-0 lg:bg-transparent lg:shadow-none md:space-x-6">
          <Link href="/about" className="block py-2 px-4 font-semibold text-gray-900 hover:text-blue-700">About Us</Link>
          <Link href="/projects" className="block py-2 px-4 font-semibold text-gray-900 hover:text-blue-700">Projects</Link>
          <Link href="properties" className="block py-2 px-4 font-semibold text-gray-900 hover:text-blue-700">Properties</Link>
          <Link href="/login" className="block py-2 px-4 font-semibold text-gray-900 hover:text-blue-700">Login</Link>
          <button className="bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-800 transition w-full md:w-auto">
            Create Listing
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;