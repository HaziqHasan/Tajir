import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // ✅ React Query
import "./index.css";
import App from "./App.jsx";

// React Query client with caching disabled
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0, // always stale
      cacheTime: 0, // no caching
      refetchOnWindowFocus: true,
      retry: 1, // retry once on failure
    },
  },
});

createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain="dev-hr1xhzh1ny2q0mcb.us.auth0.com"
    clientId="AaZGZNFIJXVIYRRzevXH5XdxoR5Txgfv"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </Auth0Provider>
);
