import {ToastContainer} from 'react-toastify'
import { Routes, Route} from "react-router-dom";
import Landing from './components/Landing'

import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import AddPhone from './components/AddPhone';



function App() {
  return (
    <div className="App">
        <ToastContainer positon="top-center"/>
        <Routes>
      <Route path='/' element={<Landing/>} />
      <Route path='/addPhonebook' element={<AddPhone/>} />
      <Route path='/edit/:id' element={<AddPhone/>} />
    
      </Routes>
    </div>
  );
}

export default App;
