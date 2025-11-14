import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Clock, MapPin, CreditCard, Smartphone, ChefHat, Zap } from "lucide-react";
import heroImage from "@/assets/hero-food.jpg";

const Index = () => {
  const features = [
    {
      icon: Clock,
      title: "Quick Ordering",
      description: "Order in seconds and skip the queue",
    },
    {
      icon: MapPin,
      title: "Live Tracking",
      description: "Track your order in real-time",
    },
    {
      icon: CreditCard,
      title: "Easy Payment",
      description: "Multiple payment options available",
    },
    {
      icon: Smartphone,
      title: "Mobile Friendly",
      description: "Order from anywhere on campus",
    },
    {
      icon: ChefHat,
      title: "Fresh Food",
      description: "Made fresh daily by our canteen",
    },
    {
      icon: Zap,
      title: "Fast Delivery",
      description: "Get your food within 15-20 minutes",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20">
                  Now Live on Campus! 🎉
                </span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground">
                Delicious Food,
                <span className="block text-primary mt-2">Delivered Fast</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-lg">
                Skip the canteen queue! Order your favorite meals from our campus canteen 
                and track your order in real-time.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg h-12" asChild>
                  <Link to="/menu">
                    Browse Menu
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg h-12" asChild>
                  <Link to="/track-order">
                    Track Order
                  </Link>
                </Button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-foreground">500+</div>
                  <div className="text-sm text-muted-foreground">Orders Delivered</div>
                </div>
                <div className="h-12 w-px bg-border" />
                <div>
                  <div className="text-3xl font-bold text-foreground">15min</div>
                  <div className="text-sm text-muted-foreground">Avg. Delivery</div>
                </div>
                <div className="h-12 w-px bg-border" />
                <div>
                  <div className="text-3xl font-bold text-foreground">4.8★</div>
                  <div className="text-sm text-muted-foreground">Rating</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={heroImage}
                  alt="Delicious campus food"
                  className="w-full h-auto object-cover"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-primary/20 blur-3xl" />
              <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-secondary/20 blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose Campus Bites?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We make ordering food on campus easy, fast, and convenient
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground">
              Three simple steps to get your food
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: "1",
                title: "Browse & Order",
                description: "Choose from our variety of delicious meals and add them to your cart",
              },
              {
                step: "2",
                title: "Track in Real-Time",
                description: "Watch your order progress from preparation to delivery",
              },
              {
                step: "3",
                title: "Enjoy Your Meal",
                description: "Receive your fresh, hot food at your preferred location",
              },
            ].map((step, index) => (
              <div key={index} className="relative">
                {index < 2 && (
                  <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent -z-10" />
                )}
                <Card className="text-center border-2">
                  <CardHeader>
                    <div className="mx-auto h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mb-4">
                      {step.step}
                    </div>
                    <CardTitle className="text-xl mb-2">{step.title}</CardTitle>
                    <CardDescription className="text-base">{step.description}</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-16 md:py-24">
        <Card className="bg-gradient-to-br from-primary to-primary/80 border-0 overflow-hidden relative">
          <div className="absolute inset-0 bg-grid-white/10" />
          <CardContent className="relative py-12 md:py-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Order?
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Join hundreds of students who have already ditched the queue and started ordering smart!
            </p>
            <Button size="lg" variant="secondary" className="text-lg h-12" asChild>
              <Link to="/menu">
                Start Ordering Now
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container py-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Campus Bites</h3>
              <p className="text-sm text-muted-foreground">
                Making campus dining easier, one order at a time.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/menu" className="text-muted-foreground hover:text-primary">Menu</Link></li>
                <li><Link to="/track-order" className="text-muted-foreground hover:text-primary">Track Order</Link></li>
                <li><Link to="/orders" className="text-muted-foreground hover:text-primary">Order History</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Contact</h3>
              <p className="text-sm text-muted-foreground">
                Campus Canteen<br />
                Main Block, Ground Floor<br />
                Timing: 8 AM - 6 PM
              </p>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 Campus Bites. Built for BMS College of Engineering.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
