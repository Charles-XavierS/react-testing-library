import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <Pokemon.js />', () => {
  test('Verifica se é renderizado um card com as informações do pokémon.', () => {
    renderWithRouter(<App />);

    const psychicButton = screen.getByRole('button', { name: /Psychic/ });
    const nextButton = screen.getByRole('button', { name: /Próximo Pokémon/i });
    userEvent.click(psychicButton);
    userEvent.click(nextButton);

    const pokemonName = screen.getByText(/Mew/);
    const typePokemon = screen.getByTestId('pokemon-type');
    const weight = screen.getByText(/Average weight: 4.0 kg/i);
    const image = screen.getByAltText(/Mew sprite/i);

    expect(pokemonName).toHaveTextContent(/Mew/);
    expect(typePokemon).toHaveTextContent(/Psychic/i);
    expect(weight).toHaveTextContent(/Average weight: 4.0 kg/);
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/4/43/Spr_5b_151.png');
  });

  test('Verifica se o card do Pokémon indicado na Pokédex,'
  + ' contém um link de navegação para exibir detalhes deste Pokémon.'
  + ' O link deve possuir a URL /pokemons/<id>, onde <id> é o id do Pokémon exibido.',
  () => {
    const { history } = renderWithRouter(<App />);

    const psychicButton = screen.getByRole('button', { name: /Psychic/ });
    const nextButton = screen.getByRole('button', { name: /Próximo Pokémon/i });
    userEvent.click(psychicButton);
    userEvent.click(nextButton);

    const moreDetails = screen.getByRole('link', { name: /More Details/i });
    userEvent.click(moreDetails);
    expect(history.location.pathname).toBe('/pokemons/151');
  });

  test('Verifica se ao clicar no link de navegação do Pokémon,'
  + ' é feito o redirecionamento da aplicação para a página de detalhes de Pokémon.',
  () => {
    renderWithRouter(<App />);

    const psychicButton = screen.getByRole('button', { name: /Psychic/ });
    const nextButton = screen.getByRole('button', { name: /Próximo Pokémon/i });
    userEvent.click(psychicButton);
    userEvent.click(nextButton);

    const moreDetails = screen.getByRole('link', { name: /More Details/i });
    userEvent.click(moreDetails);
    const gameLocations = screen.getByRole('heading', { name: /game locations of mew/i });
    expect(gameLocations).toBeInTheDocument();
  });

  test('Verifica se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<App />);

    const psychicButton = screen.getByRole('button', { name: /Psychic/ });
    const nextButton = screen.getByRole('button', { name: /Próximo Pokémon/i });
    userEvent.click(psychicButton);
    userEvent.click(nextButton);

    const moreDetails = screen.getByRole('link', { name: /More Details/i });
    userEvent.click(moreDetails);

    const isFavorite = screen.getByLabelText(/Pokémon favoritado?/i);
    userEvent.click(isFavorite);

    const star = screen.getByAltText(/Mew is marked as favorite/i);
    expect(star).toHaveAttribute('src', '/star-icon.svg');
  });
});
