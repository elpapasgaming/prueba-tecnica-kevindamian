import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Form } from 'react-router-dom';
import Login from './pages/Login';
import Inicio from './pages/Inicio';
import Lista from './pages/Lista';
import Registro from './pages/Registro';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/inicio" element={<Inicio/>}/>
      <Route path="/form" element={<Form/>}/>
      <Route path="/lista" element={<Lista/>}/>
      <Route path="/registro/:id" element={<Registro/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
