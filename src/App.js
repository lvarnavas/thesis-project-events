import React, { useState, useCallback, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import MainNavigation from './shared/components/Navigation/MainNavigation';
import Footer from './Footer';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';
import { AuthContext } from './shared/context/auth-context';

const Events = React.lazy(() => import('./events/pages/Events'));
const User = React.lazy(() => import('./user/pages/User'));
const NewEvent = React.lazy(() => import('./events/pages/NewEvent'));
const UserEvents = React.lazy(() => import('./events/pages/UserEvents'));
const UpdateEvent = React.lazy(() => import('./events/pages/UpdateEvent'));
const UpdateUser = React.lazy(() => import('./user/pages/UpdateUser'));
const SpecificEvent = React.lazy(() => import('./events/pages/SpecificEvent'));
const Auth = React.lazy(() => import('./user/pages/Auth'));
const CityEvents = React.lazy(() => import('./events/pages/CityEvents'));
const PrefectureEvents = React.lazy(() => import('./events/pages/PrefectureEvents'));
const CategoryEvents = React.lazy(() => import('./events/pages/CategoryEvents'));
const Filters = React.lazy(() => import('./events/pages/Filters'));
const Reset = React.lazy(() => import('./user/pages/Reset'));
const NewPassword = React.lazy(() => import('./user/pages/NewPassword'));
const StartDateEvents = React.lazy(() => import('./events/pages/StartDateEvents'));

let logOutTimer;

const App = () => {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    const tokenExpirationDate = 
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate); 
    localStorage.setItem(
      'userData', 
      JSON.stringify({
        userId: uid, 
        token: token, 
        expiration: tokenExpirationDate.toISOString() 
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logOutTimer = setTimeout(logout, remainingTime)
    } else {
      clearTimeout(logOutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) 
    {
      login(storedData.userId, storedData.token, new Date(storedData.expiration));
    } 
  }, [login]);

  let routes;

  if (token){
    routes = (
      <Switch>
        <Route path="/" exact> <Events/> </Route>
        <Route path="/search" exact> <Filters/> </Route>
        <Route path="/profile/:userId" exact> <User/> </Route>
        <Route path="/user/:userId" exact> <UserEvents/> </Route>        
        <Route path="/specific/:eventId" exact> <SpecificEvent/> </Route>
        <Route path="/update/:userId" exact> <UpdateUser/> </Route>
        <Route path="/events/new" exact> <NewEvent/> </Route>
        <Route path="/edit/:eventId" exact> <UpdateEvent/> </Route>
        <Route path="/city/:cityId" exact> <CityEvents/> </Route>  
        <Route path="/prefecture/:prefectureId" exact> <PrefectureEvents/> </Route> 
        <Route path="/category/:categoryId" exact> <CategoryEvents/> </Route>
        <Route path="/startdate/:date" exact > <StartDateEvents/> </Route>          
        <Redirect to="/"/> 
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact> <Events/> </Route>
        <Route path="/auth" exact> <Auth/> </Route>
        <Route path="/search" exact> <Filters/> </Route>
        <Route path="/city/:cityId" exact> <CityEvents/> </Route>
        <Route path="/prefecture/:prefectureId" exact> <PrefectureEvents/> </Route> 
        <Route path="/category/:categoryId" exact> <CategoryEvents/> </Route>  
        <Route path="/event/:eventId" exact> <SpecificEvent/> </Route>
        <Route path="/reset" exact> <Reset/> </Route>
        <Route path="/reset/:token" exact> <NewPassword/> </Route>
        <Route path="/startdate/:date" exact > <StartDateEvents/> </Route>
        <Redirect to="/auth"/>
      </Switch>
    );
  }

  return ( 
    <AuthContext.Provider value={{
      isLoggedIn: !!token,
      token: token, 
      userId: userId, 
      login: login, 
      logout: logout
    }}>
      <Router>
        <MainNavigation/>
          <main> 
            <Suspense 
              fallback={
                <div className="center"> 
                  <LoadingSpinner/> 
                </div>
              }>
                {routes}
            </Suspense>
          </main>
          <footer>
            <Footer/>
          </footer>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;