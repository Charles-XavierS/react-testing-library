import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  test('Teste se página contém um heading `h2` com o texto `Page requested not found 😭',
    () => {
      render(<NotFound />);

      const title = screen.getByRole('heading', {
        name: 'Page requested not found Crying emoji',
        level: 2,
      });

      expect(title).toBeDefined();
    });

  test('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    () => {
      render(<NotFound />);

      const img = screen.getByRole('img', { name: 'Pikachu crying because the'
      + ' page requested was not found' });

      expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    });
});
