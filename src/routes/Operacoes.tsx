import React from "react";
import Button from "../components/Button";
import { fetchOperacoes } from "../services/api";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/Spinner/Spinner";
import ErrorLoading from "../components/ErrorLoading/ErrorLoading";
import { Link } from "react-router-dom";

type Props = {};

const Operacoes = (props: Props) => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["mercadorias"],
    queryFn: fetchOperacoes,
  });

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorLoading />;

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-evenly">
        <h1>Operações:</h1>
        <Link to={"nova"}>
          <Button onClick={() => {}}>Criar nova operação</Button>
        </Link>
      </div>
      {data?.map((op) => (<div>...</div>))}
    </div>
  );
};

export default Operacoes;
