import { SharedLogo } from "@/components/ui/shared-logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

interface NavbarProps {
  navigationItems: { href: string; label: string }[];
  rightNavigationItems: { href: string; label: string; isButton: boolean }[];
}

export const Navbar: React.FC<NavbarProps> = ({ navigationItems, rightNavigationItems }) => (
  <nav className="flex justify-between items-center px-4 sm:px-8 md:px-16 py-4 sm:py-6 relative z-10 flex-shrink-0">
    {/* Left side - Logo */}
    <SharedLogo variant="navbar" clickable />

    {/* Center - Navigation Menu */}
    <NavigationMenu>
      <NavigationMenuList>
        {navigationItems.map((item, index) => (
          <NavigationMenuItem key={index}>
            <NavigationMenuLink
              href={item.href}
              className="text-secondary font-medium text-base hover:text-secondary hover:bg-muted transition-colors px-4 py-2 rounded-md"
            >
              {item.label}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>

    {/* Right side - Navigation Menu for Login and Get Started */}
    <NavigationMenu>
      <NavigationMenuList>
        {rightNavigationItems.map((item, index) => (
          <NavigationMenuItem key={index}>
            <NavigationMenuLink
              href={item.href}
              className={
                item.isButton
                  ? "bg-primary text-white px-6 py-2 rounded-[10px] font-medium text-base hover:bg-secondary hover:text-white transition-colors"
                  : "text-secondary font-medium text-base hover:text-secondary hover:bg-muted transition-colors px-4 py-2 rounded-md"
              }
            >
              {item.label}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
        <NavigationMenuItem>
          <ThemeToggle />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  </nav>
);

export default Navbar; 