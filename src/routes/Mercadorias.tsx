import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchMercadorias } from "../services/api";
import Mercadoria from "../components/Mercadoria/Mercadoria";
import Spinner from "../components/Spinner/Spinner";
import ErrorMessage from "../components/ErrorLoading/ErrorLoading";
import Button from "../components/Button";
import { Link } from "react-router-dom";
type Props = {};

const Mercadorias = (props: Props) => {
  const queryClient = useQueryClient();
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["mercadorias"],
    queryFn: fetchMercadorias,
  });

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorMessage error={error.message} />;

  return (
    <>
      <div className="container flex justify-evenly items-center pb-2">
        <div>Mercadorias cadastradas: {data?.length}</div>
        <Link to="/nova/mercadoria"><Button onClick={() => {}} text="Cadastrar mercadoria" /></Link>
      </div>

      <div className="container flex min-h-screen bg-gray-200 p-6 rounded-md">
        {data?.map((mercadoria) => (
          <div key={mercadoria.id}>
            <Mercadoria mercadoria={mercadoria} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Mercadorias;
