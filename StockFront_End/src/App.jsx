import React from "react"
import { RouterProvider } from "react-router-dom"

import { router } from "./routes/routers"
import UserContext from "./Contextapi/UserContext"
import ProfileInfo from "./User_things/ProfileInfo"


function App() {

  return (
    <>
     <UserContext>

    <RouterProvider router={router}/>

    </UserContext>

    </>
  )
}

export default App