import React from 'react'
import Layout from './components/Layout/Layout'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import Categories from './pages/Categories'
import Statistics from './pages/Statistics'
import Staff from './pages/Staff'
import Documents from './pages/Documents'

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path={'/Home'}>
            <Home />
          </Route>
          <Route exact path={'/Products'}>
            <Products />
          </Route>
          <Route exact path={'/Categories'}>
            <Categories />
          </Route>
          <Route exact path={'/Statistics'}>
            <Statistics />
          </Route>
          <Route exact path={'/Staff'}>
            <Staff />
          </Route>
          <Route exact path={'/Documents'}>
            <Documents />
          </Route>
        </Switch>
      </Layout>
    </BrowserRouter>
  )
}

export default App
