import { Account } from "entities/account/ui";
import Auth from "features/auth/ui/Auth";
import { useSession } from "shared/hooks/useSession";
import "./App.css";

function App() {
  const session = useSession();

  return (
    <>
      <div className="container" style={{ padding: "50px 0 100px 0" }}>
        {!session ? (
          <Auth />
        ) : (
          <Account key={session.user.id} session={session} />
        )}
      </div>
    </>
  );
}

export default App;
