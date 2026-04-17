import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home-page";
import { CronogramaPage } from "./pages/cronograma-page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota principal */}
        <Route path="/" element={<Home />} />

        {/* Outras rotas */}

        <Route path="/cronograma" element={<CronogramaPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
