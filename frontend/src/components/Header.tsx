import React from 'react';

interface HeaderProps {
  taskName: string;
}

const Header: React.FC<HeaderProps> = ({ taskName }) => {
  return (
    <header className="header">
      <div className="task-name">{taskName}</div>
      {/* Add hamburger menu later if needed */}
    </header>
  );
};

export default Header;
