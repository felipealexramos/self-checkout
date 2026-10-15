import { Button } from "@/components/ui/button";

const ProductPage = () => {
    return ( 
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl font-bold">Products</h1>
            <Button className="mt-4">Add Product</Button>
        </div>
     );
}
 
export default ProductPage;