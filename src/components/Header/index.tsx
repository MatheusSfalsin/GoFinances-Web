import React from 'react';

import { useLocation } from 'react-router-dom';

import { Container, LinkPage } from './styles';

import Logo from '../../assets/logo.svg';

interface HeaderProps {
  size?: 'small' | 'large';
  location?: object;
}

const Header: React.FC<HeaderProps> = ({ size = 'large' }: HeaderProps) => {
  const location = useLocation();
  const { pathname } = location;
  return (
    <Container size={size}>
      <header>
        <img src={Logo} alt="GoFinances" />
        <nav>
          <LinkPage equal={pathname === '/'} to="/">
            Listagem
          </LinkPage>
          <LinkPage equal={pathname === '/import'} to="/import">
            Importar
          </LinkPage>
        </nav>
      </header>
    </Container>
  );
};

export default Header;
