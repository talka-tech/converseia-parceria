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
    <nav className="bg-gray-900 text-white py-3">
      <div className="container mx-auto px-6">
        <ul className="flex justify-center space-x-8">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition-colors duration-200 font-medium"
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

