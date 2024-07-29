import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const baseURI = import.meta.env.VITE_API_BASE_URL;

const AjoutVehicule = ({ onClose }) => {
  const [clients, setClients] = useState([]);
  const [marque, setMarque] = useState('');
  const [modele, setModele] = useState('');
  const [annee, setAnnee] = useState('');
  const [clientId, setClientId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch(`${baseURI}api/clients`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setClients(data);
        } else {
          throw new Error('Erreur lors de la récupération des clients');
        }
      } catch (error) {
        alert(error.message);
      }
    };

    fetchClients();
  }, []);

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!marque || !modele || !annee) {
      alert('Marque, modèle et année sont requis');
      return;
    }
  
    try {
      const response = await fetch(`${baseURI}api/dashboard/vehicules/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ make: marque, model: modele, year: annee, client_id: clientId }),
      });
  
      const responseText = await response.text(); // Lire la réponse en tant que texte
  
      console.log('Réponse du serveur:', responseText); // Log pour le débogage
  
      if (response.ok) {
        alert('Véhicule ajouté avec succès');
        onClose();
      } else {
        throw new Error(responseText || 'Erreur lors de l\'ajout du véhicule');
      }
    } catch (error) {
      alert(error.message);
    }
  };
  
  return (
    <div className="ajout-vehicule-form">
      <h2>Ajouter un véhicule</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Marque:
          <input type="text" value={marque} onChange={(e) => setMarque(e.target.value)} required />
        </label>
        <label>
          Modèle:
          <input type="text" value={modele} onChange={(e) => setModele(e.target.value)} required />
        </label>
        <label>
          Année:
          <input type="number" value={annee} onChange={(e) => setAnnee(e.target.value)} required />
        </label>
        <label>
          Client:
          <select value={clientId} onChange={(e) => setClientId(e.target.value)} required>
  <option value="">Sélectionner un client</option>
  {clients.map(client => (
    <option key={client.id} value={client.id}>
      {client.firstname} {client.lastname}
    </option>
  ))}
</select>
        </label>
        <button type="submit">Ajouter</button>
        <button type="button" onClick={onClose}>Annuler</button>
      </form>
    </div>
  );
};

export default AjoutVehicule;
