import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { services } from "@/data/services";
import ServicesDrawer from "@/components/ServicesDrawer";

type ServicesDrawerValue = {
  open: boolean;
  activeSlug: string;
  openServices: (slug?: string) => void;
  setActiveSlug: (slug: string) => void;
  setOpen: (open: boolean) => void;
};

// Keep one context instance across hot reloads (this module and ServicesDrawer import each other),
// otherwise a reload creates a new context that the already-mounted provider doesn't supply.
const globalKey = "__servicesDrawerContext__";
const globalStore = globalThis as unknown as Record<string, React.Context<ServicesDrawerValue | null>>;
const ServicesDrawerContext =
  globalStore[globalKey] ?? (globalStore[globalKey] = createContext<ServicesDrawerValue | null>(null));

export const ServicesDrawerProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [activeSlug, setActiveSlug] = useState(services[0].slug);

  const openServices = useCallback((slug?: string) => {
    if (slug && services.some((service) => service.slug === slug)) {
      setActiveSlug(slug);
    }
    setOpen(true);
  }, []);

  const value = useMemo(
    () => ({ open, activeSlug, openServices, setActiveSlug, setOpen }),
    [open, activeSlug, openServices],
  );

  return (
    <ServicesDrawerContext.Provider value={value}>
      {children}
      <ServicesDrawer />
    </ServicesDrawerContext.Provider>
  );
};

export const useServicesDrawer = () => {
  const context = useContext(ServicesDrawerContext);
  if (!context) {
    throw new Error("useServicesDrawer must be used within ServicesDrawerProvider");
  }
  return context;
};
