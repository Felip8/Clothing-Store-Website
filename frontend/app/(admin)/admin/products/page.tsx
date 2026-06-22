"use client";

import { useRouter } from "next/navigation";
import { AdminHeader } from "@/modules/admin/View/components/AdminHeader";

export default function ProductsPage() {
    const router = useRouter();

    const handleCreateProduct = () => {
        router.push("/admin/products/create");
    }

    return (
        <div className="p-6">
            <AdminHeader
                title="Todos os produtos"
                breadcrumb={["Inicio", "Todos os produtos"]}
                showCreateButton
                createButtonLabel="CADASTRAR PRODUTO"
                onCreateClick={handleCreateProduct}
            />
        </div>
    );
}
