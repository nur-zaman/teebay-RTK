"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { signup } from "@/utils/auth";

const signupSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    address: z.string().min(1, "Address is required"),
    email: z.string().email("Invalid email address"),
    phoneNumber: z.string().min(1, "Phone number is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Confirm password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

type ValidationSchema = z.infer<typeof signupSchema>;

export function SignupForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");

  const onSubmitHandler = async (values: ValidationSchema) => {
    try {
      const response = await signup(values);

      if (response.ok) {
        console.log("Signup successful!");
        router.push("/");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "An error occurred during signup.");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const form = useForm<ValidationSchema>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
  });

  const {
    control,
    formState: { errors },
  } = form;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitHandler)} className="max-w-md">
        <div className="text-3xl pb-4 text-center">SIGN UP</div>
        <Card className="w-full shadow-md">
          <CardContent className="grid gap-8">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <FormMessage>{errors.firstName?.message}</FormMessage>
                    </FormLabel>
                    <FormControl>
                      <Input
                        required
                        type="text"
                        placeholder="First Name"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <FormMessage>{errors.lastName?.message}</FormMessage>
                    </FormLabel>
                    <FormControl>
                      <Input
                        required
                        type="text"
                        placeholder="Last Name"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <FormMessage>{errors.address?.message}</FormMessage>
                  </FormLabel>
                  <FormControl>
                    <Input
                      required
                      type="text"
                      placeholder="Address"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
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
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <FormMessage>{errors.phoneNumber?.message}</FormMessage>
                    </FormLabel>
                    <FormControl>
                      <Input
                        required
                        type="tel"
                        placeholder="Phone Number"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="relative">
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
                        required
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <span
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </span>
            </div>
            <div className="relative">
              <FormField
                control={control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <FormMessage>
                        {errors.confirmPassword?.message}
                      </FormMessage>
                    </FormLabel>
                    <FormControl>
                      <Input
                        required
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <span
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </span>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-y-8 items-center">
            <Button onClick={form.handleSubmit(onSubmitHandler)}>
              Register
            </Button>
            {error && (
              <div className="text-red-500 text-center mt-4">{error}</div>
            )}
            <div>
              Already have an account?{" "}
              <Link href="/" className="text-blue-600">
                Sign In
              </Link>
            </div>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
