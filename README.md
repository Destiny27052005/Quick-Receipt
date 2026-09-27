# QuickReceipt 🧾

QuickReceipt is a fast, clean, and modern web application built to generate professional receipts in seconds. Designed specifically for students, freelancers, and small merchants, it supports multi-item billing in Nigerian Naira (₦), instant PDF downloads, and one-click sharing to WhatsApp.

---

## ✨ Features

* **Dynamic Item Management:** Add multiple goods or services, specify quantities, and set unit prices with real-time total calculations.
* **Naira (₦) Integration:** Built-in support for the Nigerian Naira currency across both input forms and generated receipts.
* **Instant PDF Downloads:** Generate downloadable, thermal/slip-style PDF receipts using [`jsPDF`](https://github.com/parallax/jsPDF).
* **Direct WhatsApp Sharing:** Generate pre-formatted receipt summaries and send them directly into WhatsApp chats.
* **Toast Notifications:** Smooth and informative alert notifications powered by [`Sonner`](https://sonner.emilkowal.ski/).
* **Responsive & Minimal UI:** Styled with Tailwind CSS, Lucide icons, and modern card components.

---

## 🛠️ Tech Stack

* **Framework:** React (Vite / Next.js)
* **Styling:** Tailwind CSS
* **Icons:** [Lucide React](https://lucide.dev/)
* **PDF Generation:** [jsPDF](https://github.com/parallax/jsPDF)
* **Notifications:** [Sonner](https://sonner.emilkowal.ski/)
* **UI Primitives:** Radix UI / Shadcn UI components

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/Destiny27052005/Quick-Receipt.git
cd Quick-Receipt
```

#### 2. Install dependencies

```bash
npm install
```

#### 3. Install required packages

```bash
npm install jspdf sonner lucide-react
```

#### 4. Start the development server

```bash
npm run dev
```

#### 5. Open the application

Open your browser and navigate to:

```text
http://localhost:5173
```

> The port may be different depending on your local development configuration.

---

## 📂 Project Structure

```text
Quick-Receipt/
├── public/
│   └── favicon.svg           # Custom receipt SVG favicon
├── src/
│   ├── components/
│   │   └── ui/               # Reusable UI components
│   │       ├── Input
│   │       ├── Button
│   │       ├── Select
│   │       └── ...
│   ├── App.jsx               # Application entry
│   ├── Home.jsx              # Main receipt form and receipt generator
│   └── main.jsx              # React application entry point
├── package.json
└── README.md
```

---

## 📝 Usage

1. Enter the **Customer Name**.
2. Add your items by entering:

   * **Item Name**
   * **Quantity**
   * **Unit Price (₦)**
3. Click **Add Another Item** to include additional items.
4. Choose the **Payment Method**:

   * Bank Transfer
   * Debit Card
   * Cash
5. Click **Generate Receipt**.
6. Choose one of the available actions:

   * **Download PDF:** Saves a styled slip receipt directly to your device.
   * **Share on WhatsApp:** Opens WhatsApp with the receipt summary pre-filled.

---

## 🧾 Receipt Workflow

```text
Enter Customer Details
        ↓
Add Products / Services
        ↓
Set Quantity & Unit Price
        ↓
Select Payment Method
        ↓
Calculate Total
        ↓
Generate Receipt
      ↙   ↘
     ↓     ↓
Download  WhatsApp
   PDF      Share
```

---

## 💰 Supported Payment Methods

QuickReceipt currently supports:

* Bank Transfer
* Debit Card
* Cash

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

To contribute:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Test your changes locally.
5. Commit your changes.
6. Open a pull request.

---

## 📬 Support

If you encounter a bug or have a feature request, please open an issue in the GitHub repository.

---

**QuickReceipt — Simple. Fast. Professional.**
