import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { PrimaryButton } from "../../components/PrimaryButton/PrimaryButton.tsx";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../state/store.ts";
import { loginUser } from "../../state/auth/authSlice.ts";
import { fetchUserById } from "../../state/user/userSlice.ts";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SignInForm.module.css";

type FormFields = {
  username: string;
  password: string;
};

type Props = {
  onCloseDialog: () => void;
};

export const SignInForm = ({ onCloseDialog }: Props) => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    mode: "onSubmit",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormFields) => {
    const result = await dispatch(
      loginUser({
        username: data.username,
        password: data.password,
      })
    ).unwrap();

    if ("error" in result || !("id" in result)) {
      const errorMsg = result.error || "Login failed, please try again.";

      setLoginError(errorMsg);
    } else {
      toast.success("Login successful!");
      setLoginError(null);
      dispatch(fetchUserById(result.id.toString()));
      onCloseDialog();

      if (result.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/seller-dashboard");
      }
    }
  };

  return (
    <form className={styles.formRoot} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formField}>
        <label htmlFor="username" className={styles.formLabel}>
          Username
        </label>
        <input
          id="username"
          className={styles.input}
          type="text"
          {...register("username", {
            required: "Username is required",
          })}
          placeholder="Enter your username"
        />
        {errors.username && (
          <span className={styles.error}>{errors.username.message}</span>
        )}
      </div>
      <div className={styles.formField}>
        <label htmlFor="password" className={styles.formLabel}>
          Password
        </label>
        <input
          id="password"
          className={styles.input}
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Must be at least 8 characters",
            },
          })}
          placeholder="Enter your password"
        />
        {errors.password && (
          <span className={styles.error}>{errors.password.message}</span>
        )}
      </div>

      {loginError && <p className={styles.loginErrorMessage}>{loginError}</p>}

      <PrimaryButton
        type="submit"
        disabled={isSubmitting}
        variant="default"
        className={styles.submitButton}
      >
        {isSubmitting ? "Logging in..." : "Log in"}
      </PrimaryButton>
    </form>
  );
};
