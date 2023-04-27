import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  ThemeProvider,
  createTheme,
  PaletteMode,
  CssBaseline,
  Typography,
} from "@mui/material";
import { themeSettings } from "./theme";
import HomePage from "@/scenes/homePage";
import ProfilePage from "./scenes/profilePage";
import LoginPage from "@/scenes/loginPage/";
import { useSelector } from "react-redux";
import { StateInterface } from "./state/types";
import { useEffect, useMemo, useState } from "react";
import { useVerifyTokenQuery } from "./api";
import Navbar from "./scenes/navbar";

function App() {
  const mode = useSelector<StateInterface>(
    (state) => state.persistedReducer.mode
  ) as PaletteMode;
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const [isLogged, setIsLogged] = useState(false);
  const token = useSelector<StateInterface>(
    (state) => state.persistedReducer.token
  ) as string;
  const { data, isLoading } = useVerifyTokenQuery({
    skip: !token,
  });

  useEffect(() => {
    if (token) {
      const bool = data?.user !== null;
      setIsLogged(bool);
    } else setIsLogged(false);
  }, [token, data]);

  if (isLoading) return <Typography>Loading App..</Typography>;

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={isLogged ? <HomePage /> : <LoginPage />} />
            <Route
              path="/profile/:userId"
              element={isLogged ? <ProfilePage /> : <LoginPage />}
            />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
