
import React from "react";
import useStore from "@/zustand-store/useStore";
import NavigationButtons from "./NavigationButtons";
import { cn } from "@/lib/utils";

type TContainer = {
  children: React.ReactNode;
  className?: string;
  onNext: () => void;
  onPreviousStep?: () => void;
};

export default function Container({
  children,
  className,
  onNext,
  onPreviousStep,
}: TContainer) {
  const { step, isSubmitted } = useStore((state) => state);
  return (
    <>
      <section
        className={cn(
          "w-[80vw] flex flex-col gap-8",
          className
        )}
      >
        <div className="w-full relative">
          {children}
          {!isSubmitted && (
            <NavigationButtons
              className="hidden lg:inline-flex lg:bottom-0 lg:left-0 lg:right-0"
              onHandleNextStep={onNext}
              onHandlePreviousStep={onPreviousStep}
            />
          )}
        </div>
      </section>
      {!isSubmitted && (
        <NavigationButtons
          className={cn(
            "inline-flex lg:hidden bottom-0 left-0 right-0",
            { "-bottom-32": step === 2 }
          )}
          onHandleNextStep={onNext}
          onHandlePreviousStep={onPreviousStep}
        />
      )}
    </>
  );
}
