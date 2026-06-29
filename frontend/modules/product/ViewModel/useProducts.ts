"use client";

import { useEffect, useState } from "react";
import { productService } from "@/modules/product/Model/services/productService";
import type { ProductVariationDto } from "@/modules/product/Model/models/productVariationDto";

export function useProducts() {
  const [products, setProducts] = useState<ProductVariationDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(20);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    setLoading(true);
    productService.getAllProducts(page, size)
      .then(data => {
        setProducts(data.content);
        setTotalPages(data.page.totalPages);
        setTotalElements(data.page.totalElements);
      })
      .catch(() => setError("Erro ao carregar produtos"))
      .finally(() => setLoading(false));
  }, [page, size]);

  const goToPage = (p: number) => setPage(p);
  const changeSize = (s: number) => { setSize(s); setPage(0); };
  const removeProduct = (productId: number) => {
    setProducts(prev => prev.filter(p => p.productId !== productId));
    setTotalElements(prev => prev - 1);
  };

  return { products, loading, error, page, size, totalPages, totalElements, goToPage, changeSize, removeProduct };
}
