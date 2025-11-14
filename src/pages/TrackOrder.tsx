import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock, CheckCircle2, ChefHat, Package, Bike } from "lucide-react";

interface OrderStatus {
  status: "pending" | "preparing" | "ready" | "out-for-delivery" | "delivered";
  timestamp: string;
  message: string;
}

const orderStatuses: Record<string, OrderStatus[]> = {
  "ORD001": [
    { status: "pending", timestamp: "10:30 AM", message: "Order received" },
    { status: "preparing", timestamp: "10:32 AM", message: "Kitchen is preparing your order" },
    { status: "ready", timestamp: "10:45 AM", message: "Your order is ready!" },
    { status: "out-for-delivery", timestamp: "10:48 AM", message: "Delivery person picked up your order" },
    { status: "delivered", timestamp: "", message: "Estimated arrival: 5-10 mins" },
  ],
};

const statusConfig = {
  pending: {
    icon: Clock,
    label: "Order Placed",
    color: "status-pending",
    bgColor: "bg-status-pending/10",
  },
  preparing: {
    icon: ChefHat,
    label: "Preparing",
    color: "status-preparing",
    bgColor: "bg-status-preparing/10",
  },
  ready: {
    icon: Package,
    label: "Ready",
    color: "status-ready",
    bgColor: "bg-status-ready/10",
  },
  "out-for-delivery": {
    icon: Bike,
    label: "Out for Delivery",
    color: "status-delivered",
    bgColor: "bg-status-delivered/10",
  },
  delivered: {
    icon: CheckCircle2,
    label: "Delivered",
    color: "text-success",
    bgColor: "bg-success/10",
  },
};

const TrackOrder = () => {
  const [orderId, setOrderId] = useState("");
  const [trackingData, setTrackingData] = useState<OrderStatus[] | null>(null);

  const handleTrackOrder = () => {
    const data = orderStatuses[orderId];
    if (data) {
      setTrackingData(data);
    } else {
      setTrackingData(null);
      alert("Order not found. Try order ID: ORD001");
    }
  };

  const getCurrentStatusIndex = () => {
    if (!trackingData) return -1;
    return trackingData.findIndex((s) => !s.timestamp) - 1;
  };

  const currentIndex = getCurrentStatusIndex();

  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      
      <div className="container py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Track Your Order</h1>
          <p className="text-muted-foreground">
            Enter your order ID to see real-time status updates
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Enter Order Details</CardTitle>
            <CardDescription>You can find your order ID in the confirmation email or orders page</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="orderId">Order ID</Label>
                <Input
                  id="orderId"
                  placeholder="e.g., ORD001"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="mt-1.5"
                />
              </div>
              <div className="flex items-end">
                <Button onClick={handleTrackOrder} className="bg-primary hover:bg-primary/90">
                  Track Order
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {trackingData && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Order #{orderId}</CardTitle>
                  <CardDescription>Live tracking information</CardDescription>
                </div>
                <Badge className="bg-primary text-primary-foreground">
                  {statusConfig[trackingData[Math.max(0, currentIndex)].status].label}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {trackingData.map((status, index) => {
                  const config = statusConfig[status.status];
                  const Icon = config.icon;
                  const isCompleted = index <= currentIndex;
                  const isCurrent = index === currentIndex;
                  
                  return (
                    <div key={status.status} className="flex gap-4 relative">
                      {index < trackingData.length - 1 && (
                        <div
                          className={`absolute left-5 top-12 w-0.5 h-16 ${
                            isCompleted ? "bg-primary" : "bg-border"
                          }`}
                        />
                      )}
                      
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 ${
                          isCompleted
                            ? `border-primary ${config.bgColor}`
                            : "border-border bg-background"
                        } transition-all`}
                      >
                        <Icon
                          className={`h-5 w-5 ${
                            isCompleted ? `text-${config.color}` : "text-muted-foreground"
                          }`}
                        />
                      </div>
                      
                      <div className="flex-1 space-y-1">
                        <p
                          className={`font-medium ${
                            isCompleted ? "text-foreground" : "text-muted-foreground"
                          }`}
                        >
                          {config.label}
                        </p>
                        <p className="text-sm text-muted-foreground">{status.message}</p>
                        {status.timestamp && (
                          <p className="text-xs text-muted-foreground">{status.timestamp}</p>
                        )}
                        {isCurrent && (
                          <Badge variant="outline" className="mt-2">
                            Current Status
                          </Badge>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {trackingData === null && orderId && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                No order found with ID: {orderId}
                <br />
                <span className="text-sm">Try: ORD001 (demo order)</span>
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;
