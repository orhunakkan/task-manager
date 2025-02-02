import React, { useState } from 'react';

export const MouseOver: React.FC = () => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const links = [
    {
      id: 1,
      name: 'Selenium',
      icon: '🌟',
      description: 'The most widely-used testing framework',
    },
    {
      id: 2,
      name: 'Cypress',
      icon: '⚡',
      description: 'Modern web testing framework',
    },
    {
      id: 3,
      name: 'Playwright',
      icon: '🎭',
      description: 'Reliable end-to-end testing',
    },
  ];

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 dark:text-dark-heading">
        Mouse Over
      </h2>
      <div className="flex justify-center space-x-12">
        {links.map((link) => (
          <div
            key={link.id}
            className="relative"
            data-testid={`mouse-over-${link.id}`}
          >
            <a
              href="#"
              className="text-blue-500 hover:text-blue-700 flex flex-col items-center"
              onMouseOver={() => setHoveredLink(`Link ${link.id}`)}
              onMouseOut={() => setHoveredLink(null)}
              onClick={(e) => e.preventDefault()}
            >
              <span className="text-3xl mb-2">{link.icon}</span>
              <span>{link.name}</span>
            </a>
            {hoveredLink === `Link ${link.id}` && (
              <div
                className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-4 py-2 bg-black text-white text-sm rounded shadow-lg whitespace-nowrap"
                data-testid={`mouse-over-tooltip-${link.id}`}
              >
                {link.description}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
