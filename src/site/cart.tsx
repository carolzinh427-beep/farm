import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { demoProducts } from "./data";

type CartLines = Record<string, number>;
type CartContextValue = {
  lines: CartLines;
  count: number;
  subtotal: number;
  hydrated: boolean;
  add: (slug: string) => void;
  setQuantity: (slug: string, quantity: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const CART_KEY = "bemviva-demo-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLines>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(CART_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Record<string, unknown>;
        const next: CartLines = {};
        for (const product of demoProducts) {
          const value = parsed[product.slug];
          if (typeof value === "number" && Number.isInteger(value) && value > 0) {
            next[product.slug] = Math.min(value, 20);
          }
        }
        setLines(next);
      }
    } catch {
      setLines({});
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(CART_KEY, JSON.stringify(lines));
    } catch {
      // The cart stays usable for this page view when browser storage is unavailable.
    }
  }, [hydrated, lines]);

  const value = useMemo<CartContextValue>(() => {
    const entries = Object.entries(lines).filter(([, quantity]) => quantity > 0);
    const count = entries.reduce((sum, [, quantity]) => sum + quantity, 0);
    const subtotal = entries.reduce((sum, [slug, quantity]) => {
      const product = demoProducts.find((item) => item.slug === slug);
      return sum + (product?.price ?? 0) * quantity;
    }, 0);

    return {
      lines,
      count,
      subtotal,
      hydrated,
      add: (slug) => {
        const product = demoProducts.find((item) => item.slug === slug);
        if (!product || product.purchaseMode !== "demo") return;
        setLines((current) => ({
          ...current,
          [slug]: Math.min((current[slug] ?? 0) + 1, 20),
        }));
      },
      setQuantity: (slug, quantity) => {
        if (quantity <= 0) {
          setLines((current) => {
            const next = { ...current };
            delete next[slug];
            return next;
          });
          return;
        }
        if (!Number.isInteger(quantity)) return;
        setLines((current) => ({ ...current, [slug]: Math.min(quantity, 20) }));
      },
      remove: (slug) => {
        setLines((current) => {
          const next = { ...current };
          delete next[slug];
          return next;
        });
      },
      clear: () => setLines({}),
    };
  }, [hydrated, lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart precisa estar dentro de CartProvider");
  return value;
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}
