import React from "react";
import AppNavigator from "./src/AppNavigator";
import { AppProvider } from "./src/AppProvider";

export default function App() {
  return (
    <AppProvider>
      <AppNavigator />
    </AppProvider>

  );
}

