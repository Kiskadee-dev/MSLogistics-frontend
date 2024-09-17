import React from "react";
import ErrorMessage from "../components/ErrorMessage/ErrorMessage";
import Button from "../components/Button";
import formCss from "../components/Forms/Input";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import {
  createOperacao,
  fetchMercadorias,
  fetchTiposOperacao,
} from "../services/api";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import Spinner from "../components/Spinner/Spinner";
import ErrorLoading from "../components/ErrorLoading/ErrorLoading";

type Props = {};

interface IInputs {
  mercadoria: number;
  quantia: number;
  tipo: number;
  data_e_hora: string;
  local: string;
}

const CadastroOperacao = (props: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IInputs>();

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: createOperacao,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mercadorias"] });
      alert("Sucesso!");
      navigate("/operacoes/");
    },
    onError: () => {
      alert("Some error occurred!");
    },
  });

  const response = useQueries({
    queries: [
      {
        queryKey: ["mercadorias"],
        queryFn: fetchMercadorias,
      },
      {
        queryKey: ["tipos_de_operacoes"],
        queryFn: fetchTiposOperacao,
      },
    ],
  });
  const [mercadorias, tipos_operacoes] = response;
  const onSubmit: SubmitHandler<IInputs> = (data) => {
    console.log(data);
    mutation.mutate({
      mercadoria: data.mercadoria,
      quantia: data.quantia,
      tipo: data.tipo,
      data_e_hora: data.data_e_hora,
      local: data.local,
    });
  };

  if (mercadorias.isLoading || tipos_operacoes.isLoading) return <Spinner />;
  if (mercadorias.isError || tipos_operacoes.isError)
    return <ErrorLoading error={"Error loading..."} />;

  return (
    <div>
      <h1>Cadastro de nova operação de entrada e saída</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="container flex flex-col">
          <input
            className={`${formCss} mt-2`}
            placeholder="Quantia"
            type="number"
            {...register("quantia", { required: true })}
          />
          {errors.quantia && (
            <ErrorMessage>Este campo é necessário</ErrorMessage>
          )}

          <input
            placeholder="Data e hora"
            type="datetime-local"
            className={`${formCss} mt-2`}
            {...register("data_e_hora", { required: true })}
          />

          {errors.data_e_hora && (
            <ErrorMessage>Este campo é necessário</ErrorMessage>
          )}

          <select
            className={`${formCss} mt-2`}
            {...register("mercadoria", { required: true })}
          >
            <option value="">Selecione a mercadoria</option>
            {mercadorias.data?.map((merc) => (
              <option key={merc.id} value={merc.id}>
                {merc.nome}
              </option>
            ))}
          </select>
          {errors.mercadoria && (
            <ErrorMessage>Este campo é necessário</ErrorMessage>
          )}

          <select
            className={`${formCss} mt-2`}
            {...register("tipo", { required: true })}
          >
            <option value="">Selecione o tipo de entrada</option>
            {tipos_operacoes.data?.map((tip) => (
              <option key={tip.id} value={tip.id}>
                {tip.nome}
              </option>
            ))}
          </select>
          {errors.tipo && <ErrorMessage>Este campo é necessário</ErrorMessage>}
          <input
            className={`${formCss} mt-2`}
            placeholder="Local"
            {...register("local", { required: true })}
          />
          {errors.local && <ErrorMessage>Este campo é necessário</ErrorMessage>}
          <Button
            className="min-w-20 max-w-36 mt-4 ml-auto mr-auto"
            onClick={() => {}}
            type="submit"
          >
            Criar Operação
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CadastroOperacao;
