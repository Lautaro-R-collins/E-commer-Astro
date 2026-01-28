import { atom, computed } from 'nanostores';
import { persistentAtom } from '@nanostores/persistent';

export interface FavoriteItem {
    id: string;
    name: string;
    price: number;
    image: string;
    stock: number;
    slug: string;
}

export const favoriteItems = persistentAtom<FavoriteItem[]>('favorite_items', [], {
    encode: JSON.stringify,
    decode: JSON.parse,
});

export function addToFavorites(product: FavoriteItem) {
    const items = favoriteItems.get();
    const existingItem = items.find((item) => item.id === product.id);

    if (!existingItem) {
        favoriteItems.set([...items, product]);
        return { success: true, message: `${product.name} added to favorites` };
    }
    return { success: false, message: `${product.name} is already in favorites` }; // Should not happen if we toggle
}

export function removeFromFavorites(productId: string) {
    const items = favoriteItems.get();
    const itemToRemove = items.find(item => item.id === productId);
    favoriteItems.set(items.filter((item) => item.id !== productId));
    return { success: true, message: `${itemToRemove?.name || 'Product'} removed from favorites` };
}

export function toggleFavorite(product: FavoriteItem) {
    const items = favoriteItems.get();
    const exists = items.some((item) => item.id === product.id);

    if (exists) {
        return removeFromFavorites(product.id);
    } else {
        return addToFavorites(product);
    }
}

export function isFavorite(productId: string) {
    const items = favoriteItems.get();
    return items.some((item) => item.id === productId);
}

export const totalFavorites = computed(favoriteItems, (items) => items.length);
