import { Flame, Share2 } from "lucide-react";
import { useCallback } from "react";

const MenuHeader = () => {
  const handleShare = useCallback(async () => {
    const shareData = {
      title: "Chop Finesse Menu",
      text: "Check out the Chop Finesse menu! 🍗🔥",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert("Menu link copied!");
    }
  }, []);

  return (
    <header className="bg-foreground px-4 py-6 text-center relative">
      <button
        onClick={handleShare}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-primary/20 p-2 text-primary-foreground hover:bg-primary/30 transition-colors"
        aria-label="Share menu"
      >
        <Share2 className="h-5 w-5" />
      </button>
      <div className="flex items-center justify-center gap-2">
        <h1 className="text-3xl font-display font-black tracking-tight">
          <span className="text-primary-foreground">CHOP</span>
          <span className="text-primary"> FINESSE</span>
        </h1>
        <Flame className="h-7 w-7 text-accent" />
      </div>
      <p className="mt-1 text-sm italic text-primary-foreground/70 font-display">
        Finesse Your Tastebuds.
      </p>
    </header>
  );
};

export default MenuHeader;
