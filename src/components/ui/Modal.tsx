import type {ReactNode} from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,

} from "@/components/ui/navigation-menu";

interface Props {
  children?: ReactNode
  text: string;
}

export default function Modal({children, text}: Props) {

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="cursor-pointer font-normal text-base bg-stone-200 whitespace-pre">{text}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink>{children}</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
