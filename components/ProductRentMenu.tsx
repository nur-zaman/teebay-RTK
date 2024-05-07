import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode } from "react";
import { DatePicker } from "./ui/datepicker";

type props = {
  children: ReactNode;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
  handleRentProduct: () => void;
};

export function ProductRentMenu({
  children,
  setStartDate,
  setEndDate,
  handleRentProduct,
}: props) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Rental Period</DialogTitle>
        </DialogHeader>
        <DatePicker onSelect={setStartDate} />
        <DatePicker onSelect={setEndDate} />
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="destructive">
              Go Back
            </Button>
          </DialogClose>
          <Button type="submit" onClick={handleRentProduct}>
            Confirm Rent
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
