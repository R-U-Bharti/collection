import { useContext, lazy } from "react"
import { contextVar } from "./Context/contextVar"
import ProjectBase from "./Pages/ProjectBase";
const Home = lazy(() => import("./Pages/Home"));

const StateRouteIndex = () => {
    const { stateRoute, route } = useContext(contextVar)

    const routes = [
        { path: '/', element: <Home /> },
        { path: '/projectBase', element: <ProjectBase /> },
    ]

    return (
        <>
            {stateRoute !== '/' && <button className="animate__animated animate__fadeIn absolute md:top-4 top-2 md:left-6 left-2 border px-3 rounded text-sm hover:bg-slate-800 hover:text-white py-1" onClick={() => route('/')}>Back</button>}
            {
                routes.map((route) =>
                    <>
                        {(route.path === stateRoute) && route.element}
                    </>
                )
            }
        </>
    )
}

export default StateRouteIndex