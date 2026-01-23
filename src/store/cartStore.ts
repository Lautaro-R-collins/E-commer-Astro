import { atom, computed } from 'nanostores';
import { persistentAtom } from '@nanostores/persistent';

export interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    category?: string;
    discount?: number;
    stock?: number;
}

export const isCartOpen = atom(false);

// Persist cart items in localStorage
export const cartItems = persistentAtom<CartItem[]>('cart_items', [], {
    encode: JSON.stringify,
    decode: JSON.parse,
});

export function toggleCart() {
    isCartOpen.set(!isCartOpen.get());
}

export function openCart() {
    isCartOpen.set(true);
}

export function closeCart() {
    isCartOpen.set(false);
}

export function addToCart(product: Omit<CartItem, 'quantity'>, qty: number = 1) {
    const items = cartItems.get();
    const existingItem = items.find((item) => item.id === product.id);

    if (existingItem) {
        const newQuantity = existingItem.quantity + qty;

        // Stock limit check
        if (product.stock !== undefined && newQuantity > product.stock) {
            return { success: false, message: `Solo hay ${product.stock} unidades disponibles` };
        }

        cartItems.set(
            items.map((item) =>
                item.id === product.id
                    ? { ...item, quantity: Math.max(0, newQuantity) }
                    : item
            ).filter(item => item.quantity > 0)
        );
    } else {
        if (qty > 0) {
            // Stock limit check for new item
            if (product.stock !== undefined && qty > product.stock) {
                return { success: false, message: `Solo hay ${product.stock} unidades disponibles` };
            }
            cartItems.set([...items, { ...product, quantity: qty }]);
        }
    }
    // Removed openCart() as requested by user
    return { success: true, message: `${product.name} añadido al carrito` };
}

export function removeFromCart(productId: string) {
    cartItems.set(cartItems.get().filter((item) => item.id !== productId));
}

export function updateQuantity(productId: string, qty: number) {
    const items = cartItems.get();
    const item = items.find(i => i.id === productId);

    if (item && item.stock !== undefined && qty > item.stock) {
        return { success: false, message: `Solo hay ${item.stock} unidades disponibles` };
    }

    cartItems.set(
        items.map((item) =>
            item.id === productId ? { ...item, quantity: Math.max(0, qty) } : item
        ).filter(item => item.quantity > 0)
    );
    return { success: true };
}

export function clearCart() {
    cartItems.set([]);
}

export const totalPrice = computed(cartItems, (items) => {
    return items.reduce((total, item) => {
        const itemPrice = item.price * (1 - (item.discount || 0) / 100);
        return total + itemPrice * item.quantity;
    }, 0);
});

export const totalSavings = computed(cartItems, (items) => {
    return items.reduce((total, item) => {
        if (!item.discount) return total;
        const discountAmount = item.price * (item.discount / 100);
        return total + discountAmount * item.quantity;
    }, 0);
});

export const totalItems = computed(cartItems, (items) => {
    return items.reduce((total, item) => total + item.quantity, 0);
});
