import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import {
  createMercadoria,
  fetchFabricantes,
  fetchTiposMercadoria,
} from "../services/api";
import Spinner from "../components/Spinner/Spinner";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import formCss from "../components/Forms/Input";

interface IInputs {
  nome: string;
  fabricante: number;
  descricao: string;
  tipo: number;
  numeroRegistro: number;
}
type Props = {};

const CadastroMercadoria = (props: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IInputs>();

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

  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: createMercadoria,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mercadorias"] });
      alert("Sucesso!");
      navigate("/mercadoria/");
    },
  });
  const onSubmit: SubmitHandler<IInputs> = (data) =>
    mutation.mutate({
      nome: data.nome,
      descricao: data.descricao,
      fabricante: data.fabricante,
      numero_registro: data.numeroRegistro,
      tipo: data.tipo,
    });

  const [fabricantes, tipos] = results;

  if (fabricantes.isLoading || tipos.isLoading) return <Spinner />;

  return (
    <div>
      <h1>Cadastro de Mercadoria</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="container flex flex-col">
          <input
            className={`${formCss} mt-2`}
            placeholder="Nome da mercadoria"
            {...register("nome", { required: true })}
          />
          {errors.nome && <ErrorMessage>Este campo é necessário</ErrorMessage>}

          <input
            placeholder="Número de registro"
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
            <option value="">Selecione o fabricante</option>
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
            <option value="">Selecione o tipo</option>
            {tipos.data?.map((tip) => (
              <option key={tip.id} value={tip.id}>
                {tip.nome}
              </option>
            ))}
          </select>
          {errors.tipo && <ErrorMessage>Este campo é necessário</ErrorMessage>}

          <input
            placeholder="Insira a descrição da mercadoria"
            type="text"
            className={`${formCss} mt-2 min-h-40`}
            {...register("descricao", { required: true })}
          />
          {errors.descricao && (
            <ErrorMessage>Este campo é necessário</ErrorMessage>
          )}
          <Button
            className="min-w-20 max-w-36 mt-4"
            onClick={() => {}}
            type="submit"
          >
            Criar mercadoria
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CadastroMercadoria;
