import React, {useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/layout/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './helpers/setAuthToken';

//run setAuthToken
if(localStorage.token){
  setAuthToken(localStorage.token);
}
const App = () => {

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  
  return (
    <Provider store={store}>
    <Router>
      <div className='App'>
        <Navbar />
        <Routes>
        <Route exact path = "/" element={ <Home /> } />
        </Routes>
        <section className='container'>
           <Routes>
            <Route exact path='/register' element={ <Register /> } />
            <Route exact path='/login' element={  <Login /> } />
          </Routes> 
        </section>
      </div>
    </Router>
    </Provider>
  );
}

export default App;

//Now, browser router is the router implementation for web browsers. Route, of course,
 //is a conditionally shown component based on matching a path to a URL. And Switch returns
 // only the first matching route rather than all matching routes.
 // React-Router has since released a breaking change (from v5 to v6). One of the things that got removed was the Switch component.
 // It should instead be replaced with Routes
//A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.