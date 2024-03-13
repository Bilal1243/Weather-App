import './App.css';
import WeatherApp from './Components/WeatherApp/WeatherApp';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
        <WeatherApp></WeatherApp>
        <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
