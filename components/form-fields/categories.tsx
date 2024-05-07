import React from "react";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { UseFormReturn } from "react-hook-form";

type Props = {
  OPTIONS: Option[];
  form: UseFormReturn<any, any, undefined>;
};

export default function CategoriesFormField({ OPTIONS, form }: Props) {
  return (
    <>
      <FormField
        control={form.control}
        name="categories"
        render={({ field }) => (
          // <CategoriesFormItem OPTIONS={OPTIONS} field={field} />
          <FormItem>
            {/* <FormLabel><FormMessage>{errors.title?.message}</FormMessage></FormLabel> */}
            <FormControl>
              <MultipleSelector
                hidePlaceholderWhenSelected
                value={field.value}
                onChange={field.onChange}
                defaultOptions={OPTIONS}
                placeholder="Select a category"
                emptyIndicator={
                  <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                    no results found.
                  </p>
                }
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
