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

const ServicesDrawerContext = createContext<ServicesDrawerValue | null>(null);

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
