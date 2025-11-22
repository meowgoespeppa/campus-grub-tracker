import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  available: boolean;
}

const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Masala Dosa",
    description: "Crispy dosa with potato filling and chutneys",
    price: 50,
    category: "breakfast",
    image: "🥞",
    available: true,
  },
  {
    id: "2",
    name: "Idli Sambar",
    description: "Steamed rice cakes with sambar and chutney",
    price: 40,
    category: "breakfast",
    image: "🍚",
    available: true,
  },
  {
    id: "3",
    name: "Veg Biryani",
    description: "Aromatic rice with mixed vegetables and spices",
    price: 80,
    category: "lunch",
    image: "🍛",
    available: true,
  },
  {
    id: "4",
    name: "Paneer Butter Masala",
    description: "Cottage cheese in rich tomato gravy with rice/roti",
    price: 90,
    category: "lunch",
    image: "🍲",
    available: true,
  },
  {
    id: "5",
    name: "Chicken Fried Rice",
    description: "Stir-fried rice with chicken and vegetables",
    price: 100,
    category: "lunch",
    image: "🍗",
    available: true,
  },
  {
    id: "6",
    name: "Samosa",
    description: "Crispy fried pastry with spiced potato filling",
    price: 20,
    category: "snacks",
    image: "🥟",
    available: true,
  },
  {
    id: "7",
    name: "Pav Bhaji",
    description: "Spicy mashed vegetables with buttered buns",
    price: 60,
    category: "snacks",
    image: "🍔",
    available: true,
  },
  {
    id: "8",
    name: "Mango Shake",
    description: "Fresh mango blended with milk and ice cream",
    price: 50,
    category: "beverages",
    image: "🥤",
    available: true,
  },
  {
    id: "9",
    name: "Masala Chai",
    description: "Traditional Indian spiced tea",
    price: 15,
    category: "beverages",
    image: "☕",
    available: true,
  },
];

const Menu = () => {
  const [cart, setCart] = useState<Record<string, number>>({});

  const addToCart = (itemId: string, itemName: string) => {
    setCart((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
    toast.success(`Added ${itemName} to cart`);
  };

  const removeFromCart = (itemId: string, itemName: string) => {
    setCart((prev) => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId] -= 1;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
    toast.info(`Removed ${itemName} from cart`);
  };

  const getItemQuantity = (itemId: string) => cart[itemId] || 0;

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Our Menu</h1>
          <p className="text-muted-foreground">
            Delicious food made fresh daily in our campus canteen
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="all">All Items</TabsTrigger>
            <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
            <TabsTrigger value="lunch">Lunch</TabsTrigger>
            <TabsTrigger value="snacks">Snacks</TabsTrigger>
            <TabsTrigger value="beverages">Beverages</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item) => (
              <MenuItemCard
                key={item.id}
                item={item}
                quantity={getItemQuantity(item.id)}
                onAdd={() => addToCart(item.id, item.name)}
                onRemove={() => removeFromCart(item.id, item.name)}
              />
            ))}
          </TabsContent>

          {["breakfast", "lunch", "snacks", "beverages"].map((category) => (
            <TabsContent
              key={category}
              value={category}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {menuItems
                .filter((item) => item.category === category)
                .map((item) => (
                  <MenuItemCard
                    key={item.id}
                    item={item}
                    quantity={getItemQuantity(item.id)}
                    onAdd={() => addToCart(item.id, item.name)}
                    onRemove={() => removeFromCart(item.id, item.name)}
                  />
                ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

interface MenuItemCardProps {
  item: MenuItem;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
}

const MenuItemCard = ({ item, quantity, onAdd, onRemove }: MenuItemCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="text-6xl mb-2">{item.image}</div>
          {item.available ? (
            <Badge variant="outline" className="bg-success/10 text-success border-success">
              Available
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive">
              Sold Out
            </Badge>
          )}
        </div>
        <CardTitle className="text-xl">{item.name}</CardTitle>
        <CardDescription>{item.description}</CardDescription>
      </CardHeader>
      
      <CardFooter className="flex items-center justify-between pt-4 border-t">
        <div className="text-2xl font-bold text-primary">₹{item.price}</div>
        
        {quantity === 0 ? (
          <Button
            onClick={onAdd}
            disabled={!item.available}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add
          </Button>
        ) : (
          <div className="flex items-center space-x-2">
            <Button
              size="icon"
              variant="outline"
              onClick={onRemove}
              className="h-8 w-8"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center font-semibold">{quantity}</span>
            <Button
              size="icon"
              onClick={onAdd}
              className="h-8 w-8 bg-primary hover:bg-primary/90"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default Menu;

