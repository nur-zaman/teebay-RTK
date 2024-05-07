"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordToggle({
  placeholder,
}: {
  placeholder: string;
}) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  return (
    <div className="relative">
      <Input
        id={placeholder.replace(/ /g, "-")}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        required
      />
      <span
        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
        onClick={togglePasswordVisibility}
      >
        {showPassword ? <Eye /> : <EyeOff />}
      </span>
    </div>
  );
}
