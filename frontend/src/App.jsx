import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";

function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<LoginPage />} />

        <Route
          path="/landing"
          element={<LandingPage />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;