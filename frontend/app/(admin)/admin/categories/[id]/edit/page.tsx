"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { AdminHeader } from "@/modules/admin/View/components/AdminHeader";
import { CategoryForm } from "@/modules/product/View/components/CategoryForm";
import { categoryService, type Category } from "@/modules/product/Model/services/categoryService";

export default function CategoryEditPage() {
  const router = useRouter();
  const params = useParams();
  const categoryId = Number(params.id);

  const [category, setCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    categoryService.getCategoryById(categoryId)
      .then(setCategory)
      .catch(() => setError("Erro ao carregar categoria."))
      .finally(() => setIsLoading(false));
  }, [categoryId]);

  const handleSubmit = () => {
    router.push("/admin/categories");
  };

  const handleCancel = () => {
    router.push("/admin/categories");
  };

  return (
    <div className="p-6 bg-[#C8C8C8] min-h-screen">
      <AdminHeader
        title="Editar Categoria"
        breadcrumb={["Inicio", "Categorias", "Editar Categoria"]}
      />
      <div className="mt-6">
        {isLoading && <p className="text-gray-500">Carregando categoria...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!isLoading && !error && category && (
          <CategoryForm initialData={category} onSubmit={handleSubmit} onCancel={handleCancel} />
        )}
      </div>
    </div>
  );
}
