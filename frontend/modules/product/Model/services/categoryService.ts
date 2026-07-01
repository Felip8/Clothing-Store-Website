import { tokenUtil } from "@/lib/tokenUtil";
import { api } from "@/infrastructure/api/api";

export interface Category {
    categoryId: number;
    categoryName: string
}

export interface CategoryRequest {
    categoryName: string;
}

export const categoryService = {

    async getAllCategories(): Promise<Category[]> {
        const token = tokenUtil.getAccessToken();
        const response = await api.get('/admin/categories', {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        return response.data.categories;
    },

    async getCategoryById(id: number): Promise<Category> {
        const token = tokenUtil.getAccessToken();
        const response = await api.get(`/admin/categories/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        return response.data.categories[0];
    },

    async createCategory(category: CategoryRequest): Promise<Category[]> {
        const token = tokenUtil.getAccessToken();
        const response = await api.post('/admin/categories', category, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        return response.data.categories;
    },

    async updateCategory(id: number, category: CategoryRequest): Promise<Category[]> {
        const token = tokenUtil.getAccessToken();
        const patch = (Object.keys(category) as (keyof CategoryRequest)[]).map(key => ({
            op: "replace",
            path: `/${key}`,
            value: category[key],
        }));
        const response = await api.patch(`/admin/categories/${id}`, patch, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json-patch+json",
            },
        });

        return response.data.categories;
    },

    async deleteCategory(id: number): Promise<void> {
        const token = tokenUtil.getAccessToken();
        await api.delete(`/admin/categories/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
    },
}
