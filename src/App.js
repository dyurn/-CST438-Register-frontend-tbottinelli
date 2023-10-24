// App.js
import './App.css';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import StudentHome from './components/StudentHome';
import AdminHome from './components/AdminHome';
import ShowSchedule from './components/ShowSchedule';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <h2>Registration Service</h2>
      <BrowserRouter>
        <div>
          <nav>
            <Link to="/">Student</Link> |
            <Link to="/admin">Admin</Link> |
            <Link to="/login">Login</Link>  
          </nav>
          <Switch>
            <Route exact path="/" component={StudentHome} />
            <Route path="/schedule" component={ShowSchedule} />
            <Route path="/admin" component={AdminHome} />
            <Route path="/login" component={Login} /> 
            <Route render={() => <h1>Page not found</h1>} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
