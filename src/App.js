import logo from './logo.svg';
import './App.css';
import { Route , Routes,  } from 'react-router';
//components
import Navbar from './components/Navbar';//pages
import Home from './pages/Home';
import Signin from './pages/Signin';
import Account from './pages/Account';
import { AuthContextProvider } from './context/AuthContext';
import Protected from './components/Protected';
import { Blog } from './Blog/BlogList';
import BlogDetails from './Blog/BlogDetails';
import ShareCharacter from "./components/ShareCharacter";



function App() {
  
  return (
    <div className="App">
      
      <AuthContextProvider>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/blogDetails/:id" element={<BlogDetails />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/*' element={<Home />} />
        <Route path='/SignIn' element={<Signin />} />
        <Route path='/Account' element={<Protected><Account /></Protected> } />
        <Route path="/share/:token" element={<ShareCharacter />} />
      </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
//changed