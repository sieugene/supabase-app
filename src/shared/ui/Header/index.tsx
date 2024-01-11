import { NavLink } from "react-router-dom";
import { SUPABASE_CLIENT } from "shared/api/supabase";
import { ROUTES } from "shared/lib/routes";
import { useSessionContext } from "shared/providers";

export const Header = () => {
  const { user } = useSessionContext();
  return (
    <div className="header">
      <nav>
        <ul>
          <li>
            <NavLink
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
              to={ROUTES.home}
            >
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
              to={ROUTES.student}
            >
              Student
            </NavLink>
          </li>
        </ul>
        {user && (
          <div className="actions">
            <button
              className="button block"
              type="button"
              onClick={() => SUPABASE_CLIENT.auth.signOut()}
            >
              Sign Out
            </button>
          </div>
        )}
      </nav>
    </div>
  );
};
