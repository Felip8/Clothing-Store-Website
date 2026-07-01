"use client";

import { useEffect, useState } from "react";
import { categoryService, type Category } from "@/modules/product/Model/services/categoryService";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    categoryService.getAllCategories()
      .then(setCategories)
      .catch(() => setError("Erro ao carregar categorias"))
      .finally(() => setLoading(false));
  }, []);

  const removeCategory = (categoryId: number) => {
    setCategories(prev => prev.filter(c => c.categoryId !== categoryId));
  };

  return { categories, loading, error, removeCategory };
}
