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
import { User, DollarSign, Cuboid, Wallet } from "lucide-react";

function Home() {
    const [formData, setFormData] = useState({
        customerName: "",
        item: "",
        price: "",
        paymentMethod: ""
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Contact form submitted:", formData);
    };
    return (
        <div >
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <main className="max-w-md">
                    <h1>Create a Receipt</h1>
                    <p>Enter the details below and
                        get a PDF receipt or share it on Whatsapp instantly.</p>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <Label htmlFor="name">Customer Name</Label>
                                <div className="flex border gap-1 rounded-2xl"><User /><Input id="name" type="text" value={formData.customerName} placeholder="Enter Customer Name" onChange={(e) => setFormData({ ...formData, customerName: e.target.value })} /></div>
                            </div>
                            <div>
                                <Label htmlFor="item">Item / Service</Label>
                                <div className="flex border gap-1 rounded-2xl"><Cuboid /><Input id="item" type="text" className="border-0 outline-0" value={formData.item} placeholder="Enter item/service" onChange={(e) => setFormData({ ...formData, item: e.target.value })} /></div>
                            </div>
                            <div>
                                <Label htmlFor="price">Price ()</Label>
                                <div className="flex border gap-1 rounded-2xl"><DollarSign /><Input id="price" type="text" value={formData.price} placeholder="Enter price" onChange={(e) => setFormData({ ...formData, price: e.target.value })} /></div>
                            </div>
                            <div>
                                <Label htmlFor="payment">Payment Method</Label>
                                <div className="flex border-2 gap-1 rounded-2xl">
                                    <Wallet />
                                    <Select
                                        value={formData.paymentMethod}
                                        onValueChange={(val) => setFormData({ ...formData, paymentMethod: val })}
                                    >
                                        <SelectTrigger className="w-full h-10 bg-background">
                                            <SelectValue placeholder="Select a topic" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Bank Trasfer">Bank Transfer</SelectItem>
                                            <SelectItem value="Cash">Cash</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <Button className="w-full">Generate Receipt</Button>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Home;