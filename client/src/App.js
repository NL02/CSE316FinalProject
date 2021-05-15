import './App.css';
import React              from 'react';
import Homescreen         from './components/homescreen/Homescreen';
import RegionSpreadsheet  from './components/regionSpreadsheet/RegionSpreadsheet'
import { useQuery }       from '@apollo/client';
import * as queries       from './cache/queries';
import { jsTPS }          from './utils/jsTPS';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

function App() {
  let user = null;
  let transactionStack = new jsTPS();
  let refreshTps = false;
  const { loading, error, data, refetch } = useQuery(queries.GET_DB_USER);

  if(error) { console.log(error); }
	if(loading) { console.log(loading); }
	if(data) { 
		let { getCurrentUser } = data;
		if(getCurrentUser !== null) { user = getCurrentUser; }
    }

  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/" to={ {pathname:"/home"}} />
        <Route  
          exact path="/home"
          name="home"
          render={() => 
            <Homescreen tps={transactionStack} fetchUser={refetch} user={user} refreshTPS={refreshTps}/>
          }
        />
        <Route
          path="/home/:name"
          render={() => 
            <RegionSpreadsheet tps={transactionStack} fetchUser={refetch} user={user} refreshTPS={refreshTps}/>
          }
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
