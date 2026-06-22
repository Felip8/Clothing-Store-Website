"use client";

import { useRouter } from "next/navigation";
import { AdminHeader } from "@/modules/admin/View/components/AdminHeader";
import { ProductCreateForm } from "@/modules/product/View/components/ProductCreateForm";

export default function ProductCreatePage() {
    const router = useRouter();

    const handleSubmit = () => {
        router.push("/admin/products");
    }

    const handleCancel = () => {
        router.push("/admin/products");
    }

    return (
        <div className="p-6 bg-[#C8C8C8] min-h-screen">
            <AdminHeader
                title="Detalhes do Produto"
                breadcrumb={["Inicio", "Produtos", "Cadastrar Produto"]}
            />
            <div className="mt-6">
                <ProductCreateForm onSubmit={handleSubmit} onCancel={handleCancel} />
            </div>
        </div>
    );
}
