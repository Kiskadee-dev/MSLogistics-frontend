import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchMercadorias } from "../services/api";
type Props = {};

const Mercadorias = (props: Props) => {
  const queryClient = useQueryClient();
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["mercadorias"],
    queryFn: fetchMercadorias,
  });

  if (isLoading) return <span>Loading...</span>;
  if (isError) return <span>Error: {error.message}</span>;

  return (
    <>
      <div className="container flex justify-evenly">
        <div>Mercadorias cadastradas: {data?.length}</div>
        <button className="bg-gray-600 rounded-sm text-white p-2">
          Cadastrar nova mercadoria
        </button>
      </div>

      <ul>
        {data?.map((mercadoria) => (
          <li key={mercadoria.id} className="bg-white">
            <p>Nome: {mercadoria.nome}</p>
            <p>Descrição: {mercadoria.descricao}</p>
            <p>Número de registro: {mercadoria.numero_registro}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Mercadorias;
