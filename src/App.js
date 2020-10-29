import React from 'react';
import {
    BrowserRouter as Router,
    Link,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import Home from "./Home";
import Registration from "./Registration";
import Authenticate from "./Auth";
import Deposits from "./Deposits";
import Withdrawals from "./Withdrawals";
import Sales from "./Sales";
import Purchases from "./Purchases";

const loggedIn = localStorage.getItem('token');

class App extends React.Component {
  render() {
    return (
        <Router>
          <div className='topnav'>
            <ul>
              <li className='navlist'><Link className='navlinks' to='/'>Home</Link></li>
                <li className='navlist'><Link className='navlinks' to='/login'>Login</Link></li>
                <li className='navlist'><Link className='navlinks' to='/register'>Register user</Link></li>
            </ul>
          </div>
          <Switch>
            <Route exact path='/' component={Home}/>
              <Route exact path='/login' component={Authenticate}/>
              <Route exact path='/register' component={Registration}/>
              {loggedIn && <>
              <Route path="/deposits" component={Deposits} exact/>
              <Route path="/withdrawals" component={Withdrawals} exact/>
              <Route path="/sales" component={Sales} exact/>
              <Route path="/purchases" component={Purchases} exact/>
            </>}
            {!loggedIn && <>
              <Redirect to='/login'/>
            </>}
          </Switch>
        </Router>
    )
  }
}


export default App;
