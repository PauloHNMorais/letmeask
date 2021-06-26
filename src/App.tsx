import React from "react";
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";

import { Route, BrowserRouter, Switch } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { Room } from "./pages/Room";
import { AdminRoom } from "./pages/AdminRoom";
import { Toaster } from "react-hot-toast";

import moment from "moment";
import "moment/locale/pt-br";
import { useTheme } from "./hooks/useTheme";
import { useEffect } from "react";
moment.locale("pt-br");

function App() {
  const { theme } = useTheme();

  return (
    <div className="App">
      <div>
        <AuthProvider>
          <BrowserRouter>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/rooms/new" exact component={NewRoom} />
              <Route path="/rooms/:id" component={Room} />
              <Route path="/admin/rooms/:id" component={AdminRoom} />
            </Switch>
          </BrowserRouter>
          <Toaster />
        </AuthProvider>
      </div>
    </div>
  );
}

export default App;
