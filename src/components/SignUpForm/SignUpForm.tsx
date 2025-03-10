import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import styles from "./SignUpForm.module.css";
import { PrimaryButton } from "../../components/PrimaryButton/PrimaryButton.tsx";
import { AppDispatch } from "../../state/store.ts";
import { registerUser } from "../../state/auth/authSlice.ts";
import { fetchUserById } from "../../state/user/userSlice.ts";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type FormFields = {
  username: string;
  password: string;
  passwordConfirmation: string;
};

type Props = {
  onCloseDialog: () => void;
};

export const SignUpForm = ({ onCloseDialog }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const [signUpError, setSignUpError] = useState<string | null>(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    mode: "onSubmit",
    defaultValues: {
      username: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit = async (data: FormFields) => {
    if (data.password !== data.passwordConfirmation) {
      toast("Passwords don't match");

      return;
    }

    const result = await dispatch(
      registerUser({
        username: data.username,
        password: data.password,
      })
    ).unwrap();

    if ("error" in result || !("id" in result)) {
      if (result.message === "Username already exists") {
        setSignUpError("Username already exists");
        toast.error("Username already exists, please try again.");
      } else {
        toast.error("Registration failed, please try again.");
      }
    } else {
      toast.success("Registration successful!");
      onCloseDialog();
      dispatch(fetchUserById(result.id.toString()));
      navigate("/seller-dashboard");
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
      <div className={styles.formField}>
        <label htmlFor="passwordConfirmation" className={styles.formLabel}>
          Confirm Password
        </label>
        <input
          id="passwordConfirmation"
          className={styles.input}
          type="password"
          {...register("passwordConfirmation", {
            required: "Please confirm your password",
            validate: (value) =>
              value === watch("password") || "Passwords don't match",
          })}
          placeholder="Confirm your password"
        />
        {errors.passwordConfirmation && (
          <span className={styles.error}>
            {errors.passwordConfirmation?.message}
          </span>
        )}
      </div>
      {signUpError && <span className={styles.error}>{signUpError}</span>}
      <PrimaryButton
        type="submit"
        disabled={isSubmitting}
        variant="default"
        className={styles.submitButton}
      >
        {isSubmitting ? "Signing up..." : "Sign up"}
      </PrimaryButton>
    </form>
  );
};
