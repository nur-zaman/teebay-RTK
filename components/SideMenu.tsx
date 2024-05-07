import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ReactNode } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";

const menuItems = [
  {
    title: "My Product",
    href: "/my-products",
  },

  {
    title: "All Products",
    href: "/all-products",
  },
  {
    title: "Product Status",
    href: "/product-status",
  },
];

export function SideMenu({ children }: { children: ReactNode }) {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        {/* <Button className="my-4 w-full">
          <Link className="w-full" href="/my-products">
            My Product
          </Link>
        </Button> */}
        {menuItems.map((item) => (
          <Button
            key={item.title}
            className="my-4 w-full"
            variant="outline"
            color="primary"
          >
            <Link href={item.href}>{item.title}</Link>
          </Button>
        ))}
        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
