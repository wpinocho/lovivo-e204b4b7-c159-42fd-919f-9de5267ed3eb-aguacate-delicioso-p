import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/pages/Index";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  console.log("ProductCard rendered for product:", product.name);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "premium":
        return "bg-yellow-100 text-yellow-800";
      case "organico":
        return "bg-green-100 text-green-800";
      case "pack":
        return "bg-blue-100 text-blue-800";
      case "especial":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleAddToCart = () => {
    console.log("Add to cart clicked for:", product.name);
    onAddToCart(product);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 bg-white">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <Badge className={`absolute top-2 right-2 ${getCategoryColor(product.category)}`}>
          {product.category}
        </Badge>
      </div>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">
          {product.name}
        </CardTitle>
        <CardDescription className="text-gray-600">
          {product.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-green-600">
            ${product.price.toFixed(2)}
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleAddToCart}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Agregar al Carrito
        </Button>
      </CardFooter>
    </Card>
  );
};