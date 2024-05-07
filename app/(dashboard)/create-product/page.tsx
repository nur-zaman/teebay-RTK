"use client";
import ProductCategories from "@/components/productCreationForm/ProductCategories";
import ProductDescription from "@/components/productCreationForm/ProductDescription";
import ProductPriceInfo from "@/components/productCreationForm/ProductPriceInfo";
import ProductSummary from "@/components/productCreationForm/ProductSummary";
import ProductTitle from "@/components/productCreationForm/ProductTitle";
import useStore from "@/store/useStore";

export default function CreateProductPage() {
  const { step } = useStore((state) => state);
  return (
    <>
      {step === 1 && <ProductTitle />}
      {step === 2 && <ProductCategories />}
      {step === 3 && <ProductDescription />}
      {step === 4 && <ProductPriceInfo />}
      {step === 5 && <ProductSummary />}
    </>
  );
}
