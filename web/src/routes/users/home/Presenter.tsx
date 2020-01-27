import * as React from 'react';

interface HomePresenterProps {
  history: any;
}

export const HomePresenter: React.FunctionComponent<HomePresenterProps> = props => {
  return (
    <div>Hola soy el Home</div>
  );
}