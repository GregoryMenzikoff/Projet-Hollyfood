import { BrowserRouter, Route, Routes } from "react-router-dom";

import PublicRouter from "../Router/PublicRouter";
import AdminRouter from "../Router/AdminRouter";

const App = () => {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<PublicRouter />}/>
          <Route path="/admin/*" element={<AdminRouter />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
