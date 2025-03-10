import { ReactNode, useEffect } from "react";
import { TopNavBar } from "../../components/TopNavBar/TopNavBar.tsx";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../state/store.ts";
import { fetchUserById } from "../../state/user/userSlice.ts";
import styles from "./HomePage.module.css";

type Props = {
  children: ReactNode;
};

export const HomePage = ({ children }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      dispatch(fetchUserById(userId));
    }
  }, [dispatch]);

  return (
    <div className={styles.homePageRoot}>
      <div className={styles.shapeContainer}>
        <div className={styles.shape}></div>
      </div>
      <TopNavBar />
      {children}
    </div>
  );
};
