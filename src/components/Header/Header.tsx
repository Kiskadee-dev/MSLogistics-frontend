import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const Header = (props: Props) => {
  return (
    <div className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4 flex-wrap">
        <div className="text-2xl font-bold text-gray-600">MSLogistics</div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/mercadoria/"
                href="#"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Mercadorias
              </Link>
            </li>
            <li>
              <Link to={'operacoes/'}
                href="#"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Operações
              </Link>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/matheusvictori/"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Sobre
              </a>
            </li>
            <li>
              <a
                href="https://github.com/Kiskadee-dev"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Contato
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
