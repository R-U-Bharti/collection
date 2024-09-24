import { lazy, useState } from 'react';
import { Route, Routes } from "react-router-dom"
import { contextVar } from './Context/contextVar';
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
      <contextVar.Provider value={contextData}>
        <Routes>
          <Route index element={<StateRouteIndex />} />
        </Routes>
      </contextVar.Provider>
    </>
  )
}

export default App