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
  numero_registro: number;
  descricao: string;
  tipo: ITipo;
  fabricante: IFabricante | number;
  criado_por: ICriadoPor;
  criado_em: string;
}

export function fetchMercadorias(): Promise<IMercadoria[]> {
  return fetch("http://localhost:5000/mercadoria/").then((response) => {
    if (!response.ok) throw new Error("Network response was not ok");
    return response.json();
  });
}

export function fetchMercadoria(Id: number): Promise<IMercadoria[]> {
  return fetch(`http://localhost:5000/mercadoria/${Id}`).then((response) => {
    if (!response.ok) throw new Error("Network response was not ok");
    return response.json();
  });
}
export function fetchFabricantes(): Promise<IFabricante[]> {
  return fetch("http://localhost:5000/fabricante/").then((response) => {
    if (!response.ok) throw new Error("Network response was not ok");
    return response.json();
  });
}

export function fetchTiposMercadoria(): Promise<ITipo[]> {
  return fetch("http://localhost:5000/mercadoria/tipos/").then((response) => {
    if (!response.ok) throw new Error("Network response was not ok");
    return response.json();
  });
}

interface IPMercadoria {
  nome: string;
  numero_registro: number;
  descricao: string;
  tipo: number;
  fabricante: number;
}

export async function createMercadoria(
  novaMercadoria: IPMercadoria
): Promise<boolean> {
  const formData = new FormData();
  formData.append("nome", novaMercadoria.nome);
  formData.append("numero_registro", novaMercadoria.numero_registro.toString());
  formData.append("descricao", novaMercadoria.descricao);
  formData.append("tipo", novaMercadoria.tipo.toString());
  formData.append("fabricante", novaMercadoria.fabricante.toString());
  try {
    const response = await fetch("http://localhost:5000/mercadoria", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return true;
  } catch (error) {
    console.error("Failed to create mercadoria: ", error);
    throw error;
  }
}

interface IUMercadoria {
  id: number;
  nome: string;
  numero_registro: number;
  descricao: string;
  tipo: number;
  fabricante: number;
}

export async function updateMercadoria(
  patchMercadoria: IUMercadoria
): Promise<boolean> {
  const formData = new FormData();
  formData.append("id", patchMercadoria.id.toString());
  formData.append("nome", patchMercadoria.nome);
  formData.append(
    "numero_registro",
    patchMercadoria.numero_registro.toString()
  );
  formData.append("descricao", patchMercadoria.descricao);
  formData.append("tipo", patchMercadoria.tipo.toString());
  formData.append("fabricante", patchMercadoria.fabricante.toString());
  try {
    const response = await fetch(
      `http://localhost:5000/mercadoria/${patchMercadoria.id}`,
      {
        method: "PATCH",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return true;
  } catch (error) {
    console.error("Failed to patch mercadoria: ", error);
    throw error;
  }
}

interface IDeleteMercadoria {
  id: number;
}
export async function deleteMercadoria(
  del: IDeleteMercadoria
): Promise<boolean> {
  try {
    const response = await fetch(`http://localhost:5000/mercadoria/${del.id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return true;
  } catch (error) {
    console.error("Failed to patch mercadoria: ", error);
    throw error;
  }
}

export interface IOperacao {
  id: number;
  mercadoria: number;
  quantia: number;
  tipo: number;
  data_e_hora: string;
  local: string;
}
export function fetchOperacoes(): Promise<IOperacao[]> {
  return fetch("http://localhost:5000/operacao/").then((response) => {
    if (!response.ok) throw new Error("Network response was not ok");
    return response.json();
  });
}

interface ICOperacao {
  mercadoria: number;
  quantia: number;
  tipo: number;
  data_e_hora: string;
  local: string;
}
export async function createOperacao(
  novaOperacao: ICOperacao
): Promise<boolean> {
  const formData = new FormData();
  formData.append("mercadoria", novaOperacao.mercadoria.toString());
  formData.append("quantia", novaOperacao.quantia.toString());
  formData.append("tipo_operacao", novaOperacao.tipo.toString());
  formData.append("data_e_hora", novaOperacao.data_e_hora.toString());
  formData.append("local", novaOperacao.local.toString());
  try {
    const response = await fetch("http://localhost:5000/operacao", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return true;
  } catch (error) {
    console.error("Failed to create operação: ", error);
    throw error;
  }
}

interface ITiposOperacoes {
  id: number;
  nome: string;
}
export function fetchTiposOperacao(): Promise<ITiposOperacoes[]> {
  return fetch("http://localhost:5000/operacao/tipos/").then((response) => {
    if (!response.ok) throw new Error("Network response was not ok");
    return response.json();
  });
}

interface IDeleteOperacao {
  id: number;
}
export async function deleteOperacao(del: IDeleteOperacao): Promise<boolean> {
  try {
    const response = await fetch(`http://localhost:5000/operacao/${del.id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return true;
  } catch (error) {
    console.error("Failed to patch mercadoria: ", error);
    throw error;
  }
}
