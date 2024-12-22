import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Trash2, Eye } from "lucide-react";
import { deleteProduct, getAllProductsShop } from "@/redux/actions/productAction";
import { toast } from "sonner";

const AllProducts = () => {
  const { products, isLoading } = useSelector((state) => state.products);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();

  useEffect(() => {
    if (seller?._id) {
      dispatch(getAllProductsShop(seller._id));
    }
  }, [dispatch, seller]);

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteProduct(id));
      toast.success("Product deleted successfully");
      dispatch(getAllProductsShop(seller._id)); // Refresh the products list
    } catch (error) {
      toast.error(error.message || "Error deleting product");
    }
  };

  if (isLoading) {
    return <div className="w-full max-w-6xl mx-auto mt-10 text-center">Loading...</div>;
  }

  return (
    <div className="container py-10 mx-auto">
    <h1 className="mb-5 text-2xl font-bold">All Products</h1>
    {products.length > 0 ? (
      <>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Id</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Sold out</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell className="">{product._id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>US$ {product.discountPrice}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.sold_out}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Link to={`/product/${product._id}`}>
                      <Button variant="outline" size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button variant="outline" size="icon" onClick={() => handleDelete(product._id)}>
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </>
    ) : (
      <div className="text-center text-gray-500">No products found</div>
    )}
  </div>
  );
};

export default AllProducts;