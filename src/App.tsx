import { Account } from "entities/account/ui";
import { Student } from "entities/student/ui";
import { PrivatePage } from "features/auth/ui";
import { FC, ReactNode } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ROUTES } from "shared/lib/routes";
import { SessionProvider } from "shared/providers";
import { Header } from "shared/ui";
import "./App.css";

const PageContainer: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      <div className="container" style={{ padding: "50px 0 100px 0" }}>
        <PrivatePage>{children}</PrivatePage>
      </div>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: ROUTES.home,
    element: (
      <PageContainer>
        <Account />
      </PageContainer>
    ),
  },
  {
    path: ROUTES.student,
    element: (
      <PageContainer>
        <Student />
      </PageContainer>
    ),
  },
]);

function App() {
  return (
    <SessionProvider>
      <RouterProvider router={router} />
    </SessionProvider>
  );
}

export default App;
