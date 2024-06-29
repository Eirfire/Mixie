"use client";
import useUser from "@/hooks/useUser";
import { Bookmark, Collection } from "@/types";
import { useQuery } from "@tanstack/react-query";

import { atom, useAtom } from "jotai";
import React, { useEffect } from "react";

export const bookmarksAtom = atom<Bookmark[] | null>(null);
export const collectionsAtom = atom<Collection[] | null>(null);
export const userDropDownOpen = atom<boolean>(false);

const StateProvider = ({ children }: { children: React.ReactNode }) => {
  const [bookmarks, setBookmarks] = useAtom(bookmarksAtom);
  const [collections, setCollections] = useAtom(collectionsAtom);
  const user = useUser();

  const { data: bookmarkedRecipes, refetch: refetchBookmarks } = useQuery<
    Bookmark[] | null
  >({
    queryKey: ["bookmarks", user, user?.id],
    queryFn: async () => {
      if (!user) return null;

      const data = await fetch(`/api/users/${user.id}/bookmarks`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_APP_TOKEN}`,
        },
      });

      const bookmarks = (await data.json()) as Bookmark[];
      console.log(bookmarks);
      setBookmarks(bookmarks);
      return bookmarks;
    },
  });

  const { data: userCollections, refetch: refetchCollections } = useQuery<
    Collection[] | null
  >({
    queryKey: ["collections", user, user?.id],
    queryFn: async () => {
      if (!user) return null;

      const res = await fetch(`/api/users/${user.id}/collections`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_APP_TOKEN}`,
        },
      });
      const returnCollections = (await res.json()) as Collection[];
      setCollections(returnCollections);
      return returnCollections;
    },
  });

  useEffect(() => {
    if (user) {
      // Trigger the query when user is defined
      refetchBookmarks();
      refetchCollections();
    }
  }, [user]);

  return children;
};

export default StateProvider;
