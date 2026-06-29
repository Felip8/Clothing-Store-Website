export type ImageType = 'MAIN' | 'CAROUSEL';

export interface ProductImages {
    id: number;
    imageUrl: string;
    type: ImageType;
    position: number;
    variationId?: number;
    createdAt: string;
}