import { Link } from "react-router-dom";

const Navigation = () => {
  const menuItems = [
    { label: "Início", href: "https://www.converseia.com/" },
    { label: "Sobre", href: "https://www.converseia.com/" },
    { label: "Recursos", href: "https://www.converseia.com/" },
    { label: "Planos", href: "https://www.converseia.com/" },
    { label: "Documentação", href: "https://converseia.gitbook.io/converseia-docs" }
  ];

  return (
    <nav className="w-full bg-[#101828]/90 shadow-lg backdrop-blur-md text-white py-0 h-16 flex items-center fixed top-0 left-0 z-50">
      <div className="container mx-auto px-8 flex justify-center">
        <ul className="flex gap-10">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-base font-semibold px-4 py-2 rounded-md transition-colors duration-200 hover:bg-blue-600/80 hover:text-white focus:bg-blue-700/90 focus:text-white"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;

