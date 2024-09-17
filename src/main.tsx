import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import App from "./App.tsx";
import "./index.css";
import { Header } from "components/header";
import ErrorPage from "./routes/ErrorPage.tsx";
import Mercadorias from "./routes/Mercadorias.tsx";
import CadastroMercadoria from "./routes/CadastroMercadoria.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "mercadoria/",
        element: <Mercadorias />,
      },
      {
        path: "nova/mercadoria",
        element: <CadastroMercadoria />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
