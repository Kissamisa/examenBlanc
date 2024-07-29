import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const baseURI = import.meta.env.VITE_API_BASE_URL;

const ModifierVehicule = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [formData, setFormData] = useState({ marque: '', modele: '', annee: '', client_id: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const response = await fetch(`${baseURI}api/dashboard/vehicules/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setVehicle(data);
          setFormData({
            marque: data.marque,
            modele: data.modele,
            annee: data.annee,
            client_id: data.client_id,
          });
        } else {
          throw new Error('Erreur lors de la récupération du véhicule');
        }
      } catch (error) {
        alert(error.message);
        navigate('/admin'); // Redirection en cas d'erreur
      }
    };

    fetchVehicle();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${baseURI}api/dashboard/vehicules/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Véhicule mis à jour avec succès');
        navigate('/admin');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de la mise à jour du véhicule');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h2>Modifier le véhicule</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Marque:
          <input type="text" name="marque" value={formData.marque} onChange={handleChange} />
        </label>
        <label>
          Modèle:
          <input type="text" name="modele" value={formData.modele} onChange={handleChange} />
        </label>
        <label>
          Année:
          <input type="number" name="annee" value={formData.annee} onChange={handleChange} />
        </label>
        <label>
          Client ID:
          <input type="number" name="client_id" value={formData.client_id} onChange={handleChange} />
        </label>
        <button type="submit">Modifier</button>
      </form>
    </div>
  );
};

export default ModifierVehicule;
