import React from "react";
import { IMercadoria } from "../../services/api";

interface Props {
  mercadoria: IMercadoria;
}

const Mercadoria = ({ mercadoria }: Props) => {
  return (
    <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 shadow-sm mb-4">
      <p className="text-gray-800 font-semibold">Nome:</p>
      <p className="text-gray-600 mb-2">{mercadoria.nome}</p>
      <p className="text-gray-800 font-semibold">Fabricante:</p>
      <p className="text-gray-600 mb-2">{mercadoria.fabricante.nome}</p>
      <p className="text-gray-800 font-semibold">Descrição:</p>
      <p className="text-gray-600 mb-2">{mercadoria.descricao}</p>
      <p className="text-gray-800 font-semibold">Tipo:</p>
      <p className="text-gray-600 mb-2">{mercadoria.tipo.nome}</p>
      <p className="text-gray-800 font-semibold">Número de registro:</p>
      <p className="text-gray-600">{mercadoria.numero_registro}</p>
    </div>
  );
};

export default Mercadoria;
