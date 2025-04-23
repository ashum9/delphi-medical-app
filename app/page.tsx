"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowRight, Calendar, FileText, User } from "lucide-react"
import { gsap } from "gsap"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AnimatedStats } from "@/components/animated-stats"
import { FeaturedDoctors } from "@/components/featured-doctors"
import { PageTransition } from "@/components/loading"

export default function Home() {
  const heroRef = useRef(null)
  const howItWorksRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    // Hero section animations
    const heroTl = gsap.timeline()

    heroTl
      .fromTo(".hero-title", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" })
      .fromTo(
        ".hero-description",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.6",
      )
      .fromTo(".hero-buttons", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.6")
      .fromTo(".hero-image", { x: 50, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power2.out" }, "-=0.8")

    // How it works section animations
    gsap.fromTo(
      ".section-title",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: howItWorksRef.current,
          start: "top 80%",
        },
      },
    )

    // Card animations with stagger
    gsap.fromTo(
      cardsRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: howItWorksRef.current,
          start: "top 70%",
        },
      },
    )

    return () => {
      // Clean up animations
      if (heroTl) heroTl.kill()
    }
  }, [])

  return (
    <PageTransition>
      <div className="flex flex-col min-h-screen">
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
        <main className="flex-1">
          <section ref={heroRef} className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-blue-50">
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                <div className="flex flex-col justify-center space-y-4">
                  <div className="space-y-2">
                    <h1 className="hero-title text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                      Your Health, Our Priority
                    </h1>
                    <p className="hero-description max-w-[600px] text-muted-foreground md:text-xl">
                      Book appointments with top specialists in your area. Fast, convenient, and secure.
                    </p>
                  </div>
                  <div className="hero-buttons flex flex-col gap-2 min-[400px]:flex-row">
                    <Link href="/specialties">
                      <Button size="lg" className="gap-1 bg-blue-600 hover:bg-blue-700 btn-hover-effect">
                        Find a Doctor
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href="/dashboard">
                      <Button size="lg" variant="outline" className="btn-hover-effect">
                        View Appointments
                      </Button>
                    </Link>
                  </div>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                  alt="Delphi Medical Services"
                  width={550}
                  height={550}
                  className="hero-image mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last shadow-lg"
                />
              </div>
            </div>
          </section>

          <AnimatedStats />

          <section ref={howItWorksRef} className="w-full py-16 md:py-24 bg-white">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2 section-title">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">How It Works</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Book your medical appointments in three simple steps
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
                {[
                  {
                    icon: <User className="h-6 w-6" />,
                    title: "Choose Specialist",
                    description:
                      "Browse through our list of medical specialties and find the right doctor for your needs.",
                  },
                  {
                    icon: <Calendar className="h-6 w-6" />,
                    title: "Book Appointment",
                    description: "Select a convenient date and time from the available slots for your appointment.",
                  },
                  {
                    icon: <FileText className="h-6 w-6" />,
                    title: "Get Confirmation",
                    description: "Receive your appointment details with token number and download for your records.",
                  },
                ].map((item, index) => (
                  <Card
                    key={index}
                    className="border-2 border-blue-100 card-hover-effect shadow-sm"
                    ref={(el) => (cardsRef.current[index] = el)}
                  >
                    <CardContent className="flex flex-col items-center gap-2 p-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 transition-transform duration-300 hover:scale-110">
                        {item.icon}
                      </div>
                      <h3 className="text-xl font-bold">{item.title}</h3>
                      <p className="text-center text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <FeaturedDoctors />

          <section className="w-full py-16 md:py-24 bg-blue-50">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2 section-title">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Popular Specialties</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Find the right specialist for your medical needs
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
                {["Cardiology", "Dermatology", "Orthopedics", "Neurology", "Pediatrics", "Dentistry"].map(
                  (specialty) => (
                    <Link key={specialty} href={`/specialties/${specialty.toLowerCase()}`}>
                      <Card className="overflow-hidden transition-all hover:shadow-md card-hover-effect bg-white border border-blue-100">
                        <CardContent className="p-0">
                          <div className="flex flex-col items-center p-6">
                            <h3 className="text-xl font-bold">{specialty}</h3>
                            <p className="text-center text-muted-foreground mt-2">
                              Find top {specialty.toLowerCase()} specialists
                            </p>
                            <Button variant="link" className="mt-4 gap-1 text-blue-600 hover:text-blue-700">
                              View Doctors
                              <ArrowRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ),
                )}
              </div>
              <div className="flex justify-center">
                <Link href="/specialties">
                  <Button variant="outline" size="lg" className="btn-hover-effect">
                    View All Specialties
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </main>
        <footer className="border-t bg-white">
          <div className="container flex flex-col gap-4 py-10 md:flex-row md:gap-8">
            <div className="flex-1 space-y-2">
              <Link href="/" className="flex items-center gap-2">
                <span className="text-2xl font-bold tracking-tighter text-blue-600">𝘿𝙚𝙡𝙥𝙝𝙞</span>
                <span className="sr-only">Delphi Medical</span>
              </Link>
              <p className="text-sm text-muted-foreground">
                Your trusted partner for medical appointments and healthcare services.
              </p>
            </div>
            <div className="flex flex-col gap-2 md:flex-row md:gap-12">
              <div className="space-y-2">
                <h4 className="font-medium">Quick Links</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/specialties" className="hover:underline hover:text-blue-600 transition-colors">
                      Find Doctors
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard" className="hover:underline hover:text-blue-600 transition-colors">
                      My Appointments
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Support</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="#" className="hover:underline hover:text-blue-600 transition-colors">
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline hover:text-blue-600 transition-colors">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:underline hover:text-blue-600 transition-colors">
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t py-6">
            <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
              <p className="text-center text-sm text-muted-foreground md:text-left">
                © {new Date().getFullYear()} Delphi Medical. All rights reserved.
              </p>
              <div className="flex gap-4">
                <Link href="#" className="text-muted-foreground hover:text-blue-600 transition-colors">
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-blue-600 transition-colors">
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-blue-600 transition-colors">
                  <span className="sr-only">Facebook</span>
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </PageTransition>
  )
}
