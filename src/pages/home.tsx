import React from 'react';
import Logo from '~/components/Logo';
import MainLayout from '~/components/layout/MainLayout';

const HomePage: React.FC = ({}) => (
  <MainLayout>
    <Logo size={200} />
  </MainLayout>
);

export default HomePage;
