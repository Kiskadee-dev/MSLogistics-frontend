import React from "react";
import { deleteOperacao, IOperacao } from "../../services/api";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
  operacao: IOperacao;
}
const Operacao = ({ operacao }: Props) => {
  const queryClient = useQueryClient();
  const mutationDelete = useMutation({
    mutationFn: deleteOperacao,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["operacoes"] });
      alert("Sucesso!");
      navigate("/operacoes/");
    },
  });
  const navigate = useNavigate();
  return (
    <div
      //   role="button"
      //   onClick={() => navigate(`${operacao.id}`)}
      className="bg-gray-100 border border-gray-300 rounded-lg p-4 shadow-sm mb-4 transition-colors delay-75 hover:border-cyan-600"
    >
      <p className="text-gray-800 font-semibold">Quantia:</p>
      <p className="text-gray-600 mb-2">{operacao.quantia}</p>
      <p className="text-gray-800 font-semibold">Data e hora:</p>
      <p className="text-gray-600 mb-2">{operacao.data_e_hora}</p>
      <p className="text-gray-800 font-semibold">Local:</p>
      <p className="text-gray-600 mb-2">{operacao.local}</p>
      <p className="text-gray-800 font-semibold">Mercadoria:</p>
      <p className="text-gray-600 mb-2">{operacao.mercadoria.nome}</p>
      <Button
        className="min-w-20 max-w-36 mt-4 ml-2 bg-red-600 hover:bg-red-700"
        onClick={() => {
          mutationDelete.mutate({ id: operacao.id });
        }}
      >
        Deletar operação
      </Button>
    </div>
  );
};

export default Operacao;
