import React from "react"
import { Moon, Sun, Monitor } from "lucide-react"
import { Button } from "../components/button"
import { cn } from "../utils/cn"
import { useTheme } from "next-themes"

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <div className="inline-flex items-center border rounded-full p-1">
      <Toggle className={cn("size-5 w-full h-hull p-1.5", theme === "system" && "border")} onClick={() => setTheme("system")}>
        <Monitor className="size-4" />
        <span className="sr-only">System theme</span>
      </Toggle>
      <Toggle className={cn("size-5 w-full h-hull p-1.5", theme === "light" && "border")} onClick={() => setTheme("light")}>
        <Sun className="size-4" />
        <span className="sr-only">Light theme</span>
      </Toggle>
      <Toggle className={cn("size-5 w-full h-hull p-1.5", theme === "dark" && "border")} onClick={() => setTheme("dark")}>
        <Moon className="size-4" />
        <span className="sr-only">Dark theme</span>
      </Toggle>
    </div>
  )
}

interface ToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { }

function Toggle({ className, ...props }: ToggleProps) {
  return <Button variant="ghost" size="icon" className={cn(className)} {...props} />
}

