import { tokenUtil } from "@/lib/tokenUtil";
import { api } from "@/infrastructure/api/api";

export interface Collection {
    collectionId: number;
    collectionName: string;
    description: string;
    launchDate: string;
}

export interface CollectionRequest {
    collectionName: string;
    description: string;
    launchDate: string;
}

export const collectionService = {
    async getAllCollection(): Promise<Collection[]> {
        const token = tokenUtil.getAccessToken();
        const response = await api.get('admin/collections', {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })

        return response.data.collections;
    },

    async getCollectionById(id: number): Promise<Collection> {
        const token = tokenUtil.getAccessToken();
        const response = await api.get(`/admin/collections/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        return response.data.collections[0];
    },

    async createCollection(collection: CollectionRequest): Promise<Collection[]> {
        const token = tokenUtil.getAccessToken();
        const response = await api.post('/admin/collections', collection, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        return response.data.collections;
    },

    async updateCollection(id: number, collection: CollectionRequest): Promise<Collection[]> {
        const token = tokenUtil.getAccessToken();
        const patch = (Object.keys(collection) as (keyof CollectionRequest)[]).map(key => ({
            op: "replace",
            path: `/${key}`,
            value: collection[key],
        }));
        const response = await api.patch(`/admin/collections/${id}`, patch, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json-patch+json",
            },
        });

        return response.data.collections;
    },

    async deleteCollection(id: number): Promise<void> {
        const token = tokenUtil.getAccessToken();
        await api.delete(`/admin/collections/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
    },
}
