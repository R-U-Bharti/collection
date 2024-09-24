import { Route, Routes } from "react-router-dom"
import Home from "@/Pages/Home"

const App = () => {

  const routes = [
    { path: '/', element: <Home /> }
  ]

  return (
    <>
      <Routes>
        {
          routes.map((route, index) =>
            <Route key={index} path={route.path} element={route.element} />
          )
        }
      </Routes>
    </>
  )
}

export default App