import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { CartItem } from "@/pages/Index";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (productId: number) => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  totalPrice: number;
}

export const Cart = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onUpdateQuantity,
  totalPrice
}: CartProps) => {
  console.log("Cart component rendered with items:", items);

  const handleCheckout = () => {
    console.log("Checkout initiated with items:", items);
    alert(`¡Gracias por tu compra! Total: $${totalPrice.toFixed(2)}`);
    // Aquí podrías integrar con un sistema de pago real
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Carrito de Compras
          </SheetTitle>
          <SheetDescription>
            {items.length === 0 
              ? "Tu carrito está vacío" 
              : `${items.length} producto${items.length > 1 ? 's' : ''} en tu carrito`
            }
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500">
              <ShoppingBag className="h-16 w-16 mb-4 opacity-50" />
              <p className="text-lg">Tu carrito está vacío</p>
              <p className="text-sm">¡Agrega algunos aguacates deliciosos!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500">${item.price.toFixed(2)} c/u</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="h-8 w-8 p-0"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="h-8 w-8 p-0"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onRemoveItem(item.id)}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t pt-4 mt-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-2xl font-bold text-green-600">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <Button
              onClick={handleCheckout}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              size="lg"
            >
              Proceder al Pago
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};