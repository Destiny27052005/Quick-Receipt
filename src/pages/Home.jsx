import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  User,
  Box,
  CreditCard,
  Send,
  ShieldCheck,
} from "lucide-react";

// Lucide-compatible Naira Icon (₦)
function NairaIcon({ className = "w-5 h-5" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M6 3v18" />
      <path d="M6 4.5l12 15" />
      <path d="M18 3v18" />
      <path d="M3.5 10h17" />
      <path d="M3.5 14h17" />
    </svg>
  );
}

function Home() {
  const [formData, setFormData] = useState({
    customerName: "",
    item: "",
    price: "",
    paymentMethod: "bank_transfer",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Receipt form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col justify-between text-slate-800 antialiased font-sans">
      {/* Main Content Form */}
      <main className="flex-1 w-full max-w-sm mx-auto px-6 pt-8 pb-10 flex flex-col justify-center">
        {/* Title & Subtitle */}
        <div className="mb-8">
          <h1 className="text-[28px] font-extrabold tracking-tight text-slate-900 mb-2">
            Create a Receipt
          </h1>
          <p className="text-sm leading-relaxed text-slate-500 font-normal">
            Enter the details below and get a PDF receipt or share it on WhatsApp
            instantly.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Customer Name */}
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-xs font-semibold text-slate-600">
              Customer Name
            </Label>
            <div className="relative flex items-center">
              <User className="absolute left-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
              <Input
                id="name"
                type="text"
                placeholder="Aarav Sharma"
                value={formData.customerName}
                onChange={(e) =>
                  setFormData({ ...formData, customerName: e.target.value })
                }
                className="pl-11 h-12 rounded-xl border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 shadow-none focus-visible:ring-2 focus-visible:ring-blue-500"
              />
            </div>
          </div>

          {/* Item / Service */}
          <div className="space-y-1.5">
            <Label htmlFor="item" className="text-xs font-semibold text-slate-600">
              Item / Service
            </Label>
            <div className="relative flex items-center">
              <Box className="absolute left-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
              <Input
                id="item"
                type="text"
                placeholder="Notebook"
                value={formData.item}
                onChange={(e) =>
                  setFormData({ ...formData, item: e.target.value })
                }
                className="pl-11 h-12 rounded-xl border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 shadow-none focus-visible:ring-2 focus-visible:ring-blue-500"
              />
            </div>
          </div>

          {/* Price (₦) */}
          <div className="space-y-1.5">
            <Label htmlFor="price" className="text-xs font-semibold text-slate-600">
              Price (₦)
            </Label>
            <div className="relative flex items-center">
              <NairaIcon className="absolute left-3.5 w-5 h-5 text-slate-500 pointer-events-none" />
              <Input
                id="price"
                type="text"
                placeholder="5,000"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="pl-11 h-12 rounded-xl border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 shadow-none focus-visible:ring-2 focus-visible:ring-blue-500"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-1.5">
            <Label htmlFor="payment" className="text-xs font-semibold text-slate-600">
              Payment Method
            </Label>
            <Select
              value={formData.paymentMethod}
              onValueChange={(val) =>
                setFormData({ ...formData, paymentMethod: val })
              }
            >
              <SelectTrigger
                id="payment"
                className="h-12 w-full rounded-xl border-slate-200 bg-white px-3.5 text-slate-800 shadow-none focus:ring-2 focus:ring-blue-500 flex items-center [&>svg]:opacity-50"
              >
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-slate-500" />
                  <SelectValue placeholder="Select Payment Method" />
                </div>
              </SelectTrigger>
              <SelectContent className="rounded-xl border-slate-200">
                <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                <SelectItem value="card">Debit Card</SelectItem>
                <SelectItem value="cash">Cash</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-12 mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-base shadow-sm flex items-center justify-center gap-2 active:scale-[0.99] transition-all"
          >
            <Send className="w-4 h-4 fill-white rotate-45 -mt-0.5" />
            Generate Receipt
          </Button>
        </form>
      </main>

      {/* Footer Badges */}
      <footer className="py-6 flex items-center justify-center gap-2 text-xs text-slate-400 font-medium">
        <ShieldCheck className="w-4 h-4 text-slate-400" />
        <span>Fast</span>
        <span>•</span>
        <span>Secure</span>
        <span>•</span>
        <span>For Students</span>
      </footer>
    </div>
  );
}

export default Home;