import { Stack, Button, Snackbar, Alert } from "@mui/material";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";

interface SnackbarContextData {
  addSnack: (
    content: string,
    type?: AlertType,
    vertical?: VerticalPosition,
    horizontal?: HorizontalPosition
  ) => void;
}

interface ContextProps {
  children: ReactNode;
}

type AlertType = "warning" | "info" | "success" | "error";
type VerticalPosition = "top" | "bottom";
type HorizontalPosition = "left" | "right" | "center";

const SnackbarContext = createContext({} as SnackbarContextData);
const SnackbarProvider = ({ children }: ContextProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<AlertType>("error");
  const [verticalPosition, setVerticalPosition] = useState<VerticalPosition>("top");
  const [horizontalPosition, setHorizontalPosition] = useState<HorizontalPosition>("center");
  const [snackContent, setSnackContent] = useState<string>();

  const addSnack = useCallback((
    content: string,
    type: AlertType ="error",
    vertical: VerticalPosition = "top",
    horizontal: HorizontalPosition = "center"
  ) => {
    setAlertType(type);
    setVerticalPosition(vertical);
    setHorizontalPosition(horizontal);
    setSnackContent(content);
    setOpen(true);
  }, [setOpen, setAlertType, setSnackContent])

  return (
    <SnackbarContext.Provider 
      value={{
        addSnack
      }}
    >
      {children}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: verticalPosition, horizontal: horizontalPosition }}
      >
        <Alert severity={alertType}>{snackContent}</Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  )
}

function useSnackbar(): SnackbarContextData {
  const context = useContext(SnackbarContext);
  return context;
}
export { SnackbarProvider, useSnackbar }