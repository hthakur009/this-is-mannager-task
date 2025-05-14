"use client"
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 px-4 mt-10 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 justify-between">
        
        {/* Description Section */}
        <div>
          <h1 className="text-2xl font-semibold mb-2">Welcome to Work Manager</h1>
          <p className="text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
          </p>
        </div>

        {/* Important Links Section */}
        <div>
          <h1 className="text-2xl font-semibold mb-2">Important Links</h1>
          <ul className="space-y-2">
            <li>
              <Link href="#?" className="text-gray-300 hover:text-white">Facebook</Link>
            </li>
            <li>
              <Link href="#?" className="text-gray-300 hover:text-white">Telegram</Link>
            </li>
            <li>
              <Link href="#?" className="text-gray-300 hover:text-white">YouTube</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
