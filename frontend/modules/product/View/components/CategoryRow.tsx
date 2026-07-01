"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import type { Category } from "@/modules/product/Model/services/categoryService";
import { categoryService } from "@/modules/product/Model/services/categoryService";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

interface CategoryRowProps {
  category: Category;
  onDeleteSuccess?: (categoryId: number) => void;
}

export function CategoryRow({ category, onDeleteSuccess }: CategoryRowProps) {
  const router = useRouter();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await categoryService.deleteCategory(category.categoryId);
      onDeleteSuccess?.(category.categoryId);
    } catch (err) {
      setIsDeleting(false);
      setConfirmDelete(false);
      setError(err instanceof Error ? err.message : "Erro ao excluir categoria.");
    }
  };

  return (
    <div className="border rounded-lg p-4 flex items-center justify-between bg-white">
      <div>
        <p className="font-semibold">{category.categoryName}</p>
        {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
      </div>

      {confirmDelete ? (
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Excluir &ldquo;{category.categoryName}&rdquo;?</span>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-3 py-1.5 bg-red-600 text-white text-xs rounded-md hover:bg-red-700 disabled:opacity-50 transition-colors"
          >
            {isDeleting ? "Excluindo..." : "Excluir"}
          </button>
          <button
            onClick={() => setConfirmDelete(false)}
            disabled={isDeleting}
            className="px-3 py-1.5 border border-gray-300 text-gray-700 text-xs rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
        </div>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="rounded-full p-1 hover:bg-gray-100 transition-colors">
              <MoreVertical className="w-4 h-4 text-gray-600" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={() => router.push(`/admin/categories/${category.categoryId}/edit`)}>
              <Pencil className="w-4 h-4 mr-2" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => setConfirmDelete(true)}
              className="text-red-600 focus:text-red-600"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
