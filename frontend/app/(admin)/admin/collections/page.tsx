"use client";

import { useRouter } from "next/navigation";
import { AdminHeader } from "@/modules/admin/View/components/AdminHeader";
import { useCollections } from "@/modules/product/ViewModel/useCollections";
import { CollectionRow } from "@/modules/product/View/components/CollectionRow";

export default function CollectionsPage() {
  const router = useRouter();
  const { collections, loading, error, removeCollection } = useCollections();

  return (
    <div className="p-6">
      <AdminHeader
        title="Coleções"
        breadcrumb={["Inicio", "Coleções"]}
        showCreateButton
        createButtonLabel="CADASTRAR COLEÇÃO"
        onCreateClick={() => router.push("/admin/collections/create")}
      />

      {loading && <p className="mt-6 text-gray-500">Carregando...</p>}
      {error && <p className="mt-6 text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="mt-6 flex flex-col gap-3">
          {collections.length === 0 && (
            <p className="text-gray-500">Nenhuma coleção cadastrada.</p>
          )}
          {collections.map(collection => (
            <CollectionRow key={collection.collectionId} collection={collection} onDeleteSuccess={removeCollection} />
          ))}
        </div>
      )}
    </div>
  );
}
