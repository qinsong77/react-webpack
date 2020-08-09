import React from 'react';
import 'normalize.css'
import './styles/reset.scss'
import './styles/app.scss';
import Header from './components/header'
import { BrowserRouter as Router,Switch, Route } from 'react-router-dom'
import routes from './router'

function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <main>
          <Switch>
            {routes.map((route, index) => (
              // Render more <Route>s with the same paths as
              // above, but different components this time.
              <Route
                key={index}
                path={route.path}
                // exact={route.exact}
                exact={true}
               // eslint-disable-next-line react/no-children-prop
                children={<route.main />}
              />
            ))}
          </Switch>
        </main>
      </div>
    </Router>

  );
}

export default App;
