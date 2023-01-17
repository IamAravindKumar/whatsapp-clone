import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root";
import Chat from "./Chat";
import Login from "./Login";
import { useStateValue } from "./StateProvider";
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
  const [{user}] = useStateValue();
  return (
    <div className="app">
      {user ? <RouterProvider router={router} /> : <Login />}
    </div>
  );
}

export default App;
