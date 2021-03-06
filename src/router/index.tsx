import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";

import { Contexts } from '@contexts/index';

import theme from '../theme';

import { AuthRouter } from './auth.router';
import { GuestRouter } from './guest.router';

import { Home } from "@pages/Home";
import { Historico } from "@pages/Historico";
import { Perfil } from "@pages/Perfil";
import { Login } from "@pages/Login";

const Router = () => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Contexts>
        <Routes>
          <Route path="/" element={<AuthRouter component={Home} />} />
          <Route path="/historico" element={<AuthRouter component={Historico} />} />
          <Route path="/perfil" element={<AuthRouter component={Perfil} />} />
          <Route path="/login" element={<GuestRouter component={Login} />} />
        </Routes>
      </Contexts>
    </ThemeProvider>
  </BrowserRouter>
)

export default Router;