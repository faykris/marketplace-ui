import styles from "./AccountOptions.module.css";
import { useLogout } from "../../hooks/useLogout.ts";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store.ts";

type Props = {
  onClosePopup: () => void;
};

export const AccountOptions = ({ onClosePopup }: Props) => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const { logoutUser } = useLogout();
  const navigate = useNavigate();

  const handleLogOut = () => {
    void logoutUser();
    onClosePopup();
  };

  const handleSeeAllProducts = () => {
    navigate("/");
    onClosePopup();
  };

  const handleManageMyProducts = () => {
    navigate("/seller-dashboard");
    onClosePopup();
  };

  return (
    <div className={styles.contentOptions}>
      {currentUser?.role !== "admin" && (
        <>
          <button onClick={handleSeeAllProducts}>See all products</button>
          <button onClick={handleManageMyProducts}>Manage my products</button>
          <div className={styles.divider} />
        </>
      )}
      <button role="button" onClick={handleLogOut}>
        Log out
      </button>
    </div>
  );
};
