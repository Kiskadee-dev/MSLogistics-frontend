import { useQueryClient } from "@tanstack/react-query";

export interface ICriadoPor {
  id: number;
  nome: string;
  email: string;
}

export interface ITipo {
  id: number;
  nome: string;
  criado_em: string;
  criado_por: ICriadoPor;
}

export interface IFabricante {
  id: number;
  nome: string;
  criado_em: string;
  criado_por: ICriadoPor;
}

export interface IMercadoria {
  id: number;
  nome: string;
  numero_registro: string;
  descricao: string;
  tipo: ITipo;
  fabricante: IFabricante;
  criado_por: ICriadoPor;
  criado_em: string;
}

export function fetchMercadorias(): Promise<IMercadoria[]> {
  return fetch("http://localhost:5000/mercadoria/").then((response) => {
    if (!response.ok) throw new Error("Network response was not ok");
    return response.json();
  });
}
