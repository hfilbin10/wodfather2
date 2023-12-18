import { useEffect, useState } from "react";
import "./App.css";
import { api } from "./utilities";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";


function App() {
  const [user, setUser] = useState(null);
  const location = useLocation();

  const getInfo = async () => {
    let token = localStorage.getItem("token")
    if (token) {
      api.defaults.headers.common["Authorization"] = `Token ${token}`
      let response = await api.get("users/")
      setUser(response.data)
    }
  }

  useEffect(() => {
    getInfo()
  }, [location.pathname])

  return (
    <>
      {location.pathname !== '/register' && (
        <NavBar user={user} setUser={setUser} />
      )}
      {/* <h3>Welcome {user ? user : null}</h3> */}
      <Outlet context={{ user, setUser }} />
    </>
  );
}

export default App;
