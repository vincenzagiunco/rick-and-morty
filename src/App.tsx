import "./App.scss";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Characters } from "./components/Characters";
import { Character } from "./components/Character";
import { Location } from "./components/Location";
import { Episodes } from "./components/Episodes";
import { Locations } from "./components/Locations";
import { Episode } from "./components/Episode";
import { Layout } from "./Layout";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Characters /> },
      { path: "/character/:name/:id", element: <Character /> },
      { path: "/location/:name/:id", element: <Location /> },
      { path: "/locations", element: <Locations /> },
      { path: "/episodes", element: <Episodes /> },
      { path: "/episode/:name/:id", element: <Episode /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
