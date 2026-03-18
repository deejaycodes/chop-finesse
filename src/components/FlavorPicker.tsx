import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";

interface FlavorPickerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  flavors: string[];
  itemName: string;
  onSelect: (flavor: string) => void;
}

const FlavorPicker = ({ open, onOpenChange, flavors, itemName, onSelect }: FlavorPickerProps) => {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="font-display text-lg">Choose a Flavor</DrawerTitle>
          <DrawerDescription className="font-body">{itemName}</DrawerDescription>
        </DrawerHeader>
        <div className="px-4 pb-6 flex flex-col gap-2">
          {flavors.map((flavor) => (
            <button
              key={flavor}
              onClick={() => onSelect(flavor)}
              className="w-full rounded-lg border border-border bg-card px-4 py-3 text-left text-sm font-body font-semibold text-card-foreground hover:bg-muted transition-colors active:scale-[0.98]"
            >
              {flavor}
            </button>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default FlavorPicker;
