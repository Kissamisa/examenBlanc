// test/Dashboard.test.jsx
import { describe, it, beforeEach, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; 
import AdminDashboard from '../src/components/Dashboard'; 
import { vi } from 'vitest';

describe('AdminDashboard', () => {
  beforeEach(() => {
    // Mock des appels API si nécessaire
    vi.spyOn(global, 'fetch').mockImplementation((url) => {
      return Promise.resolve({
        json: () => Promise.resolve([]), 
      });
    });
  });

  it('devrait afficher le nombre de clients', async () => {
    render(
      <MemoryRouter>
        <AdminDashboard />
      </MemoryRouter>
    );
   
  });

  it('devrait afficher la liste des véhicules', async () => {
    render(
      <MemoryRouter>
        <AdminDashboard />
      </MemoryRouter>
    );
    // Ajoutez les assertions spécifiques à ce test
  });

  it('devrait afficher le formulaire d\'ajout de véhicule lorsqu\'on clique sur "Ajouter un véhicule"', async () => {
    render(
      <MemoryRouter>
        <AdminDashboard />
      </MemoryRouter>
    );
    // Simulez le clic sur le bouton et ajoutez les assertions spécifiques
    fireEvent.click(screen.getByText('Ajouter un véhicule'));
    // Ajoutez des assertions pour vérifier que le formulaire est affiché
  });
});
