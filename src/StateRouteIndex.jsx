import { useContext, lazy } from "react"
import { contextVar } from "./Context/contextVar"
import ProjectBase from "./Pages/ProjectBase";
import { decrypt } from "./Components/Common/PowerUpFunctions";
const Home = lazy(() => import("./Pages/Home"));

const StateRouteIndex = () => {
    const { stateRoute, route } = useContext(contextVar)

    const routes = [
        { path: '/projectBase', element: <ProjectBase /> },
    ]

    const checkAuth = (element) => {
        let localPwd = sessionStorage.getItem('pwd') ?? ''
        if (decrypt(localPwd) === import.meta.env.VITE_PWD) {
            return element;
        } else {
            route('/')
        }
    }

    return (
        <>
            {stateRoute !== '/' && <button className="animate__animated animate__fadeIn absolute md:top-4 top-2 md:left-6 left-2 border px-3 rounded text-sm hover:bg-slate-800 hover:text-white py-1" onClick={() => route('/')}>Back</button>}
            {stateRoute === '/' && <Home />}
            {
                routes.map((route) =>
                    <>
                        {(route.path === stateRoute) && checkAuth(route.element)}
                    </>
                )
            }
        </>
    )
}

export default StateRouteIndex