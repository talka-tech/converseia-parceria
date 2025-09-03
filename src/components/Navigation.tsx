import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  const menuItems = [
    { label: "Início", href: "https://www.converseia.com/" },
    { label: "Sobre", href: "https://www.converseia.com/#sobre" },
    { label: "Recursos", href: "https://www.converseia.com/#recursos" },
    { label: "Planos", href: "https://www.converseia.com/#planos" },
    { label: "Documentação", href: "https://converseia.gitbook.io/converseia-docs" },
    { label: "Login", href: "/parceria/login", isInternal: true }
  ];

  // Motion: reduz e arredonda ao scroll
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`w-full bg-[#101828]/90 shadow-lg backdrop-blur-md text-white fixed top-0 left-0 z-50 transition-all duration-300
        ${scrolled ? "h-12 rounded-2xl mx-2 mt-2" : "h-12 rounded-none mx-0 mt-0"}
        flex items-center`}
    >
      <div className={`container mx-auto flex justify-center transition-all duration-300 ${scrolled ? "px-2" : "px-8"}`}>
        <ul className="flex gap-10">
          {menuItems.map((item, index) => (
            <li key={index}>
              {item.isInternal ? (
                <Link
                  to={item.href}
                  className="text-white text-base font-semibold px-4 py-2 rounded-md transition-colors duration-200 hover:bg-blue-600/80 hover:text-white focus:bg-blue-700/90 focus:text-white"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-base font-semibold px-4 py-2 rounded-md transition-colors duration-200 hover:bg-blue-600/80 hover:text-white focus:bg-blue-700/90 focus:text-white"
                >
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;

