export interface ProductImageRequest {
    productId: number;
    mainImage: File;
    carouselImages: File[];
}