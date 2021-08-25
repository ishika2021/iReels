import './App.css';
import Feed from './Components/Feed';
import Main from './Components/Main';
import AuthProvider from './Context/AuthProvider';
import PrivateRoute from './Components/PrivateRoute';
import Profile from './Components/Profile';
import Chat from './Components/Chat';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path='/' component={Feed} />
          <PrivateRoute exact path='/profile' component={Profile} />
          <PrivateRoute exact path='/chat' component={Chat} />
          <Route path='/main' component={Main} />
    

        </Switch>
      </AuthProvider>
    </Router>

  );
}

export default App;
