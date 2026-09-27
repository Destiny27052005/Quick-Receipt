import { useState } from "react";
import { jsPDF } from "jspdf";
import { toast, Toaster } from "sonner";
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
  Download,
  MessageCircle,
  ArrowLeft,
  Smile,
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

// Receipt paper icon matching the brand logo
function ReceiptBadgeIcon({ className = "w-8 h-8" }) {
  return (
    <svg
      viewBox="0 0 24 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M3 2C3 0.895431 3.89543 0 5 0H19C20.1046 0 21 0.895431 21 2V26L18 24.5L15 26L12 24.5L9 26L6 24.5L3 26V2Z"
        fill="#2563EB"
      />
      <rect x="6.5" y="6" width="11" height="2" rx="1" fill="white" />
      <rect x="6.5" y="10.5" width="11" height="2" rx="1" fill="white" />
      <rect x="6.5" y="15" width="11" height="2" rx="1" fill="white" />
    </svg>
  );
}

const paymentLabels = {
  bank_transfer: "Bank Transfer",
  card: "Debit Card",
  cash: "Cash",
};

export default function Home() {
  const [formData, setFormData] = useState({
    customerName: "",
    item: "",
    price: "",
    paymentMethod: "bank_transfer",
  });

  const [receiptData, setReceiptData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.customerName.trim()) {
      toast.error("Missing Customer Name", {
        description: "Please enter the customer's name.",
      });
      return;
    }

    if (!formData.item.trim()) {
      toast.error("Missing Item/Service", {
        description: "Please specify the item or service rendered.",
      });
      return;
    }

    if (!formData.price.trim()) {
      toast.error("Missing Price", {
        description: "Please enter the amount in Naira.",
      });
      return;
    }

    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
    const formattedTime = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const randomReceiptNum = `QR-${now.getFullYear()}-${Math.floor(
      1000 + Math.random() * 9000
    )}`;

    setReceiptData({
      ...formData,
      receiptNo: randomReceiptNum,
      date: formattedDate,
      time: formattedTime,
    });

    toast.success("Receipt Generated!", {
      description: `Receipt #${randomReceiptNum} created.`,
    });
  };

  const handleDownloadPDF = () => {
    if (!receiptData) return;

    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [80, 155],
      });

      const pageWidth = doc.internal.pageSize.getWidth();

      // Brand
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.setTextColor(37, 99, 235);
      doc.text("QuickReceipt", pageWidth / 2, 14, { align: "center" });

      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(100, 116, 139);
      doc.text("Thank you for your support!", pageWidth / 2, 18.5, { align: "center" });

      // Receipt Title
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(15, 23, 42);
      doc.text("RECEIPT", pageWidth / 2, 27, { align: "center" });

      // Metadata
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(100, 116, 139);
      doc.text("Receipt No:", 8, 35);
      doc.text("Date & Time:", pageWidth - 8, 35, { align: "right" });

      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(30, 41, 59);
      doc.text(receiptData.receiptNo, 8, 40);
      doc.text(`${receiptData.date}  ${receiptData.time}`, pageWidth - 8, 40, {
        align: "right",
      });

      // Customer Name
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(100, 116, 139);
      doc.text("Customer Name:", 8, 48);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(15, 23, 42);
      doc.text(receiptData.customerName, 8, 53);

      // Items Box Header
      doc.setFillColor(239, 246, 255);
      doc.rect(8, 58, pageWidth - 16, 7, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.5);
      doc.setTextColor(30, 58, 138);
      doc.text("Item", 11, 62.5);
      doc.text("Qty", pageWidth / 2 + 5, 62.5, { align: "center" });
      doc.text("Price", pageWidth - 11, 62.5, { align: "right" });

      // Item Row
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(30, 41, 59);
      doc.text(receiptData.item, 11, 71);
      doc.text("1", pageWidth / 2 + 5, 71, { align: "center" });
      doc.text(`NGN ${receiptData.price}`, pageWidth - 11, 71, { align: "right" });

      // Divider line
      doc.setDrawColor(241, 245, 249);
      doc.line(8, 77, pageWidth - 8, 77);

      // Total
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      doc.setTextColor(15, 23, 42);
      doc.text("Total", 11, 84);
      doc.text(`NGN ${receiptData.price}`, pageWidth - 11, 84, { align: "right" });

      // Divider line
      doc.line(8, 89, pageWidth - 8, 89);

      // Payment Method
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(100, 116, 139);
      doc.text("Payment Method:", 8, 96);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(30, 41, 59);
      doc.text(paymentLabels[receiptData.paymentMethod] || receiptData.paymentMethod, 8, 101);

      // Bottom Message Box
      doc.setFillColor(239, 246, 255);
      doc.roundedRect(8, 110, pageWidth - 16, 15, 2, 2, "F");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(30, 58, 138);
      doc.text("Thank you!", pageWidth / 2, 116, { align: "center" });

      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(100, 116, 139);
      doc.text("Have a great day!", pageWidth / 2, 121, { align: "center" });

      doc.save(`${receiptData.receiptNo}.pdf`);

      toast.success("PDF Downloaded!", {
        description: `Saved as ${receiptData.receiptNo}.pdf`,
      });
    } catch {
      toast.error("Download Failed", {
        description: "Could not generate PDF. Please try again.",
      });
    }
  };

  const handleShareWhatsApp = () => {
    if (!receiptData) return;

    const message = `🧾 *RECEIPT - QuickReceipt*
--------------------------------
*Receipt No:* ${receiptData.receiptNo}
*Date:* ${receiptData.date} ${receiptData.time}
*Customer:* ${receiptData.customerName}

*Item:* ${receiptData.item} (Qty: 1)
*Total Paid:* ₦${receiptData.price}
*Payment Method:* ${paymentLabels[receiptData.paymentMethod] || receiptData.paymentMethod}
--------------------------------
Thank you for your business! Have a great day!`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, "_blank");

    toast.info("Opening WhatsApp...");
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between text-slate-800 antialiased font-sans">
      <Toaster position="top-center" richColors closeButton />

      <main className="flex-1 w-full max-w-sm mx-auto px-4 py-8 flex flex-col justify-center">
        {!receiptData ? (
          /* ================= FORM SCREEN ================= */
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
            <div className="mb-6">
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 mb-1.5">
                Create a Receipt
              </h1>
              <p className="text-xs leading-relaxed text-slate-500 font-normal">
                Enter details below to generate a receipt slip or share directly on
                WhatsApp.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Customer Name */}
              <div className="space-y-1">
                <Label htmlFor="name" className="text-xs font-semibold text-slate-600">
                  Customer Name
                </Label>
                <div className="relative flex items-center">
                  <User className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Aarav Sharma"
                    value={formData.customerName}
                    onChange={(e) =>
                      setFormData({ ...formData, customerName: e.target.value })
                    }
                    className="pl-10 h-11 rounded-xl border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 shadow-none focus-visible:ring-2 focus-visible:ring-blue-500 text-sm"
                  />
                </div>
              </div>

              {/* Item / Service */}
              <div className="space-y-1">
                <Label htmlFor="item" className="text-xs font-semibold text-slate-600">
                  Item / Service
                </Label>
                <div className="relative flex items-center">
                  <Box className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                  <Input
                    id="item"
                    type="text"
                    placeholder="Notebook"
                    value={formData.item}
                    onChange={(e) =>
                      setFormData({ ...formData, item: e.target.value })
                    }
                    className="pl-10 h-11 rounded-xl border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 shadow-none focus-visible:ring-2 focus-visible:ring-blue-500 text-sm"
                  />
                </div>
              </div>

              {/* Price (₦) */}
              <div className="space-y-1">
                <Label htmlFor="price" className="text-xs font-semibold text-slate-600">
                  Price (₦)
                </Label>
                <div className="relative flex items-center">
                  <NairaIcon className="absolute left-3.5 w-4 h-4 text-slate-500 pointer-events-none" />
                  <Input
                    id="price"
                    type="text"
                    placeholder="199"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="pl-10 h-11 rounded-xl border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 shadow-none focus-visible:ring-2 focus-visible:ring-blue-500 text-sm"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-1">
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
                    className="h-11 w-full rounded-xl border-slate-200 bg-white px-3 text-slate-800 shadow-none focus:ring-2 focus:ring-blue-500 flex items-center [&>svg]:opacity-50 text-sm"
                  >
                    <div className="flex items-center gap-2.5">
                      <CreditCard className="w-4 h-4 text-slate-500" />
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

              <Button
                type="submit"
                className="w-full h-11 mt-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm shadow-sm flex items-center justify-center gap-2 active:scale-[0.99] transition-all"
              >
                <Send className="w-4 h-4 fill-white rotate-45 -mt-0.5" />
                Generate Receipt
              </Button>
            </form>
          </div>
        ) : (
          /* ================= EXACT MATCH RECEIPT CARD ================= */
          <div className="space-y-4">
            <button
              onClick={() => {
                setReceiptData(null);
                toast.info("Returned to editor");
              }}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Create Another Receipt
            </button>

            {/* Receipt Container */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/90 text-slate-800 font-sans relative">
              {/* Logo & Header */}
              <div className="flex flex-col items-center justify-center mb-6">
                <div className="flex items-center gap-2.5">
                  <ReceiptBadgeIcon className="w-7 h-7" />
                  <span className="text-xl font-bold tracking-tight text-blue-600">
                    QuickReceipt
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 font-medium">
                  Thank you for your support!
                </p>
              </div>

              {/* RECEIPT Label */}
              <h2 className="text-center font-extrabold tracking-wide text-slate-900 text-base mb-6">
                RECEIPT
              </h2>

              {/* Receipt No & Date/Time */}
              <div className="grid grid-cols-2 text-xs mb-4">
                <div>
                  <span className="text-slate-400 block font-normal text-[11px]">
                    Receipt No:
                  </span>
                  <span className="font-semibold text-slate-800">
                    {receiptData.receiptNo}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block font-normal text-[11px]">
                    Date & Time:
                  </span>
                  <span className="font-semibold text-slate-800">
                    {receiptData.date} &nbsp;{receiptData.time}
                  </span>
                </div>
              </div>

              {/* Customer Name */}
              <div className="text-xs mb-5">
                <span className="text-slate-400 block font-normal text-[11px]">
                  Customer Name:
                </span>
                <span className="font-bold text-slate-900 text-sm">
                  {receiptData.customerName}
                </span>
              </div>

              {/* Items Table */}
              <div className="mb-4">
                <div className="bg-blue-50/70 rounded-lg px-3 py-2 flex justify-between text-xs font-semibold text-slate-700">
                  <span className="w-1/2">Item</span>
                  <span className="w-1/4 text-center">Qty</span>
                  <span className="w-1/4 text-right">Price</span>
                </div>

                <div className="px-3 py-3 flex justify-between items-center text-xs text-slate-800 font-medium">
                  <span className="w-1/2 truncate">{receiptData.item}</span>
                  <span className="w-1/4 text-center text-slate-600">1</span>
                  <span className="w-1/4 text-right font-semibold">
                    ₦{receiptData.price}
                  </span>
                </div>

                <div className="border-t border-slate-100 my-1" />

                {/* Total */}
                <div className="px-3 py-2 flex justify-between items-center text-sm font-bold text-slate-900">
                  <span>Total</span>
                  <span className="text-base font-extrabold">₦{receiptData.price}</span>
                </div>

                <div className="border-t border-slate-100 mt-1 mb-4" />
              </div>

              {/* Payment Method */}
              <div className="text-xs mb-6 px-1">
                <span className="text-slate-400 block font-normal text-[11px] mb-1">
                  Payment Method:
                </span>
                <div className="flex items-center gap-2 text-slate-800 font-medium">
                  <CreditCard className="w-4 h-4 text-slate-600" />
                  <span>
                    {paymentLabels[receiptData.paymentMethod] || receiptData.paymentMethod}
                  </span>
                </div>
              </div>

              {/* Thank You Box */}
              <div className="bg-blue-50/60 rounded-xl py-3 px-4 text-center mb-1">
                <div className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-slate-800">
                  <span>Thank you!</span>
                  <Smile className="w-3.5 h-3.5 text-slate-600" />
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5 font-normal">
                  Have a great day!
                </p>
              </div>

              {/* Timestamp footer from message */}
              <div className="text-right text-[10px] text-slate-400 mt-2 font-medium">
                {receiptData.time}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-1">
              <Button
                type="button"
                variant="outline"
                onClick={handleDownloadPDF}
                className="w-full h-11 rounded-full border-blue-500 text-blue-600 hover:bg-blue-50 hover:text-blue-700 font-semibold gap-2 shadow-none text-sm"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </Button>

              <Button
                type="button"
                onClick={handleShareWhatsApp}
                className="w-full h-11 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold gap-2 shadow-sm text-sm"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                Share on WhatsApp
              </Button>
            </div>
          </div>
        )}
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