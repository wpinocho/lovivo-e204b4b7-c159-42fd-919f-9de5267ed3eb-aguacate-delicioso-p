import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, Download, Mail } from "lucide-react";

interface QuotationData {
  variety: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  total: number;
}

export const AvocadoQuotation = () => {
  const [quotationData, setQuotationData] = useState<QuotationData>({
    variety: "",
    quantity: 0,
    unit: "kg",
    pricePerUnit: 0,
    total: 0
  });

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    company: ""
  });

  const [showQuotation, setShowQuotation] = useState(false);

  console.log("AvocadoQuotation component rendered");

  const avocadoVarieties = [
    { name: "Hass Premium", price: 2.50, unit: "kg" },
    { name: "Hass Orgánico", price: 3.00, unit: "kg" },
    { name: "Fuerte", price: 2.00, unit: "kg" },
    { name: "Bacon", price: 2.20, unit: "kg" },
    { name: "Pinkerton", price: 2.80, unit: "kg" },
    { name: "Reed", price: 3.20, unit: "kg" }
  ];

  const handleVarietyChange = (variety: string) => {
    console.log("Variety changed to:", variety);
    const selectedVariety = avocadoVarieties.find(v => v.name === variety);
    if (selectedVariety) {
      setQuotationData(prev => ({
        ...prev,
        variety,
        pricePerUnit: selectedVariety.price,
        total: prev.quantity * selectedVariety.price
      }));
    }
  };

  const handleQuantityChange = (quantity: number) => {
    console.log("Quantity changed to:", quantity);
    setQuotationData(prev => ({
      ...prev,
      quantity,
      total: quantity * prev.pricePerUnit
    }));
  };

  const handleGenerateQuotation = () => {
    console.log("Generating quotation with data:", quotationData, customerInfo);
    if (!quotationData.variety || quotationData.quantity <= 0 || !customerInfo.name || !customerInfo.email) {
      alert("Por favor completa todos los campos obligatorios");
      return;
    }
    setShowQuotation(true);
  };

  const handleDownloadQuotation = () => {
    console.log("Downloading quotation");
    alert("Funcionalidad de descarga en desarrollo. La cotización se enviará por email.");
  };

  const handleEmailQuotation = () => {
    console.log("Emailing quotation");
    alert(`Cotización enviada a ${customerInfo.email}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
            <Calculator className="h-10 w-10 text-green-600" />
            Cotizador de Aguacates
          </h1>
          <p className="text-lg text-gray-600">
            Obtén una cotización personalizada para tus pedidos de aguacates premium
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulario de Cotización */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-green-700">Datos del Pedido</CardTitle>
              <CardDescription>
                Selecciona la variedad y cantidad de aguacates que necesitas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="variety">Variedad de Aguacate *</Label>
                <Select onValueChange={handleVarietyChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una variedad" />
                  </SelectTrigger>
                  <SelectContent>
                    {avocadoVarieties.map((variety) => (
                      <SelectItem key={variety.name} value={variety.name}>
                        {variety.name} - ${variety.price.toFixed(2)}/{variety.unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">Cantidad (kg) *</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  placeholder="Ingresa la cantidad en kg"
                  onChange={(e) => handleQuantityChange(Number(e.target.value))}
                />
              </div>

              {quotationData.variety && quotationData.quantity > 0 && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Subtotal:</span>
                    <span className="text-2xl font-bold text-green-600">
                      ${quotationData.total.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {quotationData.quantity} kg × ${quotationData.pricePerUnit.toFixed(2)}/kg
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Información del Cliente */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-green-700">Información de Contacto</CardTitle>
              <CardDescription>
                Completa tus datos para recibir la cotización
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre Completo *</Label>
                <Input
                  id="name"
                  placeholder="Tu nombre completo"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                  id="phone"
                  placeholder="Tu número de teléfono"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company">Empresa</Label>
                <Input
                  id="company"
                  placeholder="Nombre de tu empresa (opcional)"
                  value={customerInfo.company}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, company: e.target.value }))}
                />
              </div>

              <Button
                onClick={handleGenerateQuotation}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                size="lg"
              >
                <Calculator className="mr-2 h-4 w-4" />
                Generar Cotización
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Cotización Generada */}
        {showQuotation && (
          <Card className="mt-8 border-green-200">
            <CardHeader className="bg-green-50">
              <CardTitle className="text-2xl text-green-800">Cotización Generada</CardTitle>
              <CardDescription>
                Cotización #{Date.now().toString().slice(-6)} - {new Date().toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">Información del Cliente</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Nombre:</strong> {customerInfo.name}</p>
                    <p><strong>Email:</strong> {customerInfo.email}</p>
                    {customerInfo.phone && <p><strong>Teléfono:</strong> {customerInfo.phone}</p>}
                    {customerInfo.company && <p><strong>Empresa:</strong> {customerInfo.company}</p>}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">Detalles del Pedido</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Variedad:</strong> {quotationData.variety}</p>
                    <p><strong>Cantidad:</strong> {quotationData.quantity} kg</p>
                    <p><strong>Precio por kg:</strong> ${quotationData.pricePerUnit.toFixed(2)}</p>
                    <div className="border-t pt-2 mt-3">
                      <p className="text-lg"><strong>Total: ${quotationData.total.toFixed(2)}</strong></p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-6 pt-4 border-t">
                <Button
                  onClick={handleDownloadQuotation}
                  variant="outline"
                  className="flex-1"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Descargar PDF
                </Button>
                <Button
                  onClick={handleEmailQuotation}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Enviar por Email
                </Button>
              </div>

              <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Nota:</strong> Esta cotización es válida por 7 días. Los precios pueden variar según disponibilidad y temporada.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};