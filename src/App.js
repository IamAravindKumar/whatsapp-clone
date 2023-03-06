import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root";
import Chat from "./Chat";
import Login from "./Login";
import { useStateValue } from "./StateProvider";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { actionTypes } from "./reducer";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "rooms/:roomId",
        element: <Chat />,
      },
    ],
  },
]);

function App() {
  const [{user}, dispatch] = useStateValue();

  useEffect(() => {
    let unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("app user login called", user);
      dispatch({
        type: actionTypes.SET_USER,
        user: user
      });
      localStorage.setItem("user", JSON.stringify(user));
    });
    return unsubscribe;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <div className="app">
      {user ? <RouterProvider router={router} /> : <Login />}
    </div>
  );
}

export default App;
