import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Home";
import LocalWeather from "./pages/LocalWeather";
import Study from "./pages/Study";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
    children: [],
  },
  {
    path: "/starred",
    element: <LocalWeather />,
  },
  {
    path: "/study",
    element: <Study />,
  },
]);

function App() {
  document.title = "NY WorkSpace";
  return <RouterProvider router={router} />;
}

export default App;
