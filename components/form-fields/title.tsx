import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { Input } from "../ui/input";

type Props = {
  form: UseFormReturn<any, any, undefined>;
};

export default function TitleFormField({ form }: Props) {
  return (
    <>
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            {/* <FormLabel className="text-c-primary-marine-blue flex items-center justify-between">
              <FormMessage>{form.formState.errors.title?.message}</FormMessage>
            </FormLabel> */}
            <FormControl>
              <Input
                required
                placeholder="Iphone 12 Pro Ultra Max Mini Super Cool"
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );
}
