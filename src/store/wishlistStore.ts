import { create } from "zustand";

import { persist } from "zustand/middleware";

type WishlistItem = {
  id: number;
  name: string;
  price: number;
  image: string;
};

type WishlistStore = {
  wishlist: WishlistItem[];

  addToWishlist: (
    product: WishlistItem
  ) => void;

  removeFromWishlist: (
    id: number
  ) => void;
};

export const useWishlistStore =
  create<WishlistStore>()(
    persist(
      (set, get) => ({

        wishlist: [],

        addToWishlist: (product) => {

          const exists =
            get().wishlist.find(
              (item) =>
                item.id === product.id
            );

          if (exists) return;

          set((state) => ({
            wishlist: [
              ...state.wishlist,
              product,
            ],
          }));
        },

        removeFromWishlist: (id) =>
          set((state) => ({
            wishlist:
              state.wishlist.filter(
                (item) =>
                  item.id !== id
              ),
          })),
      }),
      {
        name:
          "tinycrochets-wishlist",
      }
    )
  );