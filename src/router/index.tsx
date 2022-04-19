import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";

import { Contexts } from '@contexts/index';

import theme from '../theme';

import { Home } from "@pages/Home";
import { Login } from "@pages/Login";

const Router = () => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Contexts>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Contexts>
    </ThemeProvider>
  </BrowserRouter>
)

export default Router;