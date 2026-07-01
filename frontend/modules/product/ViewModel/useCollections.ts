"use client";

import { useEffect, useState } from "react";
import { collectionService, type Collection } from "@/modules/product/Model/services/colectionService";

export function useCollections() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    collectionService.getAllCollection()
      .then(setCollections)
      .catch(() => setError("Erro ao carregar coleções"))
      .finally(() => setLoading(false));
  }, []);

  const removeCollection = (collectionId: number) => {
    setCollections(prev => prev.filter(c => c.collectionId !== collectionId));
  };

  return { collections, loading, error, removeCollection };
}
