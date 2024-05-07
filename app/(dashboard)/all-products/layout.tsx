import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col">
      <div className="m-2 self-end">
        <Link href="/">
          <Button variant={"destructive"}>LOGOUT</Button>
        </Link>
      </div>
      {children}
    </div>
  );
}
