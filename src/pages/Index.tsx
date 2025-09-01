import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { Cart } from "@/components/Cart";
import { Header } from "@/components/Header";
import { AvocadoQuotation } from "@/components/AvocadoQuotation";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: "Aguacate Hass Premium",
    price: 2.50,
    image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=300&fit=crop",
    description: "Aguacates Hass de primera calidad, perfectos para guacamole",
    category: "premium"
  },
  {
    id: 2,
    name: "Aguacate Orgánico",
    price: 3.00,
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&h=300&fit=crop",
    description: "Aguacates orgánicos cultivados sin pesticidas",
    category: "organico"
  },
  {
    id: 3,
    name: "Aguacate Fuerte",
    price: 2.00,
    image: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=400&h=300&fit=crop",
    description: "Aguacates Fuerte, ideales para ensaladas",
    category: "clasico"
  },
  {
    id: 4,
    name: "Pack Familiar (6 unidades)",
    price: 12.00,
    image: "https://images.unsplash.com/photo-1601039641847-7857b994d704?w=400&h=300&fit=crop",
    description: "Pack familiar de 6 aguacates Hass seleccionados",
    category: "pack"
  },
  {
    id: 5,
    name: "Aguacate Baby",
    price: 1.80,
    image: "https://images.unsplash.com/photo-1583286814049-c7f5e2e9e9a8?w=400&h=300&fit=crop",
    description: "Aguacates pequeños, perfectos para aperitivos",
    category: "especial"
  },
  {
    id: 6,
    name: "Aguacate Jumbo",
    price: 4.50,
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=300&fit=crop",
    description: "Aguacates extra grandes, ideales para compartir",
    category: "especial"
  }
];

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  console.log("Index component rendered with cart items:", cartItems);

  const addToCart = (product: Product) => {
    console.log("Adding product to cart:", product);
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    console.log("Removing product from cart:", productId);
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    console.log("Updating quantity for product:", productId, "to:", quantity);
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">🥑 Aguacates Para Todos</h1>
          <p className="text-xl mb-8">Los mejores aguacates frescos, directo a tu mesa</p>
          <div className="flex justify-center items-center gap-4">
            <Button
              onClick={() => setIsCartOpen(true)}
              className="bg-white text-green-600 hover:bg-gray-100 relative"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Carrito ({getTotalItems()})
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Button>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Nuestros Productos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Cotizador Section */}
      <section id="cotizador" className="py-16 bg-white">
        <AvocadoQuotation />
      </section>

      {/* Cart Sidebar */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
        totalPrice={getTotalPrice()}
      />
    </div>
  );
};

export default Index;