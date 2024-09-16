import React from "react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  let errorMessage: string | null = null;
  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText || error.data?.message || "Unknown error";
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div id="error-page">
      <h1>Unexpecte error.</h1>
      <p>An error has happened while handling your request.</p>
      <p>
        <i>{errorMessage}</i>
      </p>
    </div>
  );
};

export default ErrorPage;
