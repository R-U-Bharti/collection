/*
Readme
==================================================================

! To Provide values in Routes
-----------------------------------------------------
import { contextVar } from './Context/contextVar';

const[data, setData] = useState(null) //Example state
const contextData = {data, setData}

<contextVar.Provider value={contextData}>
    <Routes>
        <Route />
    </Routes>
</contextVar.Provider>
    
! To use values in components
-----------------------------------------------------
const { data, setData } = useContext(contextVar)
*/

import { createContext } from "react";

export const contextVar = createContext('')