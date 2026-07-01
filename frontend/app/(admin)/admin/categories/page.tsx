"use client";

import { useRouter } from "next/navigation";
import { AdminHeader } from "@/modules/admin/View/components/AdminHeader";
import { useCategories } from "@/modules/product/ViewModel/useCategories";
import { CategoryRow } from "@/modules/product/View/components/CategoryRow";

export default function CategoriesPage() {
  const router = useRouter();
  const { categories, loading, error, removeCategory } = useCategories();

  return (
    <div className="p-6">
      <AdminHeader
        title="Categorias"
        breadcrumb={["Inicio", "Categorias"]}
        showCreateButton
        createButtonLabel="CADASTRAR CATEGORIA"
        onCreateClick={() => router.push("/admin/categories/create")}
      />

      {loading && <p className="mt-6 text-gray-500">Carregando...</p>}
      {error && <p className="mt-6 text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="mt-6 flex flex-col gap-3">
          {categories.length === 0 && (
            <p className="text-gray-500">Nenhuma categoria cadastrada.</p>
          )}
          {categories.map(category => (
            <CategoryRow key={category.categoryId} category={category} onDeleteSuccess={removeCategory} />
          ))}
        </div>
      )}
    </div>
  );
}
