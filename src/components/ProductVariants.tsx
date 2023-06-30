import { useSignal, type Signal } from "@preact/signals";
import Typography from "@components/Typography";
import type { PricedVariant } from "@medusajs/medusa/dist/types/pricing";
import { cx } from "class-variance-authority";
import { useEffect } from "preact/hooks";

interface Props {
  productVariants?: PricedVariant[];
  productIndex: Signal<number>;
}

const ProductVariants = ({ productVariants, productIndex }: Props) => {
  const stockMessage = useSignal<string>("");

  const handleVariant = (index: number) => {
    productIndex.value = index;
  };

  useEffect(() => {
    stockMessage.value = "";
    if (!productVariants?.length) return;
    const selectedVariant = productVariants[productIndex.value];
    if (
      selectedVariant.inventory_quantity &&
      selectedVariant.inventory_quantity <= 10
    ) {
      stockMessage.value = "Hurry up! Limited stock available";
    }
  }, [productIndex.value]);

  return (
    <div>
      <div class="flex items-center justify-between">
        <Typography size="body2/medium" variant="primary">
          Variants
        </Typography>
      </div>
      <fieldset class="mt-2">
        <legend class="sr-only">Choose a Variant</legend>
        <div class="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {productVariants?.length
            ? productVariants.map((variant, index) => (
                <label
                  class={cx(
                    `flex items-center justify-center rounded-md border py-3 px-3 text-sm font-medium uppercase sm:flex-1 cursor-pointer focus:outline-none`,
                    index === productIndex.value
                      ? "border-transparent bg-primary-600 text-white hover:bg-primary-700"
                      : "border-gray-200 bg-white text-gray-900 hover:bg-gray-50"
                  )}
                >
                  <input
                    type="radio"
                    name="variant-choice"
                    value={variant.title}
                    class="sr-only"
                    onInput={() =>
                      variant.id && variant.title && variant.prices
                        ? handleVariant(index)
                        : undefined
                    }
                    aria-labelledby="variant-choice-0-label"
                  />
                  <span id="variant-choice-0-label">{variant.title}</span>
                </label>
              ))
            : "Product variant not available"}
        </div>
      </fieldset>
      <Typography size="body1/semi-bold" className="mt-4" variant="error">
        {stockMessage.value}
      </Typography>
    </div>
  );
};

export default ProductVariants;
