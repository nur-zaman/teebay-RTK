import type { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="w-full flex flex-col justify-center items-center p-10 h-screen">
      {children}
    </div>
  );
}
