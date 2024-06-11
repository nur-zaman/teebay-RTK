"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/shared/redux/rtk-apis/user/user.api";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string(),
});

type ValidationSchema = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>();
  const [login] = useLoginMutation();

  // const [login, { isLoading }] = useLoginMutation();

  const onSubmitHandler = async (values: ValidationSchema) => {
    try {
      const response = await login(values).unwrap(); 
      
      localStorage.setItem("userId", response.id);
      router.push("/my-products");
    } catch (err) {
   
      setError(err.message);
    }
  };

  const form = useForm<ValidationSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    control,
    formState: { errors },
  } = form;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitHandler)} className="max-w-sm">
        <div className="text-xl pb-4 text-center">SIGN IN</div>
        <Card className="w-full max-w-sm shadow-md">
          <CardContent className="grid gap-8">
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <FormMessage>{errors.email?.message}</FormMessage>
                  </FormLabel>
                  <FormControl>
                    <Input
                      required
                      type="email"
                      placeholder="Email"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <FormMessage>{errors.password?.message}</FormMessage>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      required
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-center content-center flex-col gap-y-8">
            <Button>{"Sign in"}</Button>
            {error && (
              <span className=" text-red-600">Wrong Email Or Password</span>
            )}
            <div>
              {" Don't have an account?"}
              <Link href="/signup" className="text-blue-600">
                Sign Up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
