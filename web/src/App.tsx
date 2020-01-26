import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { store, persistor }  from 'src/states/store';
import { PersistGate } from 'redux-persist/integration/react';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

import LoginContainer from './routes/users/login/Container';
import RegisterContainer from './routes/users/register/Container';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Switch>
            <Route exact={true} path="/" component={LoginContainer} />
            <Route exact={true} path="/register" component={RegisterContainer} />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
