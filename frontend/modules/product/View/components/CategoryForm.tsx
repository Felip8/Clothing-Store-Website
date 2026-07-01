"use client";

import { useState } from "react";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Button } from "@/shared/components/ui/button";
import { categoryService, type Category } from "@/modules/product/Model/services/categoryService";

interface CategoryFormProps {
  initialData?: Category;
  onSubmit: () => void;
  onCancel: () => void;
}

export function CategoryForm({ initialData, onSubmit, onCancel }: CategoryFormProps) {
  const [categoryName, setCategoryName] = useState(initialData?.categoryName ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEditing = !!initialData;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (categoryName.trim().length < 3 || categoryName.trim().length > 150) {
      setError("O nome da categoria deve possuir entre 3 e 150 caracteres.");
      return;
    }

    try {
      setIsSubmitting(true);

      if (isEditing) {
        await categoryService.updateCategory(initialData.categoryId, { categoryName });
      } else {
        await categoryService.createCategory({ categoryName });
      }

      onSubmit();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar categoria.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 bg-white p-6 rounded-2xl shadow-lg max-w-130">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <Label className="font-alexandria" htmlFor="categoryName">Nome da Categoria</Label>
        <Input
          id="categoryName"
          type="text"
          className="md:w-130 md:h-11"
          value={categoryName}
          onChange={e => setCategoryName(e.target.value)}
        />
      </div>

      <div className="flex gap-3 pt-2">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-gray-900 text-white px-6 py-2.5 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Salvando..." : isEditing ? "Salvar alterações" : "Adicionar"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="border border-gray-300 text-gray-700 px-6 py-2.5 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}
