import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Register from './components/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes,Route} from "react-router-dom"
import TokenGen from './components/TokenGen';


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/tokenGen' element={<TokenGen />} />

      </Routes>
      
    </>
  );
}

export default App;
