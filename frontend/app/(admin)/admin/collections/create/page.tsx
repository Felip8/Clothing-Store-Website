"use client";

import { useRouter } from "next/navigation";
import { AdminHeader } from "@/modules/admin/View/components/AdminHeader";
import { CollectionForm } from "@/modules/product/View/components/CollectionForm";

export default function CollectionCreatePage() {
  const router = useRouter();

  const handleSubmit = () => {
    router.push("/admin/collections");
  };

  const handleCancel = () => {
    router.push("/admin/collections");
  };

  return (
    <div className="p-6 bg-[#C8C8C8] min-h-screen">
      <AdminHeader
        title="Detalhes da Coleção"
        breadcrumb={["Inicio", "Coleções", "Cadastrar Coleção"]}
      />
      <div className="mt-6">
        <CollectionForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </div>
    </div>
  );
}
