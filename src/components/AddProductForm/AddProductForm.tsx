import { Controller, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { PrimaryButton } from "../../components/PrimaryButton/PrimaryButton.tsx";
import { AppDispatch, RootState } from "../../state/store.ts";
import {
  createProduct,
  getProductsByOwnerId,
} from "../../state/product/productSlice.ts";
import styles from "./AddProductForm.module.css";

type Props = {
  onCloseDialog: () => void;
};

export type formValues = {
  productName: string;
  price: string;
  quantity: string;
  sku: string;
  imageUrl: string;
};

export const AddProductForm = ({ onCloseDialog }: Props) => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<formValues>({
    mode: "onSubmit",
    defaultValues: {
      productName: "",
      price: undefined,
      quantity: undefined,
      sku: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (data: formValues) => {
    const numericPrime = Number(data.price.replace(/[^0-9.-]+/g, ""));
    if (currentUser?.id) {
      const result = await dispatch(
        createProduct({
          ...data,
          name: data.productName,
          price: numericPrime,
          quantity: Number(data.quantity),
          ownerId: Number(currentUser.id),
        })
      ).unwrap();

      if ("error" in result || !("id" in result)) {
        toast.error("Product creation failed, please try again.");
      } else {
        toast.success("Product creation successful!");
        onCloseDialog();
        dispatch(getProductsByOwnerId(currentUser.id));
      }
    }
  };

  return (
    <form className={styles.formRoot} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formField}>
        <label htmlFor="productName" className={styles.formLabel}>
          Name
        </label>
        <input
          id="productName"
          className={styles.input}
          type="text"
          {...register("productName", {
            required: "Name is required",
          })}
          placeholder="Enter product name"
        />
        {errors.productName && (
          <span className={styles.error}>{errors.productName.message}</span>
        )}
      </div>
      <div className={styles.formField}>
        <label htmlFor="sku" className={styles.formLabel}>
          Sku
        </label>
        <input
          id="sku"
          className={styles.input}
          type="text"
          {...register("sku", {
            required: "Sku is required",
          })}
          placeholder="Enter sku"
        />
        {errors.sku && (
          <span className={styles.error}>{errors.sku.message}</span>
        )}
      </div>
      <div className={styles.formField}>
        <label htmlFor="price" className={styles.formLabel}>
          Price
        </label>
        <Controller
          control={control}
          name="price"
          rules={{ required: "Price is required" }}
          render={({ field }) => (
            <NumericFormat
              {...field}
              id="price"
              className={styles.input}
              thousandSeparator={true}
              prefix={"$"}
              decimalScale={0}
              placeholder="Enter price"
              onValueChange={(values) => {
                field.onChange(values.floatValue);
              }}
            />
          )}
        />
        {errors.price && (
          <span className={styles.error}>{errors.price.message}</span>
        )}
      </div>
      <div className={styles.formField}>
        <label htmlFor="quantity" className={styles.formLabel}>
          Quantity
        </label>
        <input
          id="quantity"
          className={styles.input}
          type="number"
          {...register("quantity", {
            required: "Quantity is required",
          })}
          placeholder="Enter quantity"
        />
        {errors.quantity && (
          <span className={styles.error}>{errors.quantity.message}</span>
        )}
      </div>
      <div className={styles.formField}>
        <label htmlFor="imageUrl" className={styles.formLabel}>
          Image url
        </label>
        <input
          id="imageUrl"
          className={styles.input}
          type="text"
          {...register("imageUrl", {
            required: "Image url is required",
          })}
          placeholder="Enter image url"
        />
        {errors.imageUrl && (
          <span className={styles.error}>{errors.imageUrl.message}</span>
        )}
      </div>
      <PrimaryButton
        type="submit"
        disabled={isSubmitting}
        variant="default"
        className={styles.submitButton}
      >
        {isSubmitting ? "Adding product..." : "Add product"}
      </PrimaryButton>
    </form>
  );
};
