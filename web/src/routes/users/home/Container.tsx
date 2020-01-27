import * as React from 'react';
import { HomePresenter } from './Presenter';

interface HomeContainerProps {
  history: any;
}

interface HomeContainerState {
};

class HomeContainer extends React.Component<HomeContainerProps, HomeContainerState> {
  constructor(props: HomeContainerProps) {
    super(props)    
    this.state = {      
    }
  }

  render () {
    return (
      <HomePresenter 
        history={this.props.history}        
      />
    );
  }
}

export default HomeContainer