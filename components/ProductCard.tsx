import { Trash2 } from "lucide-react";
import Link from "next/link";
import { Category, Product } from "@/types/productType";
import { ConfirmAlert } from "./ConfirmAlert";
import { useRouter } from "next/navigation";
import { useDeleteProductMutation } from "@/apiSlice";

export default function ProductCard({
  product,
  status,
  hideDeleteButton,
  onclickURL,
}: {
  product: Product;
  status?: string | null;
  hideDeleteButton?: boolean;
  onclickURL: string;
}) {
  const { id, title, price, rent, description, createdAt, rate } = product;
  const categories = product.categories as Category[];

  const [deleteProduct] = useDeleteProductMutation();
  const router = useRouter();
  const handleDelete = async () => {
    try {
      await deleteProduct(id);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg">
      <div className="flex justify-between items-start">
        <div
          onClick={() => {
            console.log(`/${onclickURL}${id}`);
            router.push(`/${onclickURL}${id}`);
          }}
          className="hover:cursor-pointer"
        >
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-gray-600">
            Categories:
            {categories.length > 0
              ? categories.map((cat) => cat.name).join(", ")
              : "No categories"}
          </p>
        </div>

        {!hideDeleteButton && (
          <ConfirmAlert
            optionYes="Yes"
            optionNo="No"
            yesAction={handleDelete}
            message="Are you sure you want to delete this product?"
          >
            <button className="text-gray-400 hover:text-red-500">
              <span className="sr-only">Delete</span>
              <Trash2 />
            </button>
          </ConfirmAlert>
        )}
      </div>
      <p className="mt-2">
        Price: ${price} | Rent: ${rent} per {rate.toLowerCase()}
      </p>
      <p className="mt-2 text-gray-700 line-clamp-3">{description}</p>
      {description.length > 200 && (
        <Link
          href={`/${onclickURL}${product.id}`}
          className="text-blue-500 hover:text-blue-700"
        >
          More Details
        </Link>
      )}
      <div className=" flex justify-between w-full mt-2 text-xs text-gray-500 gap-x-14">
        <span>
          Date posted:{" "}
          {new Date(createdAt as string).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
        <span className="">{0} views</span>
      </div>
    </div>
  );
}
