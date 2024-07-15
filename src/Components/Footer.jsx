import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {currentYear} Aditya. All rights reserved.
        </p>
        <p className="text-xs mt-2">
          "Empowering your digital journey."
        </p>
      </div>
    </footer>
  );
}

export default Footer;
