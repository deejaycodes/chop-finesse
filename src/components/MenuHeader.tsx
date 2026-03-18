import { Flame } from "lucide-react";

const MenuHeader = () => {
  return (
    <header className="bg-foreground px-4 py-6 text-center">
      <div className="flex items-center justify-center gap-2">
        <h1 className="text-3xl font-display font-black tracking-tight">
          <span className="text-primary-foreground">CHOP</span>
          <span className="text-primary"> FINESSE</span>
        </h1>
        <Flame className="h-7 w-7 text-accent" />
      </div>
      <p className="mt-1 text-sm italic text-muted-foreground font-display">
        Finesse Your Tastebuds.
      </p>
    </header>
  );
};

export default MenuHeader;
