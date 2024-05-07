"use client";

import React from "react";
import * as z from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import useStore from "@/store/useStore";
import Container from "./Container";
import TitleFormField from "../form-fields/title";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }).max(100),
});

type ValidationSchema = z.infer<typeof formSchema>;

export default function ProductTitle() {
  const { product, setProduct, increaseStep } = useStore((state) => state);
  const form = useForm<ValidationSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: product.title },
  });

  const onSubmitHandler = (values: ValidationSchema) => {
    setProduct({ ...product, ...values });
    increaseStep(1);
  };

  return (
    <Container onNext={form.handleSubmit(onSubmitHandler)}>
      <h1 className=" text-3xl text-center">Select a title for your product</h1>
      <Form {...form}>
        <form
          className="flex flex-col gap-6"
          onSubmit={() => form.handleSubmit(onSubmitHandler)}
        >
          <TitleFormField form={form} />
        </form>
      </Form>
    </Container>
  );
}
