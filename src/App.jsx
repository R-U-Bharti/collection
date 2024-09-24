import { lazy, useState } from 'react';
import { Route, Routes } from "react-router-dom"
import { contextVar } from './Context/contextVar';
import { Toaster } from 'react-hot-toast';
const StateRouteIndex = lazy(() => import('./StateRouteIndex'));

const App = () => {

  const [stateRoute, setStateRoute] = useState(sessionStorage.getItem('route') ?? '/')

  const contextData = {
    stateRoute, setStateRoute,
    route: (path) => {
      sessionStorage.setItem('route', path)
      setStateRoute(path)
    }
  }

  return (
    <>
    <Toaster />
      <contextVar.Provider value={contextData}>
        <Routes>
          <Route index element={<StateRouteIndex />} />
        </Routes>
      </contextVar.Provider>
    </>
  )
}

export default App