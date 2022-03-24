import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <PokemonDetails.js />', () => {
  test('Verifica se as informações detalhadas do Pokémon são mostradas na tela.', () => {
    renderWithRouter(<App />);

    const psychicButton = screen.getByRole('button', { name: /Psychic/ });
    const nextButton = screen.getByRole('button', { name: /Próximo Pokémon/i });
    const moreDetails = screen.getByRole('link', { name: /More Details/i });
    userEvent.click(psychicButton);
    userEvent.click(nextButton);
    userEvent.click(moreDetails);

    const pokemonNameDetails = screen.getByRole('heading', { name: /mew details/i });
    const summaryDetails = screen.getByRole('heading', { name: /summary/i, level: 2 });
    const paragraphDetails = screen.getByText(/apparently, it appears only to those.../i);

    expect(pokemonNameDetails).toBeInTheDocument();
    expect(summaryDetails).toBeInTheDocument();
    expect(paragraphDetails).toBeInTheDocument();
  });

  test('Se existe uma seção com os mapas contendo as localizações do pokémon', () => {
    renderWithRouter(<App />);

    const psychicButton = screen.getByRole('button', { name: /Psychic/ });
    const nextButton = screen.getByRole('button', { name: /Próximo Pokémon/i });
    const moreDetails = screen.getByRole('link', { name: /More Details/i });
    userEvent.click(psychicButton);
    userEvent.click(nextButton);
    userEvent.click(moreDetails);

    const titleLocations = screen.getByRole('heading', {
      name: /game locations of mew/i, level: 2 });
    const locationName = screen.getByText(/Faraway Island/i);
    const locationImage = screen.getByAltText(/mew location/i);

    expect(titleLocations).toBeInTheDocument();
    expect(locationName).toBeInTheDocument();
    expect(locationImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/e/e4/Hoenn_Faraway_Island_Map.png');
  });

  test('Se o usuário pode favoritar um pokémon através da página de detalhes.', () => {
    renderWithRouter(<App />);

    const psychicButton = screen.getByRole('button', { name: /Psychic/ });
    const nextButton = screen.getByRole('button', { name: /Próximo Pokémon/i });
    const moreDetails = screen.getByRole('link', { name: /More Details/i });
    userEvent.click(psychicButton);
    userEvent.click(nextButton);
    userEvent.click(moreDetails);

    const favoriteCheckbox = screen.getByRole('checkbox');
    expect(favoriteCheckbox).toBeInTheDocument();

    userEvent.click(favoriteCheckbox);
    const star = screen.getByAltText(/Mew is marked as favorite/i);
    expect(star).toBeInTheDocument();
    userEvent.click(favoriteCheckbox);
    expect(star).not.toBeInTheDocument();

    const label = screen.getByText(/pokémon favoritado\?/i);
    expect(label).toBeInTheDocument();
  });
});
