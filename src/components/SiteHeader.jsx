import { Menu, ReceiptText } from "lucide-react";

function SiteHeader() {
    return (
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-100">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm">
                    <ReceiptText className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-xl font-bold leading-tight tracking-tight text-blue-600">
                        QuickReceipt
                    </h2>
                    <p className="text-xs text-slate-400 font-medium">
                        Simple. Fast. Professional.
                    </p>
                </div>
            </div>
            <button
                type="button"
                aria-label="Toggle navigation menu"
                className="p-2 text-slate-600 hover:text-slate-900"
            >
                <Menu className="w-6 h-6 stroke-[2.5]" />
            </button>
        </header>
    );
}

export default SiteHeader;