import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste se o topo da aplicação contém um conjunto fixo de links de navegação.',
  () => {
    test('Verifica se a aplicação é redirecionada para a página inicial,'
    + 'na URL / ao clicar no link Home da barra de navegação.',
    () => {
      const { history } = renderWithRouter(<App />);
      const linkToHome = screen.getByRole('link', { name: 'Home' });
      expect(linkToHome).toBeDefined();

      userEvent.click(linkToHome);
      const { location: { pathname } } = history;
      expect(pathname).toBe('/');
    });

    test('Verifica se a aplicação é redirecionada para a página de About, na URL /about,'
    + 'ao clicar no link About da barra de navegação.',
    () => {
      const { history } = renderWithRouter(<App />);
      const linkToAbout = screen.getByRole('link', { name: 'About' });
      expect(linkToAbout).toBeDefined();

      userEvent.click(linkToAbout);
      const { location: { pathname } } = history;
      expect(pathname).toBe('/about');
    });

    test('Verifica se é redirecionada para a página de Pokémons Favoritados,'
    + 'na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação.',
    () => {
      const { history } = renderWithRouter(<App />);
      const linkToFavorites = screen.getByRole('link', { name: 'Favorite Pokémons' });
      expect(linkToFavorites).toBeDefined();

      userEvent.click(linkToFavorites);
      const { location: { pathname } } = history;
      expect(pathname).toBe('/favorites');
    });

    test('Verifica se é redirecionado para a página Not Found ao entrar'
    + 'em uma URL desconhecida.',
    () => {
      const { history } = renderWithRouter(<App />);

      history.push('/page-not-found');
      const title = screen.getByRole('heading', {
        name: 'Page requested not found Crying emoji',
        level: 2 });
      expect(title).toBeDefined();
    });
  });
