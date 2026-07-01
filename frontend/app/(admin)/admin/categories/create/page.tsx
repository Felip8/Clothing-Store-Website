"use client";

import { useRouter } from "next/navigation";
import { AdminHeader } from "@/modules/admin/View/components/AdminHeader";
import { CategoryForm } from "@/modules/product/View/components/CategoryForm";

export default function CategoryCreatePage() {
  const router = useRouter();

  const handleSubmit = () => {
    router.push("/admin/categories");
  };

  const handleCancel = () => {
    router.push("/admin/categories");
  };

  return (
    <div className="p-6 bg-[#C8C8C8] min-h-screen">
      <AdminHeader
        title="Detalhes da Categoria"
        breadcrumb={["Inicio", "Categorias", "Cadastrar Categoria"]}
      />
      <div className="mt-6">
        <CategoryForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </div>
    </div>
  );
}
