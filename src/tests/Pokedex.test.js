import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('5 - Teste o componente <Pokedex.js />', () => {
  test('Verifica se página contém um heading h2 com o texto Encountered pokémons',
    () => {
      renderWithRouter(<App />);

      const title = screen.getByRole('heading', {
        name: /Encountered pokémons/i,
        level: 2,
      });

      expect(title).toBeInTheDocument();
    });

  test('Verifica se é exibido o próximo Pokémon da lista quando o botão,'
  + ' "Próximo pokémon" é clicado.', () => {
    renderWithRouter(<App />);

    const nextPokemon = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    const pokemonName = screen.getByTestId('pokemon-name');
    pokemons.forEach((pokemon) => {
      expect(pokemonName).toHaveTextContent(pokemon.name);
      userEvent.click(nextPokemon);
    });
  });

  test('Verifica se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);

    const pokemonInScreen = screen.getAllByRole('img');
    expect(pokemonInScreen.length).toBe(1);
  });

  test('Verifica se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);

    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    const types = 7;
    const psychicButton = screen.getByRole('button', { name: /Psychic/i });
    const all = screen.getByRole('button', { name: /All/i });

    expect(filterButtons.length).toBe(types);
    expect(psychicButton).toHaveTextContent('Psychic');
    expect(all).toBeInTheDocument();
  });

  test('Verifica se a Pokédex contém um botão para resetar o filtro.', () => {
    renderWithRouter(<App />);

    const all = screen.getByRole('button', { name: /All/i });
    userEvent.click(all);

    const nextPokemon = screen.getByRole('button', {
      name: /Próximo pokémon/i,
    });
    const firstPokemon = screen.getByText(/Pikachu/i);

    userEvent.click(nextPokemon);
    const secondPokemon = screen.getByText(/Charmander/i);
    expect(secondPokemon).toHaveTextContent(/Charmander/i);

    userEvent.click(all);
    expect(firstPokemon).toHaveTextContent(/Pikachu/i);
  });
});
