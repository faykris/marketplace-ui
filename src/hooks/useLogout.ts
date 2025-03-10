import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../state/store.ts";
import { logout } from "../state/auth/authSlice.ts";
import { resetUser } from "../state/user/userSlice.ts";
import { resetProductsByOwnerId } from "../state/product/productSlice.ts";

export const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const logoutUser = async () => {
    localStorage.clear();
    dispatch(logout());
    dispatch(resetUser());
    dispatch(resetProductsByOwnerId());
    navigate("/");
  };

  return { logoutUser };
};
