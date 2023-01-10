import React, { useState, useEffect } from 'react';

const ChocolateNavButton = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".chocolate-nav-button") && !event.target.closest(".menu")) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <>
      <button
        className="chocolate-nav-button"
        onClick={() => setMenuOpen(!isMenuOpen)}
      >
        <div className="chocolate-bar chocolate-bar-1"></div>
        <div className="chocolate-bar chocolate-bar-2"></div>
        <div className="chocolate-bar chocolate-bar-3"></div>
      </button>

      {isMenuOpen && (
        <div className="menu">
          {/* menu items */}
        </div>
      )}
    </>
  );
}

export default ChocolateNavButton;
