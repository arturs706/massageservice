import React, { useEffect } from 'react';

const Modal = ({ isOpen, setIsOpen, children }) => {
  useEffect(() => {
    const modal = document.querySelector('.modal');
    const handleClick = (e) => {
      if (e.target === modal) {
        setIsOpen(false);
      }
    };

    modal.addEventListener('click', handleClick);

    return () => {
      modal.removeEventListener('click', handleClick);
    };
  }, [setIsOpen]);

  return (
    <div className={`modal ${isOpen ? 'is-open' : 'is-closed'}`}>
      <div className="modal-content">        
        {children}
      </div>
    </div>
  );
};

export default Modal;