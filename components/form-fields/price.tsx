import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { Input } from "../ui/input";

type Props = {
  form: UseFormReturn<any, any, undefined>;
};

export function PriceFormField({ form }: Props) {
  return (
    <>
      <FormField
        control={form.control}
        name="price"
        render={({ field }) => (
          <FormItem>
            {/* <FormLabel className="text-c-primary-marine-blue flex items-center justify-between">
              <FormMessage>{form?.formState.errors.price?.message}</FormMessage>
            </FormLabel> */}
            <FormControl>
              <div className="flex-row inline-flex items-center">
                <Input
                  type={`number`}
                  placeholder="Purchase price"
                  {...field}
                />
                <span>$</span>
              </div>
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );
}

export function RentFormField({ form }: Props) {
  return (
    <>
      <FormField
        control={form.control}
        name="rent"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="flex-row inline-flex items-center">
                <Input type={`number`} placeholder="0.0" {...field} />
                <span>$</span>
              </div>
            </FormControl>
          </FormItem>
        )}
      />
    </>
  );
}

export function RateFormField({ form }: Props) {
  return (
    <>
      <FormField
        control={form.control}
        name="rate"
        render={({ field }) => (
          <FormItem>
            {/* <FormLabel>Email</FormLabel> */}
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a value" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="day">Per day</SelectItem>
                <SelectItem value="week">Per week</SelectItem>
                <SelectItem value="month">Per month</SelectItem>
                <SelectItem value="year">Per year</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
