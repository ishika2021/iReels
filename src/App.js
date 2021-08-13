import logo from './logo.svg';
import './App.css';
import Signup from './Components/Signup';

import Main from './Components/Main';
import Login from './Components/Login';
import AuthProvider, { AuthContext } from './Context/AuthProvider';
function App() {
  return (
   <AuthProvider>
    <Main/>

   </AuthProvider>
  
  // <Logo/>
  
  );
}

export default App;
