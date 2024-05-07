"use client";

import React from "react";
import * as z from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import useStore from "@/store/useStore";
import Container from "./Container";
import DescriptionFormField from "../form-fields/description";

const formSchema = z.object({
  description: z.string().min(1, { message: "Description is required" }),
});

type ValidationSchema = z.infer<typeof formSchema>;

export default function ProductDescription() {
  const { product, step, setProduct, increaseStep, decreaseStep } = useStore(
    (state) => state
  );
  const form = useForm<ValidationSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { description: product.description },
  });

  const onSubmitHandler = (values: ValidationSchema) => {
    setProduct({ ...product, ...values });
    increaseStep(3);
  };

  const onPrevious = () => {
    decreaseStep(step);
  };
  return (
    <Container
      onNext={form.handleSubmit(onSubmitHandler)}
      onPreviousStep={onPrevious}
    >
      <h1 className=" text-3xl text-center">Product Description</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmitHandler)} className="">
          <DescriptionFormField form={form} />
        </form>
      </Form>
    </Container>
  );
}
