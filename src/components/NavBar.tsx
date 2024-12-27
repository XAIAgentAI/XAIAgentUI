// No React import needed with automatic JSX runtime
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"

interface NavBarProps {
  className?: string;
}

const categories = [
  {
    title: "Top Picks",
    href: "/category/top-picks",
    description: "Curated selection of our most popular agents",
  },
  {
    title: "Writing",
    href: "/category/writing",
    description: "AI agents specialized in writing and content creation",
  },
  {
    title: "Productivity",
    href: "/category/productivity",
    description: "Boost your workflow with automation and organization",
  },
  {
    title: "Research & Analysis",
    href: "/category/research",
    description: "Deep research and analytical capabilities",
  },
  {
    title: "Education",
    href: "/category/education",
    description: "Learning assistants and educational tools",
  },
  {
    title: "Programming",
    href: "/category/programming",
    description: "Coding assistance and development tools",
  },
]

export function NavBar({ className }: NavBarProps): JSX.Element {
  return (
    <NavigationMenu className={cn(className)}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900">
            Categories
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {categories.map((category) => (
                <li key={category.title}>
                  <NavigationMenuLink asChild>
                    <Link
                      to={category.href}
                      className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
                        "hover:bg-brand-orange-50 hover:text-brand-orange-600",
                        "focus:bg-brand-orange-50 focus:text-brand-orange-600"
                      )}
                    >
                      <div className="text-sm font-medium leading-none">{category.title}</div>
                      <p className="line-clamp-2 text-sm leading-snug text-neutral-500">
                        {category.description}
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
