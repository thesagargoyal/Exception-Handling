import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import Store from "./store/index";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store = {Store}>
      <Login />
    </Provider>
  );
}

export default App;
