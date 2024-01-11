import { Account } from "entities/account/ui";
import { PrivatePage } from "features/auth/ui";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { SessionProvider } from "shared/providers";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Account />,
  },
]);

function App() {
  return (
    <SessionProvider>
      <div className="container" style={{ padding: "50px 0 100px 0" }}>
        <PrivatePage>
          <RouterProvider router={router} />
        </PrivatePage>
      </div>
    </SessionProvider>
  );
}

export default App;
