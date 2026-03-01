import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

const FooterComponent = () => {
  return (
    <footer className="bg-[#0a1f2e] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and Social */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <span className="text-2xl font-bold text-neutral-500">
                Get<span className="font-extrabold text-primary">Car</span>
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="#" className="hover:text-orange-500 transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="hover:text-orange-500 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="hover:text-orange-500 transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="hover:text-orange-500 transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="hover:text-orange-500 transition-colors">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          {/* About Us */}
          <div>
            <h3 className="font-semibold text-lg mb-4">About Us</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-orange-500 transition-colors">
                  About Go Auto
                </Link>
              </li>
              <li>
                <Link href="/go-gives-back" className="hover:text-orange-500 transition-colors">
                  Go Gives Back
                </Link>
              </li>
              <li>
                <Link href="/go-auto-fleet" className="hover:text-orange-500 transition-colors">
                  Go Auto Fleet
                </Link>
              </li>
              <li>
                <Link href="/go-auto-certified-vehicles" className="hover:text-orange-500 transition-colors">
                  Go Auto Certified Vehicles
                </Link>
              </li>
            </ul>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shop/new" className="hover:text-orange-500 transition-colors">
                  Shop Vehicles
                </Link>
              </li>
              <li>
                <Link href="/shop/used" className="hover:text-orange-500 transition-colors">
                  Used Vehicles
                </Link>
              </li>
              <li>
                <Link href="/shop/certified" className="hover:text-orange-500 transition-colors">
                  Certified
                </Link>
              </li>
              <li>
                <Link href="/shop/ev" className="hover:text-orange-500 transition-colors">
                  EVs
                </Link>
              </li>
              <li>
                <Link href="/shop/rv" className="hover:text-orange-500 transition-colors">
                  RVs
                </Link>
              </li>
              <li>
                <Link href="/sell-my-car" className="hover:text-orange-500 transition-colors">
                  Sell My Car
                </Link>
              </li>
            </ul>
          </div>

          {/* Financing */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Financing</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/finance/pre-approval" className="hover:text-orange-500 transition-colors">
                  Pre-approval form
                </Link>
              </li>
              <li>
                <Link href="/finance/credit-check" className="hover:text-orange-500 transition-colors">
                  Credit Check
                </Link>
              </li>
              <li>
                <Link href="/finance/calculator" className="hover:text-orange-500 transition-colors">
                  Finance Calculator
                </Link>
              </li>
              <li>
                <Link href="/finance/trade-in-calculator" className="hover:text-orange-500 transition-colors">
                  Trade-in Calculator
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/service" className="hover:text-orange-500 transition-colors">
                  Service
                </Link>
              </li>
              <li>
                <Link href="/service/book" className="hover:text-orange-500 transition-colors">
                  Book a service
                </Link>
              </li>
              <li>
                <Link href="/parts" className="hover:text-orange-500 transition-colors">
                  Parts & services
                </Link>
              </li>
              <li>
                <Link href="/tools-resources" className="hover:text-orange-500 transition-colors">
                  Tools & Resources
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <Link href="tel:780-777-7777" className="flex items-center gap-2 text-sm hover:text-orange-500 transition-colors">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              780 777 7777
            </Link>
            <Link href="mailto:contact@goauto.ca" className="flex items-center gap-2 text-sm hover:text-orange-500 transition-colors">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact us
            </Link>
            <Link href="/emergency-roadside" className="flex items-center gap-2 text-sm hover:text-orange-500 transition-colors">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Emergency roadside
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="flex items-center gap-4">
            <div className="h-12 w-auto opacity-70 hover:opacity-100 transition-opacity">
              <Image
                src="/placeholder.svg?height=48&width=80"
                alt="BBB Accredited"
                width={80}
                height={48}
                className="object-contain"
              />
            </div>
            <div className="h-12 w-auto opacity-70 hover:opacity-100 transition-opacity">
              <Image
                src="/placeholder.svg?height=48&width=80"
                alt="AMVIC"
                width={80}
                height={48}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#051420] py-4">
        <div className="container mx-auto px-4 flex flex-wrap items-center justify-between gap-4 text-sm text-white/60">
          <div className="flex items-center gap-4">
            <Link href="/disclaimer" className="hover:text-white transition-colors">
              Disclaimer
            </Link>
            <Link href="/terms-conditions" className="hover:text-white transition-colors">
              Terms & Conditions Policy
            </Link>
            <Link href="/sitemap" className="hover:text-white transition-colors">
              Sitemap
            </Link>
          </div>
          <p>&copy; 2025 Go Auto. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default FooterComponent