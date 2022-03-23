import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test('Verifica se é exibida a mensagem "No favorite pokemon found",'
  + ' se não tiver pokémons favoritos',
  () => {
    renderWithRouter(<FavoritePokemons pokemons={ [] } />);

    const favoritesNotFound = screen.getByText(/No favorite pokemon found/i);
    expect(favoritesNotFound).toBeDefined();
  });

  test('Verifica se é exibido todos os cards de pokémons favoritados',
    () => {
      renderWithRouter(<FavoritePokemons pokemons={ [pokemons[4]] } />);

      const nameOfPokemon = screen.getByText(/Alakazam/i);
      const spriteOfPokemon = screen.getByAltText(/Alakazam sprite/i);
      const pokemonIsFavorite = screen.getByAltText(/Alakazam is marked as favorite/i);
      expect(nameOfPokemon).toBeInTheDocument();
      expect(spriteOfPokemon).toBeInTheDocument();
      expect(pokemonIsFavorite).toBeInTheDocument();
    });
});
