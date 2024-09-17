import React from "react";
import Button from "../components/Button";
import { fetchOperacoes } from "../services/api";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/Spinner/Spinner";
import ErrorLoading from "../components/ErrorLoading/ErrorLoading";
import { Link } from "react-router-dom";
import Operacao from "../components/Operacao/Operacao";

type Props = {};

const Operacoes = (props: Props) => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["operacoes"],
    queryFn: fetchOperacoes,
  });

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorLoading error={error.message} />;

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-evenly items-center">
        <h1>Operações:</h1>
        <Link to={"nova"}>
          <Button onClick={() => {}}>Criar nova operação</Button>
        </Link>
      </div>

      <div className="mt-2">
        {data?.map((op) => (
          <Operacao key={op.id} operacao={op} />
        ))}
      </div>
    </div>
  );
};

export default Operacoes;
