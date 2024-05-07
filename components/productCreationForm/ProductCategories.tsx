"use client";

import React from "react";
import useStore from "@/store/useStore";
import Container from "./Container";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Form } from "@/components/ui/form";
import { Option } from "@/components/ui/multiple-selector";
import CategoriesFormField from "../form-fields/categories";

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

const optionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});

const FormSchema = z.object({
  categories: z
    .array(optionSchema)
    .min(1, { message: "Select at least one category" }),
});

type ValidationSchema = z.infer<typeof FormSchema>;

export default function ProductCategories() {
  const { product, step, setProduct, increaseStep, decreaseStep } = useStore(
    (state) => state
  );

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { categories: product.categories },
  });

  const onSubmitHandler = (values: ValidationSchema) => {
    setProduct({ ...product, ...values });
    increaseStep(2);
  };

  const onPrevious = () => {
    decreaseStep(step);
  };

  return (
    <Container
      onNext={form.handleSubmit(onSubmitHandler)}
      onPreviousStep={onPrevious}
    >
      <h1 className=" text-3xl text-center">Select Catagories</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmitHandler)}
          className="flex flex-col gap-6"
        >
          <CategoriesFormField OPTIONS={OPTIONS} form={form} />
        </form>
      </Form>
    </Container>
  );
}
