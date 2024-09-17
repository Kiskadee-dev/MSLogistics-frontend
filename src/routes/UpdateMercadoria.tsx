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
      Editando Mercadoria: {Id}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="container flex flex-col">
          <input
            className={`${formCss} mt-2`}
            placeholder={data.nome}
            {...register("nome", { required: true })}
          />
          {errors.nome && <ErrorMessage>Este campo é necessário</ErrorMessage>}

          <input
            placeholder={data.numero_registro}
            type="number"
            className={`${formCss} mt-2`}
            {...register("numeroRegistro", { required: true })}
          />

          {errors.numeroRegistro && (
            <ErrorMessage>Este campo é necessário</ErrorMessage>
          )}

          <select
            className={`${formCss} mt-2`}
            {...register("fabricante", { required: true })}
          >
            <option value={data.fabricante.id}>{data.fabricante.nome}</option>
            {fabricantes.data?.map((fab) => (
              <option key={fab.id} value={fab.id}>
                {fab.nome}
              </option>
            ))}
          </select>
          {errors.fabricante && (
            <ErrorMessage>Este campo é necessário</ErrorMessage>
          )}

          <select
            className={`${formCss} mt-2`}
            {...register("tipo", { required: true })}
          >
            <option value={data.tipo.id}>{data.tipo.nome}</option>
            {tipos.data?.map((tip) => (
              <option key={tip.id} value={tip.id}>
                {tip.nome}
              </option>
            ))}
          </select>
          {errors.tipo && <ErrorMessage>Este campo é necessário</ErrorMessage>}

          <input
            placeholder={data.descricao}
            type="text"
            className={`${formCss} mt-2 min-h-40`}
            {...register("descricao", { required: true })}
          />
          {errors.descricao && (
            <ErrorMessage>Este campo é necessário</ErrorMessage>
          )}

          <div className="flex flex-row">
            <Button
              className="min-w-20 max-w-36 mt-4"
              onClick={() => {}}
              type="submit"
            >
              Atualizar mercadoria
            </Button>
            <Button
              className="min-w-20 max-w-36 mt-4 ml-2 bg-red-600 hover:bg-red-700"
              onClick={() => {
                mutationDelete.mutate({ id: Id });
              }}
            >
              Deletar mercadoria
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateMercadoria;
