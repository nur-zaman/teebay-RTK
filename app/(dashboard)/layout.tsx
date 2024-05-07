import { SideMenu } from "@/components/SideMenu";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import type { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <main>
      <SideMenu>
        <Button className="mt-4 ml-4" variant="outline">
          <Menu />
        </Button>
      </SideMenu>
      {children}
    </main>
  );
}
