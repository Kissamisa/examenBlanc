import HomePage from './components/HomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import AdminDashboard from './components/Dashboard';
import ModifierVehicule from './components/ModifierVehicule';
import AjoutVehicule from './components/AjoutVehicule';


import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/modifier-vehicule/:id" element={<ModifierVehicule />} />
          <Route path="/ajouter-vehicule" element={<AjoutVehicule />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;