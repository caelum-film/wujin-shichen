import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useEffect, useState } from "react";

export type Slip = {
  id: string;
  stallId: string;
  branch: string;
  title: string;
  body: string;
  at: number;
};

type JournalState = {
  slips: Slip[];
  addSlip: (slip: Omit<Slip, "id" | "at">) => void;
  removeSlip: (id: string) => void;
};

const memory = new Map<string, string>();

const safeStorage = {
  getItem: (name: string) => {
    if (typeof window === "undefined") return memory.get(name) ?? null;
    return window.localStorage.getItem(name);
  },
  setItem: (name: string, value: string) => {
    if (typeof window === "undefined") {
      memory.set(name, value);
      return;
    }
    window.localStorage.setItem(name, value);
  },
  removeItem: (name: string) => {
    if (typeof window === "undefined") {
      memory.delete(name);
      return;
    }
    window.localStorage.removeItem(name);
  },
};

export const useJournal = create<JournalState>()(
  persist(
    (set) => ({
      slips: [],
      addSlip: (partial) =>
        set((state) => {
          const slip: Slip = {
            ...partial,
            id:
              typeof crypto !== "undefined" && "randomUUID" in crypto
                ? crypto.randomUUID()
                : `${Date.now()}-${state.slips.length}`,
            at: Date.now(),
          };
          return { slips: [slip, ...state.slips].slice(0, 60) };
        }),
      removeSlip: (id) =>
        set((state) => ({ slips: state.slips.filter((s) => s.id !== id) })),
    }),
    {
      name: "wujin-shichen",
      storage: createJSONStorage(() => safeStorage),
      skipHydration: true,
    },
  ),
);

export function useJournalReady() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (useJournal.persist.hasHydrated()) {
      setReady(true);
      return;
    }
    const unsub = useJournal.persist.onFinishHydration(() => setReady(true));
    void useJournal.persist.rehydrate();
    return unsub;
  }, []);

  return ready;
}
