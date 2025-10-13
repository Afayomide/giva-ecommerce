"use client"

import Link from "next/link"
import { ShoppingCart, Menu, X, User, LogOut } from "lucide-react"
import { BrandName } from "./brand-name"
import { Button } from "./ui/button"
import { useState } from "react"
import { useCart } from "@/lib/cart-context"
import { ThemeToggle } from "./theme-toggle"
import { Logo } from "./logo"
import { useAuth } from "@/lib/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { items } = useCart()
  const { user, logout, isAuthenticated } = useAuth()
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo className="rounded-full flex h-full w-full items-center justify-center text-xl font-bold text-primary-foreground" />
            <Link href="/" className="text-2xl font-bold tracking-tight">
              <BrandName />
            </Link>
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            <Link href="/products" className="text-sm font-medium transition-colors hover:text-muted-foreground">
              Products
            </Link>
            <Link href="/collections" className="text-sm font-medium transition-colors hover:text-muted-foreground">
              Collections
            </Link>
            <Link href="/about" className="text-sm font-medium transition-colors hover:text-muted-foreground">
              About
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.fullname}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden items-center gap-2 md:flex">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/login">Sign in</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/signup">Sign up</Link>
                </Button>
              </div>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="flex flex-col gap-4 border-t border-border py-4 md:hidden">
            <Link
              href="/products"
              className="text-sm font-medium transition-colors hover:text-muted-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/collections"
              className="text-sm font-medium transition-colors hover:text-muted-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Collections
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium transition-colors hover:text-muted-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            {!isAuthenticated && (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium transition-colors hover:text-muted-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign in
                </Link>
                <Link
                  href="/signup"
                  className="text-sm font-medium transition-colors hover:text-muted-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign up
                </Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  )
}
