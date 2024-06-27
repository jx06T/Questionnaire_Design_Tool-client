import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 p-4 text-white mt-auto">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Questionnaire Design Tool （JXQDT）. All rights reserved.</p>
        <nav>
          <ul className="flex justify-center space-x-4 mt-2">
            <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
            <li><a href="/contact" className="hover:underline">Contact Us</a></li>
            <li><a href="/users" className="hover:underline">Users</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
