
import './App.css';
import Nav from './components/Nav';
import {BrowserRouter , Routes, Route} from 'react-router-dom';
import Footer from './components/footer';
import SignUp from './components/SignUp';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateProduct';
import Sellers from './components/Sellers';
import AddSeller from './components/AddSeller';
import UpdateSeller from './components/UpdateSeller';
import Profile from './components/Profile';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav />
      <Routes>
      
      <Route element={<PrivateComponent />}>
        <Route path="/" element={<ProductList/>}/>
        <Route path="/sellers" element={<Sellers/>}/>
        <Route path="/addseller" element={<AddSeller/>}/>
        <Route path="/add" element={<h1><AddProduct/></h1>}/>
        <Route path="/update/:id" element={<h1><UpdateProduct/></h1>}/>
        <Route path="/updateseller/:id" element={<h1><UpdateSeller/></h1>}/>
        <Route path="/logout" element={<h1>Logout components</h1>}/>
        <Route path="/profile/:id" element={<h1><Profile/></h1>}/>
        </Route>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
