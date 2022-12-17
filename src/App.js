import {Switch, Route} from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Home from './components/Home'
import Popular from './components/Popular'
import ProtectedRoute from './components/ProtectedRoute'
import Account from './components/Account'
import MovieDetails from './components/MovieDetails'
import Search from './components/Search'
import NotFound from './components/NotFound'

const App = () => (
  <>
    <Switch>
      <Route path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/account" component={Account} />
      <ProtectedRoute exact path="/popular" component={Popular} />
      <ProtectedRoute exact path="/search" component={Search} />
      <ProtectedRoute path="/movies/:id" exact component={MovieDetails} />
      <Route component={NotFound} />
    </Switch>
  </>
)

export default App
