"use client";
import { Product } from "@/types/productType";
import React from "react";
import { Form } from "@/components/ui/form";
import DescriptionFormField from "./form-fields/description";
import TitleFormField from "./form-fields/title";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Option } from "./ui/multiple-selector";
import CategoriesFormField from "./form-fields/categories";
import {
  PriceFormField,
  RentFormField,
  RateFormField,
} from "./form-fields/price";
import { Button } from "./ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { redirect, useRouter } from "next/navigation";
// import { updateProduct } from "@/utils/products";
import { useUpdateProductMutation, useGetProductsQuery } from "@/apiSlice";

interface EditProductProps {
  productId: string | null;
  status?: string;
}

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }).max(100),

  price: z.coerce.number().min(1, { message: "Purchase price is required" }),
  rent: z.coerce.number().min(1, { message: "Rent price is required" }),
  rate: z.string().min(1, { message: "Can't be empty" }),
  description: z.string().min(1, { message: "Description is required" }),
  categories: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
        disable: z.boolean().optional(),
      })
    )
    .min(1, { message: "Select at least one category" }),
});

type ValidationSchema = z.infer<typeof formSchema>;

export default function EditProduct({ productId, status }: EditProductProps) {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    console.log("please log in first");
    redirect("/");
    throw new Error("User ID invalid");
  }
  // const [updateProduct] = useUpdateProductMutation();
  const router = useRouter();
  const { data: products } = useGetProductsQuery({
    userId,
    status,
    exceptUserId: undefined,
    exceptStatus: undefined,
  });
  const product: Product | undefined = products?.find(
    (p: Product) => p.id === productId
  );

  if (!product) {
    console.log("Product ID invalid");
    redirect(`/my-products`);
    throw new Error("Product ID invalid");
  }

  const extractedCategories: Option[] = product.categories.map((category) => {
    return {
      label: category.name as Option["label"],
      value: category.name as Option["value"],
    };
  });

  const CATEGORIES = [
    "ELECTRONICS",
    "FURNITURE",
    "HOME APPLIANCES",
    "SPORTING GOODS",
    "OUTDOOR",
    "TOYS",
  ];

  const OPTIONS: Option[] = CATEGORIES.map((category) => ({
    label: category,
    value: category.toLowerCase(),
  }));

  const form = useForm<ValidationSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: product.description,
      title: product.title,
      categories: extractedCategories,
      price: product.price,
      rent: product.rent,
      rate: product.rate.toString().toLowerCase(),
    },
  });

  // RTK Query mutation for updating product
  const [updateProduct, { isLoading, error }] = useUpdateProductMutation();

  const onSubmitHandler = async (values: ValidationSchema) => {
    const formattedProduct: Product = {
      id: product.id,
      userId: product.userId,
      title: values.title,
      description: values.description,
      price: values.price,
      rent: values.rent,
      rate: values.rate.toUpperCase() as Product["rate"],
      // categories: values.categories.map((cat) => ({ name: cat.label })),
      categories: values.categories.map((cat) => cat.label),
    };

    try {
      await updateProduct({ id: formattedProduct.id, ...formattedProduct }); // Pass id and patch data
      if (!error) {
        router.push("/my-products");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <Form {...form}>
      <form className="w-full  " onSubmit={form.handleSubmit(onSubmitHandler)}>
        <div className=" py-4 w-full">
          <span className=" text-sm">Title</span>
          <TitleFormField form={form} />
        </div>
        <div className="py-4">
          <span className=" text-sm ">Categories</span>
          <CategoriesFormField OPTIONS={OPTIONS} form={form} />
        </div>

        <div className="py-4">
          <span className=" text-sm h-20 ">Description</span>
          <DescriptionFormField form={form} />
        </div>

        <div className="flex py-4 flex-row">
          <div className="px-2">
            <span className=" text-sm ">Price</span>
            <PriceFormField form={form} />
          </div>

          <div className="px-2">
            <span className=" text-sm ">Rent</span>
            <RentFormField form={form} />
          </div>

          <div className="px-2">
            <span className=" text-sm "> Rate</span>
            <RateFormField form={form} />
          </div>
        </div>
        <div className="py-6 flex justify-end">
          <Button onClick={() => onSubmitHandler} className=" ">
            Edit Product
          </Button>
        </div>
      </form>
    </Form>
  );
}
