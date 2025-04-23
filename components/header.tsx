import Link from "next/link"
import { User } from "lucide-react"

import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="border-b bg-white shadow-sm">
      <div className="container flex h-16 items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tighter text-blue-600">𝘿𝙚𝙡𝙥𝙝𝙞</span>
          <span className="sr-only">Delphi Medical</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href="/" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Home
          </Link>
          <Link href="/specialties" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Find Doctors
          </Link>
          <Link href="/dashboard" className="text-sm font-medium hover:text-blue-600 transition-colors">
            Dashboard
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="outline" size="sm" className="hidden md:flex btn-hover-effect">
              <User className="mr-2 h-4 w-4" />
              My Account
            </Button>
          </Link>
          <Link href="/specialties">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 btn-hover-effect">
              Book Appointment
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
