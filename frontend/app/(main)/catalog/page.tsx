"use client";

import { Suspense } from "react";
import { useCatalogViewModel } from "@/modules/catalog/ViewModel/hooks/useCatalogViewModel";
import { ProductItem } from "@/modules/product/View/components/ProductItem";

function CatalogContent() {
    const { variations } = useCatalogViewModel();

    return (
        <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {variations.map(v => (
                    <ProductItem key={v.variationId} variationId={v.variationId} productName={v.productName} price={v.price} />
                ))}
            </div>
        </div>
    );
}

export default function CatalogPage() {
    return (
        <Suspense fallback={
            <div className="flex justify-center py-16">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black" />
            </div>
        }>
            <CatalogContent />
        </Suspense>
    );
}
