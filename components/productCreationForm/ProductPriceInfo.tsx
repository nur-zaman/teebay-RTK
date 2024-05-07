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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PriceFormField,
  RentFormField,
  RateFormField,
} from "../form-fields/price";

const formSchema = z.object({
  price: z.coerce.number().min(1, { message: "Purchase price is required" }),
  rent: z.coerce.number().min(1, { message: "Rent price is required" }),
  rate: z.string().min(1, { message: "Can't be empty" }),
});

type ValidationSchema = z.infer<typeof formSchema>;

export default function ProductPriceInfo() {
  const { product, step, setProduct, increaseStep, decreaseStep } = useStore(
    (state) => state
  );
  const form = useForm<ValidationSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: product.priceInfo.price,
      rent: product.priceInfo.rent,
      rate: product.priceInfo.rate,
    },
  });

  const onSubmitHandler = (values: ValidationSchema) => {
    setProduct({ ...product, ...{ priceInfo: values } });
    increaseStep(4);
  };

  return (
    <Container
      onNext={form.handleSubmit(onSubmitHandler)}
      onPreviousStep={() => decreaseStep(step)}
    >
      <h1 className="text-3xl text-center">Select price</h1>

      <Form {...form}>
        <form
          className="flex flex-col gap-6 justify-center items-center"
          onSubmit={() => form.handleSubmit(onSubmitHandler)}
        >
          <PriceFormField form={form} />

          <div>
            <h2 className="text-lg font-semibold text-c-primary-marine-blue">
              Rent
            </h2>

            <div className="flex items-center gap-6 mt-2">
              <RentFormField form={form} />
              <RateFormField form={form} />
            </div>
            <FormMessage>{form.formState.errors.rate?.message}</FormMessage>
          </div>
        </form>
      </Form>
    </Container>
  );
}
