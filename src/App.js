import './App.css';
import NavigationBar from './component/NavigationBar';
import Footer from './component/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Edit from './pages/Edit';
import Login from './pages/Login';
import Daftar from './pages/DaftarBarang';
import { BrowserRouter,Switch,Route} from "react-router-dom"
import Register from './pages/Register';
import Cart from './pages/Cart';
function App() {
  return (
    <div className="App">
      <NavigationBar />
      <BrowserRouter>
      <main>
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/edit/:id" component={Edit} exact/>
          <Route path="/login" component={Login} exact/>
          <Route path="/daftar" component={Daftar} exact/>
          <Route path="/register" component={Register} exact/>
          <Route path="/cart" component={Cart} exact/>
        </Switch>
      </main>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
