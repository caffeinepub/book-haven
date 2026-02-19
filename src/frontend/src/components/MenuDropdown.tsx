import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Settings, Palette, Menu } from 'lucide-react';

export default function MenuDropdown() {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-sage hover:text-forest-green hover:bg-sage-light/50"
        >
          <img
            src="/assets/generated/menu-icon.dim_48x48.png"
            alt="Menu"
            className="h-6 w-6"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-56 bg-cream border-2 border-sage-light shadow-lg"
      >
        <DropdownMenuItem
          className="cursor-pointer text-sage hover:text-forest-green hover:bg-sage-light/50"
          onClick={() => {
            setOpen(false);
            // Settings functionality can be added here
          }}
        >
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer text-sage hover:text-forest-green hover:bg-sage-light/50"
          onClick={() => {
            setOpen(false);
            // Personalization functionality can be added here
          }}
        >
          <Palette className="mr-2 h-4 w-4" />
          Personalization
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-sage-light" />
        <DropdownMenuItem
          className="cursor-pointer text-sage hover:text-forest-green hover:bg-sage-light/50"
          onClick={() => {
            setOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <Menu className="mr-2 h-4 w-4" />
          Browse Catalog
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
