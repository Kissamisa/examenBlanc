import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import AjoutVehicule from './AjoutVehicule';

const baseURI = import.meta.env.VITE_API_BASE_URL;

const AdminDashboard = () => {
  const [clientCount, setClientCount] = useState(0);
  const [vehicles, setVehicles] = useState([]);
  const [clients, setClients] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientCount = async () => {
      try {
        const response = await fetch(`${baseURI}api/clients/count`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setClientCount(data.count);
        } else {
          throw new Error('Erreur lors de la récupération du nombre de clients');
        }
      } catch (error) {
        alert(error.message);
        navigate('/');
      }
    };

    const fetchVehicles = async () => {
      try {
        const response = await fetch(`${baseURI}api/dashboard/vehicules`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Véhicules récupérés:', data); // Vérifiez les données ici
          setVehicles(data);
        } else {
          throw new Error('Erreur lors de la récupération des véhicules');
        }
      } catch (error) {
        alert(error.message);
      }
    };

    const fetchClients = async () => {
      try {
        const response = await fetch(`${baseURI}api/clients`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Clients récupérés:', data); // Vérifiez les données ici
          setClients(data);
        } else {
          throw new Error('Erreur lors de la récupération des clients');
        }
      } catch (error) {
        alert(error.message);
      }
    };

    fetchClientCount();
    fetchVehicles();
    fetchClients();
  }, [navigate, shouldRefresh]);

  const handleAjouter = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setShouldRefresh(true);
    navigate('/admin-dashboard');
  };

  const handleModifier = (id) => {
    navigate(`/modifier-vehicule/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      console.log(`Suppression du véhicule avec ID: ${id}`);
      const response = await fetch(`${baseURI}api/dashboard/vehicules/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (response.ok) {
        console.log('Véhicule supprimé avec succès');
        alert('Véhicule supprimé avec succès');
        setShouldRefresh(true);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la suppression du véhicule');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const getClientName = (clientId) => {
    console.log('Recherche du client pour ID:', clientId);
    const client = clients.find(c => c.id === clientId);
    console.log('Client trouvé:', client);
    return client ? `${client.firstname} ${client.lastname}` : 'Client inconnu';
  };

  return (
    <div className="admin-dashboard">
      <h2>Tableau de bord admin</h2>
      <p>Nombre de clients inscrits : {clientCount}</p>
      <button onClick={handleAjouter}>Ajouter un véhicule</button>
      {showForm && <AjoutVehicule onClose={handleCloseForm} />}
      <h3>Liste des véhicules</h3>
      <table>
        <thead>
          <tr>
            <th>Marque</th>
            <th>Modèle</th>
            <th>Année</th>
            <th>Client</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.length > 0 ? (
            vehicles.map((vehicle) => (
              <tr key={vehicle.id}>
                <td>{vehicle.marque}</td>
                <td>{vehicle.modele}</td>
                <td>{vehicle.annee}</td>
                <td>{getClientName(vehicle.client_id)}</td>
                <td>
                  <button onClick={() => handleModifier(vehicle.id)}>Modifier</button>
                  <button onClick={() => handleDelete(vehicle.id)}>Supprimer</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Aucun véhicule trouvé</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
