import React, { useState } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import GlobalStyles from "./styles/GlobalStyles";
import { QueryClient, QueryClientProvider } from "react-query";
import ProtectedRoute from "./components/ui/ProtectedRoute";
import AppLayout from "./components/ui/AppLayout";
import styled from "styled-components";
import Song from "./components/songs/Song";
import { NextUIProvider } from "@nextui-org/system";
import {
  Emozioni,
  Home,
  Informazioni,
  Login,
  Playlist,
  Registrazione,
} from "./components";
import Playlists from "./components/playlist/Playlists";
import PlaylistSingola from "./components/playlist/PlaylistSingola";

export const Context = React.createContext();

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const App = () => {
  const [session, setSession] = useState({
    username: "",
    password: "",
    isLoggedIn: false,
  });

  const [commenti, setCommenti] = useState([]);

  const contextValue = {
    session,
    setSession,
    commenti,
    setCommenti,
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Context.Provider value={contextValue}>
        <GlobalStyles />
        <BrowserRouter>
          <AppLayout>
            <Routes>
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Home />} />
                <Route path="/emozioni" element={<Emozioni />} />
                <Route path="/playlists" element={<Playlists />} />
                <Route
                  path="playlists/:playlistId"
                  element={<PlaylistSingola />}
                />
              </Route>
              <Route path="songs/:songId" element={<Song />} />
              <Route path="/informazioni" element={<Informazioni />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registrazione" element={<Registrazione />} />
            </Routes>
          </AppLayout>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </Context.Provider>
    </QueryClientProvider>
  );
};

export default App;
