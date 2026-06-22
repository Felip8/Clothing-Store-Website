"use client";

import { Category } from "@/modules/catalog/View/components/Category";
import { Hero } from "@/shared/components/layout/Hero";
import { useNewArrivals } from "@/modules/catalog/ViewModel/hooks/useNewArrivals";
import { useRouter } from "next/navigation";
import { FavoriteIcon } from "@/shared/assets/Icons";
import { Button } from "@/shared/components/ui/button";

const CATEGORY_IDS: Record<string, number> = {
    "CAMISETAS": 1,
    "CALÇAS": 2,
    "MOLETONS": 3,
    "MEIAS": 4,
};

const categories = [
    { image: '/assets/category/camisetas.png', label: "CAMISETAS", href: "/catalog", categoryId: CATEGORY_IDS.CAMISETAS },
    { image: '/assets/category/calcas.png', label: "CALÇAS", href: "/catalog", categoryId: CATEGORY_IDS["CALÇAS"] },
    { image: '/assets/category/moletons.png', label: "MOLETONS", href: "/catalog", categoryId: CATEGORY_IDS.MOLETONS },
    { image: '/assets/category/meias.png', label: "MEIAS", href: "/catalog", categoryId: CATEGORY_IDS.MEIAS },
];

export default function HomePage() {
    const newArrivals = useNewArrivals();
    const router = useRouter();

    return (
        <>
            <div className="flex bg-transparent text-white flex-col">
                <Hero />
                <div className="flex-row w-full">
                    <Category categories={categories} />
                </div>
                <section>
                    <h2 className="font-alexandria text-[#353535] text-2xl mx-4 my-2">Novidades</h2>

                    {newArrivals.loading && (
                        <div className="flex justify-center py-16">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black" />
                        </div>
                    )}

                    {newArrivals.error && (
                        <p className="text-center text-red-500 py-8">{newArrivals.error}</p>
                    )}

                    {!newArrivals.loading && !newArrivals.error && newArrivals.variations.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                            {newArrivals.variations.map(v => (
                                <div
                                    key={v.variationId}
                                    className="flex flex-col gap-1"
                                    onClick={() => router.push(`/catalog/variations/${v.variationId}`)}
                                >
                                    <div className="aspect-[3/4] bg-gray-100 overflow-hidden mb-3 relative">
                                        <Button size={"icon"} variant={"ghost"}
                                            className="absolute top-3 right-3 flex items-center justify-center" onClick={() => { }}>
                                            <FavoriteIcon width={48} height={48} color="#C8C8C8" className="absolute top-2.5 right-2.5" />
                                        </Button>
                                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                                            {v.skuCode}
                                        </div>
                                    </div>
                                    <p className="font-semibold text-sm uppercase font-alexandria text-[#353535] group-hover:underline">
                                        {v.productName}
                                    </p>
                                    <p className="text-sm font-medium mt-1 font-alexandria text-[#6D6D6D]">
                                        R$ {v.price.toFixed(2).replace(".", ",")}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </>
    )
}
