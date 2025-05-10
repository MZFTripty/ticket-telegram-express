
import { products } from "@/data/products";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const ProductsTable = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Available Products</h2>
        <p className="mt-2 text-gray-600">
          Browse our catalog of products that can be ordered through the E-Ticketing bot.
          Use the product ID when placing your order.
        </p>
      </div>

      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-[120px]">Price (BDT)</TableHead>
              <TableHead className="w-[100px]">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell className="text-sm text-gray-600">{product.description}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>
                  <Badge variant={product.available ? "default" : "destructive"}>
                    {product.available ? "In Stock" : "Out of Stock"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
        <h3 className="text-lg font-semibold text-blue-800">Payment Options</h3>
        <div className="mt-2 space-y-2">
          <div className="flex items-center">
            <div className="w-20 text-blue-600 font-medium">Bkash:</div>
            <div className="text-gray-800">01XXXXXXXXX</div>
          </div>
          <div className="flex items-center">
            <div className="w-20 text-blue-600 font-medium">Nagad:</div>
            <div className="text-gray-800">01YYYYYYYYY</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsTable;
