import { useQueryClient } from "@tanstack/react-query";

interface Mercadoria {
  id: number;
  nome: string;
  numero_registro: string;
  descricao: string;
  criado_por: number;
  criado_em: number;
}

export function fetchMercadorias(): Promise<Mercadoria[]> {
  return fetch("http://localhost:5000/mercadoria/").then((response) => {
    if (!response.ok) throw new Error("Network response was not ok");
    return response.json();
  });
}
