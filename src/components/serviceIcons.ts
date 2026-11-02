import {
  Gamepad2,
  MousePointerClick,
  Music,
  SlidersHorizontal,
  type LucideIcon,
} from "lucide-react";
import type { ServiceIconKey } from "@/data/services";

export const serviceIcons: Record<ServiceIconKey, LucideIcon> = {
  ui: MousePointerClick,
  game: Gamepad2,
  brand: Music,
  post: SlidersHorizontal,
};
