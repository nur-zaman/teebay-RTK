"use client";
import ProductList from "@/components/ProductList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { redirect } from "next/navigation";

export default function ProductStatusPage() {
  const userId = localStorage.getItem("userId");

  if (!userId) {
    redirect("/");
    throw new Error("User ID invalid");
  }
  return (
    <Tabs defaultValue="account" className="w-full p-4">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="bought">Bought</TabsTrigger>
        <TabsTrigger value="sold">Sold</TabsTrigger>
        <TabsTrigger value="borrowed">Borrowed</TabsTrigger>
        <TabsTrigger value="lent">Lent</TabsTrigger>
      </TabsList>
      <TabsContent value="bought">
        <ProductList
          status={"SOLD"}
          userId={userId}
          onclickURL="#"
          hideDeleteButton={true}
        />
      </TabsContent>
      <TabsContent value="sold">
        <ProductList
          status={"SOLD"}
          exceptUserId={userId}
          onclickURL="#"
          hideDeleteButton={true}
        />
      </TabsContent>
      <TabsContent value="borrowed">
        <ProductList
          status={"RENTED"}
          userId={userId}
          onclickURL="#"
          hideDeleteButton={true}
        />
      </TabsContent>
      <TabsContent value="lent">
        <ProductList
          status={"RENTED"}
          exceptUserId={userId}
          onclickURL="#"
          hideDeleteButton={true}
        />
      </TabsContent>
    </Tabs>
  );
}
