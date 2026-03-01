'use client';
import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import TopHeader from "./TopHeader"
import LightBtn from "../button/LigthBtn"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose, faGrinHearts, faGripLines, faGripLinesVertical, faHeartBroken, faHeartCircleBolt, faHeartPulse, faListNumeric } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import LoginBtn from "../button/LoginBtn";
import { useSession } from "next-auth/react";
import { useAuthModal } from "@/hooks/auth/useAuthModal";
import SignInModal from "../modals/SignInModal";
import Wishlistbtn from "../button/Wishlistbtn";

const navItems = [
  { href: "/buy-cars", label: "Cars for sale" },
  { href: "/sell-trade", label: "Sell Your Car" },
  { href: "/finance", label: "Finance" },
  { href: "/insurance", label: "Insurance" },
  { href: "/about", label: "About Us" },
  { href: "/tools", label: "Tools & Resources" },
]


const Logo = () => {
  return (
    <Link
      href="/"
      className="flex items-center gap-2">
      <h2 className="text-3xl font-extrabold text-primary ">
        GetCar.
        <span className="font-extrabold text-black">
          com
        </span>
      </h2>
    </Link>
  )
}

const HeaderComponent = () => {
  const [open, setOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false)
  const { data: session, status } = useSession();
  const currentUser = session?.user;

  const {
    isAuthenticated,
    isLoading,
    isAuthModalOpen,
    openAuthModal,
    closeAuthModal,
    executeWithAuth,
    handleAuthSuccess,
    checkAuthAndProceed,
  } = useAuthModal();
  return (
    <header className="w-full border-b border-border/40">
      {/* Top header */}
      <TopHeader />
      {/* Main Navigation */}
      <div className="bg-transparent max-w-360 mx-auto px-20 py-4">
        <div className="mx-auto flex items-center justify-between">
          <Logo />
          <div className="flex flex-row items-center gap-4">
            {/* Navigation Bar - Desktop */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="light-nav-link"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Wishlist button */}
          </div>
            <Wishlistbtn />
            {/* Hamburger Menu - Mobile Only */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <FontAwesomeIcon icon={faGripLines} size="3x" className="text-neutral-800" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>

              <SheetContent side="left" className="w-full translate-y-10">
                <SheetHeader className="text-left">
                  <Logo />
                </SheetHeader>
                <nav className="flex flex-col gap-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-lg font-semibold hover:underline"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>

                {/* Sign In Section for Mobile Menu */}
                {status !== "authenticated" && (
                  <div className="mt-8 pt-6 border-t border-border/40">
                    <Button
                      variant="default"
                      className="w-full font-semibold text-base py-6"
                      onClick={() => {
                        setIsModalOpen(true)
                        setOpen(false)
                      }}
                    >
                      Sign In / Sign Up
                    </Button>
                    <p className="text-xs text-center text-muted-foreground mt-3">
                      Join us to save your favorite cars and get personalized recommendations
                    </p>
                  </div>
                )}
              </SheetContent>
            </Sheet>
        </div>
      </div>

      {/* Sign In Modal */}
      <SignInModal
        isOpen={isModalOpen || isAuthModalOpen}
        onClose={isAuthModalOpen ? closeAuthModal : () => setIsModalOpen(false)}
        onLoginSuccess={handleAuthSuccess}
      />
    </header>
  )
}

export default HeaderComponent;
