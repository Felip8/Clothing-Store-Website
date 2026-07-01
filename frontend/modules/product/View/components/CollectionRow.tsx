"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import type { Collection } from "@/modules/product/Model/services/colectionService";
import { collectionService } from "@/modules/product/Model/services/colectionService";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

interface CollectionRowProps {
  collection: Collection;
  onDeleteSuccess?: (collectionId: number) => void;
}

const formatDisplayDate = (isoDate: string): string => {
  const [year, month, day] = isoDate.split("-");
  return `${day}/${month}/${year}`;
};

export function CollectionRow({ collection, onDeleteSuccess }: CollectionRowProps) {
  const router = useRouter();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await collectionService.deleteCollection(collection.collectionId);
      onDeleteSuccess?.(collection.collectionId);
    } catch (err) {
      setIsDeleting(false);
      setConfirmDelete(false);
      setError(err instanceof Error ? err.message : "Erro ao excluir coleção.");
    }
  };

  return (
    <div className="border rounded-lg p-4 flex items-center justify-between bg-white">
      <div>
        <p className="font-semibold">{collection.collectionName}</p>
        <p className="text-sm text-gray-500">{collection.description}</p>
        <p className="text-xs text-gray-400 mt-1">Lançamento: {formatDisplayDate(collection.launchDate)}</p>
        {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
      </div>

      {confirmDelete ? (
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Excluir &ldquo;{collection.collectionName}&rdquo;?</span>
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
            <DropdownMenuItem onSelect={() => router.push(`/admin/collections/${collection.collectionId}/edit`)}>
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
