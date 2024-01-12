import { Account } from "entities/account/ui";
import { PrivatePage } from "features/auth/ui";
import { StudentPage } from "pages/student";
import { FC, ReactNode } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ROUTES } from "shared/lib/routes";
import { SessionProvider } from "shared/providers";
import { Header } from "shared/ui";
import "./App.css";
import { SWRConfig } from "swr";

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
        <StudentPage />
      </PageContainer>
    ),
  },
]);

function App() {
  return (
    <SWRConfig
      value={{
        provider: () => new Map(),
        shouldRetryOnError: false,
      }}
    >
      <SessionProvider>
        <RouterProvider router={router} />
      </SessionProvider>
    </SWRConfig>
  );
}

export default App;
