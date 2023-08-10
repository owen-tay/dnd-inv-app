import logo from './logo.svg';
import './App.css';
import { Route , Routes } from 'react-router';
//components
import Navbar from './components/Navbar.jsx';
//pages
import Home from './pages/Home';
import Signin from './pages/Signin';
import Account from './pages/Account';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/SignIn' element={<Signin />} />
        <Route path='/Account' element={<Account />} />
      </Routes>
    </div>
  );
}

export default App;
