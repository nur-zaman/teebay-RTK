"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useStore from "@/store/useStore";

type TFooter = {
  className?: string;
  onHandleNextStep?: () => void;
  onHandlePreviousStep?: () => void;
};

export default function NavigationButtons({
  className,
  onHandleNextStep,
  onHandlePreviousStep,
}: TFooter) {
  const step = useStore((state) => state.step);
  return (
    <footer className={cn(" flex justify-between w-full py-4", className)}>
      {step === 1 && <div className="w-full" />}

      {step > 1 && (
        <Button className="" onClick={onHandlePreviousStep}>
          Back
        </Button>
      )}
      <Button
        className={cn("", {
          "": step === 5,
        })}
        onClick={onHandleNextStep}
      >
        {step === 5 ? "Confirm" : "Next"}
      </Button>
    </footer>
  );
}
