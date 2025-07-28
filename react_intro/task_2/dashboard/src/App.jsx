import logo from './assets/holberton-logo.jpg';
import './App.css';
import { getCurrentYear, getFooterCopy } from './utils';
import Notifications from './Notifications';

function App() {

  return (
    <>
      <div className="root-notifications">
        <Notifications />
      </div>

      <div className="App-header">
        <img src={logo} alt="holberton logo" className="App-logo" />
        <h1>School dashboard</h1>
      </div>

      <div className="App-divider" />

      <div className="App-body">
        <p>Login to access the full dashboard</p>

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" />

        <button>OK</button>
      </div>

      <div className="App-footer">
        <div className="App-divider" />
        <p>Copyright {getCurrentYear()} - {getFooterCopy(true)}</p>
      </div>
    </>
  );
}

export default App;
