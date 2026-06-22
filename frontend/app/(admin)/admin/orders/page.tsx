import { AdminHeader } from "@/modules/admin/View/components/AdminHeader";

export default function OrdersPage() {
  return (
    <div className="p-6">
      <AdminHeader
        title="Ordem dos Pedidos"
        breadcrumb={["Inicio", "Ordem dos Pedidos"]}
      />
      <div className="mt-6">
        <p className="text-gray-600">Lista de pedidos em breve...</p>
      </div>
    </div>
  );
}
