import React from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import {
  deleteMercadoria,
  fetchFabricantes,
  fetchMercadoria,
  fetchTiposMercadoria,
  updateMercadoria,
} from "../services/api";
import Spinner from "../components/Spinner/Spinner";
import ErrorLoading from "../components/ErrorLoading/ErrorLoading";
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import formCss from "../components/Forms/Input";
import { useForm } from "react-hook-form";
import Button from "../components/Button";

interface Props {}
interface IInputs {
  nome: string;
  fabricante: number;
  descricao: string;
  tipo: number;
  numeroRegistro: number;
}
const UpdateMercadoria = (props: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IInputs>();

  const { Id } = useParams<{ Id: string }>();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["mercadoria"],
    queryFn: () => fetchMercadoria(Id),
  });

  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: updateMercadoria,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mercadorias"] });
      alert("Sucesso!");
      navigate("/mercadoria/");
    },
  });

  const mutationDelete = useMutation({
    mutationFn: deleteMercadoria,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mercadorias"] });
      alert("Sucesso!");
      navigate("/mercadoria/");
    },
  });

  const queryClient = useQueryClient();
  const results = useQueries({
    queries: [
      {
        queryKey: ["fabricantes"],
        queryFn: fetchFabricantes,
      },
      {
        queryKey: ["tipos"],
        queryFn: fetchTiposMercadoria,
      },
    ],
  });
  const [fabricantes, tipos] = results;

  if (fabricantes.isLoading || tipos.isLoading) return <Spinner />;

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorLoading error={error.message} />;

  const onSubmit: SubmitHandler<IInputs> = (data) =>
    mutation.mutate({
      id: Id,
      nome: data.nome,
      descricao: data.descricao,
      fabricante: data.fabricante,
      numero_registro: data.numeroRegistro,
      tipo: data.tipo,
    });

  return (
    <div>
      <h1>Mercadoria: {Id}</h1>

    </div>
  );
};

export default UpdateMercadoria;
