"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { AdminHeader } from "@/modules/admin/View/components/AdminHeader";
import { CollectionForm } from "@/modules/product/View/components/CollectionForm";
import { collectionService, type Collection } from "@/modules/product/Model/services/colectionService";

export default function CollectionEditPage() {
  const router = useRouter();
  const params = useParams();
  const collectionId = Number(params.id);

  const [collection, setCollection] = useState<Collection | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    collectionService.getCollectionById(collectionId)
      .then(setCollection)
      .catch(() => setError("Erro ao carregar coleção."))
      .finally(() => setIsLoading(false));
  }, [collectionId]);

  const handleSubmit = () => {
    router.push("/admin/collections");
  };

  const handleCancel = () => {
    router.push("/admin/collections");
  };

  return (
    <div className="p-6 bg-[#C8C8C8] min-h-screen">
      <AdminHeader
        title="Editar Coleção"
        breadcrumb={["Inicio", "Coleções", "Editar Coleção"]}
      />
      <div className="mt-6">
        {isLoading && <p className="text-gray-500">Carregando coleção...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!isLoading && !error && collection && (
          <CollectionForm initialData={collection} onSubmit={handleSubmit} onCancel={handleCancel} />
        )}
      </div>
    </div>
  );
}
