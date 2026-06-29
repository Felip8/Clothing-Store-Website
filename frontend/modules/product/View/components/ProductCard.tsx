"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MoreVertical, Pencil, Plus, Trash2 } from "lucide-react";
import type { ProductVariationDto } from "@/modules/product/Model/models/productVariationDto";
import { productService } from "@/modules/product/Model/services/productService";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

interface ProductCardProps {
  product: ProductVariationDto;
  onDeleteSuccess?: (productId: number) => void;
}

export function ProductCard({ product, onDeleteSuccess }: ProductCardProps) {
  const router = useRouter();
  const mainImage = product.images?.find(img => img.type === "MAIN");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await productService.deleteProduct(product.productId);
      onDeleteSuccess?.(product.productId);
    } catch {
      setIsDeleting(false);
      setConfirmDelete(false);
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm relative">
      <div className="absolute top-2 right-2 z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="bg-white/80 backdrop-blur-sm rounded-full p-1 hover:bg-white transition-colors shadow-sm">
              <MoreVertical className="w-4 h-4 text-gray-600" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={() => router.push(`/admin/products/${product.productId}/edit`)}>
              <Plus className="w-4 h-4 mr-2" />
              Criar Variação
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => router.push(`/admin/products/${product.productId}/edit`)}>
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
      </div>

      {mainImage ? (
        <Image
          src={mainImage.imageUrl}
          alt={product.productName}
          width={300}
          height={300}
          className="w-full h-62 object-cover"
        />
      ) : (
        <div className="w-full h-62 bg-gray-200 flex items-center justify-center text-gray-400">
          Sem imagem
        </div>
      )}

      <div className="p-4">
        <p className="font-semibold">{product.productName}</p>
        <p className="text-sm text-gray-500">{product.categoryName}</p>
        <p className="font-bold mt-1">R$ {Number(product.price).toFixed(2)}</p>
      </div>

      {confirmDelete && (
        <div className="absolute inset-0 bg-white/95 flex flex-col items-center justify-center gap-3 p-4">
          <p className="text-sm font-semibold text-center text-gray-800">
            Excluir &ldquo;{product.productName}&rdquo;?
          </p>
          <p className="text-xs text-gray-500 text-center">Esta ação não pode ser desfeita.</p>
          <div className="flex gap-2">
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="px-4 py-1.5 bg-red-600 text-white text-xs rounded-md hover:bg-red-700 disabled:opacity-50 transition-colors"
            >
              {isDeleting ? "Excluindo..." : "Excluir"}
            </button>
            <button
              onClick={() => setConfirmDelete(false)}
              disabled={isDeleting}
              className="px-4 py-1.5 border border-gray-300 text-gray-700 text-xs rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
