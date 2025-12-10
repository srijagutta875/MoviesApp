import './App.css'

import {Switch, Route, Redirect} from 'react-router-dom'

import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import Popular from './components/Popular'
import Search from './components/Search'
import Account from './components/Account'
import NotFound from './components/NotFound'
import MovieItemDetails from './components/MovieItemDetails'
import Layout from './components/Layout'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <Layout>
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/popular" component={Popular} />
      <ProtectedRoute exact path="/search" component={Search} />
      <ProtectedRoute exact path="/Account" component={Account} />
      <ProtectedRoute exact path="/movies/:id" component={MovieItemDetails} />
    </Layout>
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
