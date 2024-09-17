import React from "react";
import { deleteMercadoria, IMercadoria } from "../../services/api";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
  mercadoria: IMercadoria;
}
const Mercadoria = ({ mercadoria }: Props) => {
  const queryClient = useQueryClient();
  const mutationDelete = useMutation({
    mutationFn: deleteMercadoria,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mercadorias"] });
      alert("Sucesso!");
      navigate("/mercadoria/");
    },
  });
  const navigate = useNavigate();
  return (
    <div
      // role="button"
      // onClick={() => navigate(`${mercadoria.id}`)}
      className="bg-gray-100 border border-gray-300 rounded-lg p-4 shadow-sm mb-4 transition-colors delay-75 hover:border-cyan-600"
    >
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
      <p className="text-gray-800 font-semibold">Data de criação:</p>
      <p className="text-gray-600">{mercadoria.criado_em}</p>
      <Button
        className="min-w-20 max-w-36 mt-4 ml-2 bg-red-600 hover:bg-red-700"
        onClick={() => {
          mutationDelete.mutate({ id: mercadoria.id });
        }}
      >
        Deletar mercadoria
      </Button>
    </div>
  );
};

export default Mercadoria;
