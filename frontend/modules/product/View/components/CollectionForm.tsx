"use client";

import { useState } from "react";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Textarea } from "@/shared/components/ui/textarea";
import { Button } from "@/shared/components/ui/button";
import { collectionService, type Collection } from "@/modules/product/Model/services/colectionService";

interface CollectionFormProps {
  initialData?: Collection;
  onSubmit: () => void;
  onCancel: () => void;
}

interface CollectionFormData {
  collectionName: string;
  description: string;
  launchDate: string;
}

const isoToBackendDate = (isoDate: string): string => {
  const [year, month, day] = isoDate.split("-");
  return `${day}-${month}-${year}`;
};

export function CollectionForm({ initialData, onSubmit, onCancel }: CollectionFormProps) {
  const [formData, setFormData] = useState<CollectionFormData>({
    collectionName: initialData?.collectionName ?? "",
    description: initialData?.description ?? "",
    launchDate: initialData?.launchDate ?? "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEditing = !!initialData;

  const handleFieldChange = (field: keyof CollectionFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const { collectionName, description, launchDate } = formData;

    if (collectionName.trim().length < 3 || collectionName.trim().length > 150) {
      setError("O nome da coleção deve possuir entre 3 e 150 caracteres.");
      return;
    }
    if (!description.trim() || description.trim().length > 255) {
      setError("A descrição é obrigatória e não deve exceder 255 caracteres.");
      return;
    }
    if (!launchDate) {
      setError("A data de lançamento é obrigatória.");
      return;
    }

    try {
      setIsSubmitting(true);

      const request = {
        collectionName,
        description,
        launchDate: isoToBackendDate(launchDate),
      };

      if (isEditing) {
        await collectionService.updateCollection(initialData.collectionId, request);
      } else {
        await collectionService.createCollection(request);
      }

      onSubmit();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar coleção.");
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
        <Label className="font-alexandria" htmlFor="collectionName">Nome da Coleção</Label>
        <Input
          id="collectionName"
          type="text"
          className="md:w-130 md:h-11"
          value={formData.collectionName}
          onChange={e => handleFieldChange("collectionName", e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label className="font-alexandria" htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          className="md:w-130 md:h-24"
          value={formData.description}
          onChange={e => handleFieldChange("description", e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label className="font-alexandria" htmlFor="launchDate">Data de Lançamento</Label>
        <Input
          id="launchDate"
          type="date"
          className="md:w-60 md:h-11"
          value={formData.launchDate}
          onChange={e => handleFieldChange("launchDate", e.target.value)}
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
