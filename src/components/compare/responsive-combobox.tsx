import { Dispatch, ReactNode, SetStateAction } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  selectedPokemon: string | null;
  setSelectedPokemon: Dispatch<SetStateAction<string | null>>;
};

export const ResponsiveCombobox = ({
  open,
  setOpen,
  children,
  selectedPokemon,
}: Props) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-start">
            {selectedPokemon ? <>{selectedPokemon}</> : <>Select Pokemon</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" align="start">
          {children}
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          {selectedPokemon ? <>{selectedPokemon}</> : <>Select Pokemon</>}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">{children}</div>
      </DrawerContent>
    </Drawer>
  );
};
