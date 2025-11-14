import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface Order {
  id: string;
  date: string;
  time: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  status: "delivered" | "cancelled" | "pending";
  deliveryLocation: string;
}

const orders: Order[] = [
  {
    id: "ORD001",
    date: "2024-11-14",
    time: "10:30 AM",
    items: [
      { name: "Masala Dosa", quantity: 2, price: 50 },
      { name: "Masala Chai", quantity: 2, price: 15 },
    ],
    total: 130,
    status: "delivered",
    deliveryLocation: "Block A, Room 201",
  },
  {
    id: "ORD002",
    date: "2024-11-13",
    time: "1:15 PM",
    items: [
      { name: "Veg Biryani", quantity: 1, price: 80 },
      { name: "Mango Shake", quantity: 1, price: 50 },
    ],
    total: 130,
    status: "delivered",
    deliveryLocation: "Library - 2nd Floor",
  },
  {
    id: "ORD003",
    date: "2024-11-12",
    time: "4:30 PM",
    items: [
      { name: "Samosa", quantity: 3, price: 20 },
      { name: "Masala Chai", quantity: 1, price: 15 },
    ],
    total: 75,
    status: "delivered",
    deliveryLocation: "Sports Complex Cafe",
  },
];

const statusConfig = {
  delivered: {
    label: "Delivered",
    variant: "default" as const,
    className: "bg-success text-white",
  },
  cancelled: {
    label: "Cancelled",
    variant: "destructive" as const,
    className: "",
  },
  pending: {
    label: "In Progress",
    variant: "secondary" as const,
    className: "bg-warning text-white",
  },
};

const Orders = () => {
  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      
      <div className="container py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Order History</h1>
          <p className="text-muted-foreground">
            View all your past orders and receipts
          </p>
        </div>

        {orders.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <p className="text-muted-foreground mb-4">No orders yet</p>
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link to="/menu">Browse Menu</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        Order #{order.id}
                        <Badge className={statusConfig[order.status].className}>
                          {statusConfig[order.status].label}
                        </Badge>
                      </CardTitle>
                      <CardDescription className="flex items-center gap-4 mt-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {new Date(order.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {order.time}
                        </span>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-foreground">
                          {item.name} x {item.quantity}
                        </span>
                        <span className="font-medium">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total Amount</span>
                    <span className="text-2xl font-bold text-primary">₹{order.total}</span>
                  </div>

                  <div className="flex items-start gap-2 text-sm text-muted-foreground pt-2">
                    <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>{order.deliveryLocation}</span>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      View Receipt
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Reorder
                    </Button>
                    {order.status === "pending" && (
                      <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90" asChild>
                        <Link to="/track-order">Track Order</Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
