
import { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "./button"

import { Link, useLocation,  } from "react-router-dom"


interface NavProps {

  links: {
    title: string
    label?: string
    icon: LucideIcon
    variant: "default" | "ghost"
    href : string
  }[]
}

export function Nav({ links }: NavProps) {
  const location = useLocation();
  const pathName = location.pathname;

  return (
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) =>
          <Link
            key={index}
            to={link.href}
            className={cn(
              buttonVariants({ variant: link.href === pathName ? "default" : "ghost", size: "lg" }),
              link.variant === "default" &&
                "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
              "justify-start"
            )}
          >
            <link.icon className="mr-2 h-4 w-4" />
            {link.title}
            {link.label && (
              <span
                className={cn(
                  "ml-auto",
                  link.variant === "default" &&
                    "text-background dark:text-white"
                )}
              >
                {link.label}
              </span>
            )}
          </Link>
        )}
      </nav>
  )
}
