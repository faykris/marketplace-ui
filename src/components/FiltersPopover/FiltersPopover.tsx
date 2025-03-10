import { useState } from "react";
import { cx } from "class-variance-authority";
import { Popover } from "../../components/Popover/Popover.tsx";
import styles from "./FiltersPopover.module.css";
import { NumericFormat } from "react-number-format";
import { PrimaryButton } from "../../components/PrimaryButton/PrimaryButton.tsx";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store.ts";

type FilterFormFields = {
  minPrice: string;
  maxPrice: string;
  sellerIds: string[];
};

type Props = {
  onSearchWithFilters: (
    minPrice?: number,
    maxPrice?: number,
    sellerIds?: string[]
  ) => void;
};

export const FiltersPopover = ({ onSearchWithFilters }: Props) => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const { sellers } = useSelector((state: RootState) => state.user);
  const [open, setOpen] = useState(false);
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FilterFormFields>({
    defaultValues: { minPrice: "", maxPrice: "", sellerIds: [] },
    mode: "onTouched",
  });
  const selectedSellerIds = watch("sellerIds");
  const onApplyFilter = (data: FilterFormFields) => {
    if (errors.maxPrice) {
      return;
    }

    const minPriceNumber =
      data.minPrice !== "" ? parseInt(data.minPrice) : undefined;
    const maxPriceNumber =
      data.maxPrice !== "" ? parseInt(data.maxPrice) : undefined;

    onSearchWithFilters(minPriceNumber, maxPriceNumber, data.sellerIds);
    setOpen(false);
  };

  return (
    <Popover
      setIsOpen={setOpen}
      isOpen={open}
      triggerComponent={
        <button className={styles.filtersButton}>
          <span
            className={cx(styles.filterIcon, "material-symbols-outlined")}
            onClick={() => setOpen(true)}
          >
            tune
          </span>
        </button>
      }
      contentClassName={styles.popoverContent}
    >
      <div className={styles.content}>
        <p className={styles.title}>Filters</p>
        <div className={styles.priceInputs}>
          <div className={styles.formField}>
            <label htmlFor="minPrice" className={styles.formLabel}>
              Min price
            </label>
            <Controller
              name="minPrice"
              control={control}
              render={({ field: { onChange, value } }) => (
                <NumericFormat
                  id="minPrice"
                  value={value}
                  onValueChange={(values) => onChange(values.value)}
                  thousandSeparator={true}
                  prefix="$"
                  placeholder="Min Price"
                  className={styles.input}
                  decimalScale={0}
                />
              )}
            />
          </div>
          <div className={styles.formField}>
            <label htmlFor="maxPrice" className={styles.formLabel}>
              Max price
            </label>
            <Controller
              name="maxPrice"
              control={control}
              rules={{
                validate: (value) => {
                  const minVal = watch("minPrice");

                  if (minVal && value && parseInt(value) < parseInt(minVal)) {
                    return "Max price must be greater than or equal to min price";
                  }

                  return true;
                },
              }}
              render={({ field: { onChange, value } }) => (
                <NumericFormat
                  id="maxPrice"
                  value={value}
                  onValueChange={(values) => onChange(values.value)}
                  thousandSeparator={true}
                  prefix="$"
                  placeholder="Max Price"
                  className={styles.input}
                  decimalScale={0}
                />
              )}
            />
          </div>
        </div>
        {currentUser?.role === "admin" && (
          <div className={styles.sellersFilter}>
            <p className={styles.sellersTitle}>Sellers</p>

            {sellers?.map((seller) => (
              <div key={seller.id} className={styles.seller}>
                <input
                  type="checkbox"
                  id={`seller-${seller.id}`}
                  value={seller.id}
                  className={styles.sellerCheckbox}
                  checked={selectedSellerIds.includes(seller.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setValue("sellerIds", [...selectedSellerIds, seller.id]);
                    } else {
                      setValue(
                        "sellerIds",
                        selectedSellerIds.filter((id) => id !== seller.id)
                      );
                    }
                  }}
                />

                <label htmlFor={`seller-${seller.id}`}>{seller.username}</label>
              </div>
            ))}
          </div>
        )}
        {errors.maxPrice && (
          <span className={styles.error}>{errors.maxPrice.message}</span>
        )}
        <PrimaryButton
          className={styles.applyFiltersButton}
          variant="default"
          onClick={handleSubmit(onApplyFilter)}
        >
          Apply
        </PrimaryButton>
      </div>
    </Popover>
  );
};
