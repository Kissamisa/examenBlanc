// test/AjoutVehicule.test.jsx
import { describe, it, beforeEach, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AjoutVehicule from '../src/components/AjoutVehicule';

// Mock de l'API
vi.mock('global', () => ({
  fetch: vi.fn(),
}));

describe('AjoutVehicule', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    // Réinitialiser les mocks avant chaque test
    vi.clearAllMocks();
  });

  it('devrait afficher le formulaire avec les champs appropriés', () => {
    render(
      <MemoryRouter>
        <AjoutVehicule onClose={mockOnClose} />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/Marque:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Modèle:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Année:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Client:/i)).toBeInTheDocument();
  });

  it('devrait afficher la liste des clients dans le sélecteur', async () => {
    // Simuler la réponse de l'API
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => [{ id: '1', firstname: 'John', lastname: 'Doe' }],
    });

    render(
      <MemoryRouter>
        <AjoutVehicule onClose={mockOnClose} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    });
  });

  it('devrait afficher une alerte lorsqu\'on soumet le formulaire avec des données invalides', async () => {
    window.alert = vi.fn(); // Mock l'alerte

    render(
      <MemoryRouter>
        <AjoutVehicule onClose={mockOnClose} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/Ajouter/i));

    expect(window.alert).toHaveBeenCalledWith('Marque, modèle et année sont requis');
  });

  it('devrait soumettre le formulaire avec des données valides et afficher une alerte de succès', async () => {
    window.alert = vi.fn(); // Mock l'alerte
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      text: async () => 'Véhicule ajouté avec succès',
    });

    render(
      <MemoryRouter>
        <AjoutVehicule onClose={mockOnClose} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Marque:/i), { target: { value: 'Toyota' } });
    fireEvent.change(screen.getByLabelText(/Modèle:/i), { target: { value: 'Corolla' } });
    fireEvent.change(screen.getByLabelText(/Année:/i), { target: { value: '2020' } });
    fireEvent.change(screen.getByLabelText(/Client:/i), { target: { value: '1' } });

    fireEvent.click(screen.getByText(/Ajouter/i));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Véhicule ajouté avec succès');
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  it('devrait gérer les erreurs de la requête API et afficher une alerte', async () => {
    window.alert = vi.fn(); // Mock l'alerte
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: false,
      text: async () => 'Erreur lors de l\'ajout du véhicule',
    });

    render(
      <MemoryRouter>
        <AjoutVehicule onClose={mockOnClose} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Marque:/i), { target: { value: 'Toyota' } });
    fireEvent.change(screen.getByLabelText(/Modèle:/i), { target: { value: 'Corolla' } });
    fireEvent.change(screen.getByLabelText(/Année:/i), { target: { value: '2020' } });
    fireEvent.change(screen.getByLabelText(/Client:/i), { target: { value: '1' } });

    fireEvent.click(screen.getByText(/Ajouter/i));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Erreur lors de l\'ajout du véhicule');
    });
  });

  it('devrait appeler la fonction onClose lorsque le bouton Annuler est cliqué', () => {
    render(
      <MemoryRouter>
        <AjoutVehicule onClose={mockOnClose} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/Annuler/i));

    expect(mockOnClose).toHaveBeenCalled();
  });
});
