"use client";
import React from "react";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { UseFormReturn } from "react-hook-form";
import { AutosizeTextarea } from "../ui/autosize-textarea";

type Props = {
  form: UseFormReturn<any, any, undefined>;
};

export default function DescriptionFormField({ form }: Props) {
  return (
    <>
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            {/* <FormLabel htmlFor="description"></FormLabel> */}
            <FormControl>
              <AutosizeTextarea maxHeight={500} id="description" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
