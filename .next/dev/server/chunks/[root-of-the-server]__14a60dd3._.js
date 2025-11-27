module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/child_process [external] (child_process, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("child_process", () => require("child_process"));

module.exports = mod;
}),
"[project]/OneDrive/Desktop/Loids-Stan/lib/stripe.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "stripe",
    ()=>stripe
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Loids$2d$Stan$2f$node_modules$2f$stripe$2f$esm$2f$stripe$2e$esm$2e$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/Loids-Stan/node_modules/stripe/esm/stripe.esm.node.js [app-route] (ecmascript)");
;
if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is missing. Please set it in your .env file.");
}
const stripe = new __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Loids$2d$Stan$2f$node_modules$2f$stripe$2f$esm$2f$stripe$2e$esm$2e$node$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"](process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-12-18.acacia",
    typescript: true
});
}),
"[project]/OneDrive/Desktop/Loids-Stan/lib/products.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "products",
    ()=>products
]);
const products = [
    {
        id: "elite-bundle",
        name: "Every Single Vendor",
        price: 29.99,
        originalPrice: 79.99,
        description: [
            "20+ Suppliers",
            "Most USA Based",
            "Passing Serial"
        ],
        image: "/assets/All Vendor.png"
    },
    {
        id: "hair-dryer",
        name: "Hair Dryer Supplier",
        price: 9.99,
        originalPrice: 24.99,
        description: [
            "3-7 Day USA Shipping"
        ],
        image: "/assets/Dyson.png"
    },
    {
        id: "labu",
        name: "Labu Supplier",
        price: 9.99,
        originalPrice: 19.99,
        description: [
            "10 plus Days Shipping"
        ],
        image: "/assets/Labubu.png"
    },
    {
        id: "max-supplier",
        name: "Max Supplier",
        price: 9.99,
        originalPrice: 29.99,
        description: [
            "Valid Code",
            "USA Warehouse",
            "Device Care"
        ],
        image: "/assets/Maxes.png"
    },
    {
        id: "moissanite",
        name: "Moissanite Supplier",
        price: 19.99,
        originalPrice: 49.99,
        description: [
            "100 plus moissanite products",
            "Diamond Tester Passing",
            "Best Quality Moissanite",
            "VVS Moissanite",
            "Shine Brighter than REAL Diamond"
        ],
        image: "/assets/Moissanite.png"
    },
    {
        id: "shoes",
        name: "Shoe Supplier",
        price: 9.99,
        originalPrice: 29.99,
        description: [
            "15 plus shoe variants, comes with boxes."
        ],
        image: "/assets/Shoes.png"
    },
    {
        id: "clothing",
        name: "Clothing Bundle Pack",
        price: 15.99,
        originalPrice: 39.99,
        description: [
            "7 Clothing Vendors in one"
        ],
        image: "/assets/Clothing Bundle.png"
    },
    {
        id: "pods",
        name: "Pod Supplier",
        price: 9.99,
        originalPrice: 24.99,
        description: [
            "Valid Code",
            "USA Warehouse",
            "1, 2, 3, 4, Pro, Max, etc"
        ],
        image: "/assets/AirPods.png"
    },
    {
        id: "cologne",
        name: "Cologne Supplier Pack",
        price: 15.99,
        originalPrice: 35.99,
        description: [
            "Every single cologne in one vendor",
            "5-7 Day USA Shipping"
        ],
        image: "/assets/Colognes.png"
    },
    {
        id: "lulu",
        name: "Lulu Supplier",
        price: 9.99,
        originalPrice: 24.99,
        description: [
            "6-10 Bussiness day shipping"
        ],
        image: "/assets/Lululemon.png"
    }
];
}),
"[project]/OneDrive/Desktop/Loids-Stan/app/api/checkout/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Loids$2d$Stan$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/Loids-Stan/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Loids$2d$Stan$2f$lib$2f$stripe$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/Loids-Stan/lib/stripe.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Loids$2d$Stan$2f$lib$2f$products$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/Loids-Stan/lib/products.ts [app-route] (ecmascript)");
;
;
;
async function POST(request) {
    try {
        const body = await request.json();
        const { productId, email } = body;
        const product = __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Loids$2d$Stan$2f$lib$2f$products$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["products"].find((p)=>p.id === productId);
        if (!product) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Loids$2d$Stan$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Product not found"
            }, {
                status: 404
            });
        }
        // In a real app, you would create a Stripe Product & Price dynamically or fetch from DB.
        // For this simple setup, we create a checkout session with inline price data.
        const session = await __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Loids$2d$Stan$2f$lib$2f$stripe$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["stripe"].checkout.sessions.create({
            payment_method_types: [
                "card"
            ],
            customer_email: email,
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: product.name,
                            images: [
                                `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}${product.image}`
                            ]
                        },
                        unit_amount: Math.round(product.price * 100)
                    },
                    quantity: 1
                }
            ],
            mode: "payment",
            success_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/products/${productId}`,
            metadata: {
                productId: product.id
            }
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Loids$2d$Stan$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            url: session.url
        });
    } catch (error) {
        console.error("Stripe Checkout Error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$Loids$2d$Stan$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Internal Server Error"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__14a60dd3._.js.map