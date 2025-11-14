import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, History, MapPin, UtensilsCrossed } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const Navbar = () => {
  // Mock cart count - in real app this would come from state/context
  const cartItemCount = 0;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
            <UtensilsCrossed className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">Campus Bites</span>
        </Link>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/menu">
              Menu
            </Link>
          </Button>
          
          <Button variant="ghost" size="sm" asChild>
            <Link to="/track-order">
              <MapPin className="mr-2 h-4 w-4" />
              Track Order
            </Link>
          </Button>

          <Button variant="ghost" size="sm" asChild>
            <Link to="/orders">
              <History className="mr-2 h-4 w-4" />
              Orders
            </Link>
          </Button>

          <Button variant="outline" size="sm" className="relative" asChild>
            <Link to="/cart">
              <ShoppingCart className="h-4 w-4" />
              {cartItemCount > 0 && (
                <Badge className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-primary">
                  {cartItemCount}
                </Badge>
              )}
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};
