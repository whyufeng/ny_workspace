import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Home";
import Starred from "./pages/Starred";
import Study from "./pages/Study";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
    children: [],
  },
  {
    path: "/starred",
    element: <Starred />,
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
