import './App.css'
import {
  Routes,
  Route,
} from "react-router-dom";
import ApplicationComponent from './components/ApplicationComponent';
import ApplicationStatus from './components/ApplicationStatus';

function App() {
  return (
    <Routes>
      <Route path="/" element={<ApplicationComponent/>} />
      <Route path="/application-status" element={<ApplicationStatus/>} />
    </Routes>
  )
}

export default App
