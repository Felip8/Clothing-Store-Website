"use client";

import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Textarea } from "@/shared/components/ui/textarea";
import { Button } from "@/shared/components/ui/button";
import { useEffect, useState } from "react";
import { categoryService, type Category } from "@/modules/product/Model/services/categoryService";
import { collectionService, type Collection } from "@/modules/product/Model/services/colectionService";
import { productService } from "@/modules/product/Model/services/productService";

interface ProductUpdateFormProps {
  productId: number;
  onSubmit: () => void;
  onCancel: () => void;
}

interface ProductFormData {
  name: string;
  description: string;
  categoryId: number | null;
  collectionId: number | null;
  price: string;
  score: number;
}

export function ProductUpdateForm({ productId, onSubmit, onCancel }: ProductUpdateFormProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);

  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    categoryId: null,
    collectionId: null,
    price: "",
    score: 0,
  });

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      productService.getProductById(productId),
      categoryService.getAllCategories(),
      collectionService.getAllCollection(),
    ])
      .then(([product, cats, cols]) => {
        setCategories(cats);
        setCollections(cols);
        setFormData({
          name: product.name,
          description: product.description,
          categoryId: product.category?.id ?? null,
          collectionId: product.collection?.id ?? null,
          price: String(product.price),
          score: product.score ?? 0,
        });
        setSelectedCategory(product.category?.name ?? null);
        setSelectedCollection(product.collection?.name ?? null);
      })
      .catch(() => setError("Erro ao carregar dados do produto."))
      .finally(() => setIsLoading(false));
  }, [productId]);

  const handleFieldChange = (field: keyof ProductFormData, value: string | number | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category.categoryName);
    handleFieldChange("categoryId", category.categoryId);
  };

  const handleCollectionSelect = (collection: Collection) => {
    setSelectedCollection(collection.collectionName);
    handleFieldChange("collectionId", collection.collectionId);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name || !formData.categoryId || !formData.collectionId || !formData.price) {
      setError("Preencha todos os campos obrigatórios.");
      return;
    }

    try {
      setIsSubmitting(true);
      await productService.updateProduct(productId, {
        name: formData.name,
        description: formData.description,
        categoryId: formData.categoryId,
        collectionId: formData.collectionId,
        price: parseFloat(formData.price),
        score: formData.score,
      });
      onSubmit();
    } catch {
      setError("Erro ao atualizar produto.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <p className="text-gray-500">Carregando produto...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-12 bg-white p-6 rounded-2xl shadow-lg max-w-250">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-5 max-w-[520px]">
        <Label className="font-alexandria" htmlFor="name">Nome do Produto</Label>
        <Input
          id="name"
          type="text"
          className="md:w-130 md:h-11"
          value={formData.name}
          onChange={e => handleFieldChange("name", e.target.value)}
        />

        <Label className="font-alexandria" htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          className="md:w-130 md:h-24"
          value={formData.description}
          onChange={e => handleFieldChange("description", e.target.value)}
        />

        <Label className="font-alexandria" htmlFor="category">Categoria</Label>
        <DropdownMenu>
          <DropdownMenuTrigger className="w-full md:w-130 h-11 border rounded-md text-left px-3 flex items-center justify-between">
            {selectedCategory || "Selecione uma categoria"}
            <ChevronDown className="w-4 h-4 ml-auto" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full md:w-130">
            {categories.map(c => (
              <DropdownMenuItem key={c.categoryId} onSelect={() => handleCategorySelect(c)}>
                {c.categoryName}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex gap-4">
          <div className="flex flex-col gap-4">
            <Label className="font-alexandria" htmlFor="collection">Coleção</Label>
            <DropdownMenu>
              <DropdownMenuTrigger className="w-full md:w-60 h-11 border rounded-md text-left px-3 flex items-center justify-between">
                {selectedCollection || "Selecione uma coleção"}
                <ChevronDown className="w-4 h-4 ml-auto" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full md:w-60">
                {collections.map(c => (
                  <DropdownMenuItem key={c.collectionId} onSelect={() => handleCollectionSelect(c)}>
                    {c.collectionName}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex flex-col gap-4">
            <Label className="font-alexandria" htmlFor="price">Preço</Label>
            <Input
              id="price"
              type="number"
              className="md:w-60 md:h-11"
              placeholder="Ex: 109.90"
              value={formData.price}
              onChange={e => handleFieldChange("price", e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-gray-900 text-white px-6 py-2.5 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Salvando..." : "Salvar alterações"}
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
