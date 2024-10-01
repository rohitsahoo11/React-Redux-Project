import './App.css';
import Create from './components/Create';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes } from "react-router-dom";
// import Read from "./components/Read";
// import Update from "./components/Update";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Create />
      </BrowserRouter>
    </div>
  );
}

export default App;
