import logo from './logo.svg';
import './App.css';
import { Route , Routes } from 'react-router';
//components
import Navbar from './components/Navbar';//pages
import Home from './pages/Home';
import Signin from './pages/Signin';
import Account from './pages/Account';
import { AuthContextProvider } from './context/AuthContext';
import Protected from './components/Protected';
import { ParallaxProvider } from 'react-scroll-parallax';




function App() {
  
  return (
    <div className="App">
      <ParallaxProvider>
      <AuthContextProvider>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/SignIn' element={<Signin />} />
        <Route path='/Account' element={<Protected><Account /></Protected> } />
      </Routes>
      </AuthContextProvider>
      </ParallaxProvider>
    </div>
  );
}

export default App;
//changed