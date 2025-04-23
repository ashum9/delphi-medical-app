"use client"

import { useEffect } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { gsap } from "gsap"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { PageTransition } from "@/components/loading"

const specialties = [
  {
    id: "cardiology",
    name: "Cardiology",
    description: "Heart and cardiovascular system specialists",
    icon: "❤️",
  },
  {
    id: "dermatology",
    name: "Dermatology",
    description: "Skin, hair, and nail specialists",
    icon: "🧬",
  },
  {
    id: "orthopedics",
    name: "Orthopedics",
    description: "Bone, joint, and muscle specialists",
    icon: "🦴",
  },
  {
    id: "neurology",
    name: "Neurology",
    description: "Brain and nervous system specialists",
    icon: "🧠",
  },
  {
    id: "pediatrics",
    name: "Pediatrics",
    description: "Child and adolescent health specialists",
    icon: "👶",
  },
  {
    id: "dentistry",
    name: "Dentistry",
    description: "Oral health and dental care specialists",
    icon: "🦷",
  },
  {
    id: "ophthalmology",
    name: "Ophthalmology",
    description: "Eye and vision specialists",
    icon: "👁️",
  },
  {
    id: "gynecology",
    name: "Gynecology",
    description: "Women's reproductive health specialists",
    icon: "👩",
  },
  {
    id: "ent",
    name: "ENT",
    description: "Ear, nose, and throat specialists",
    icon: "👂",
  },
  {
    id: "psychiatry",
    name: "Psychiatry",
    description: "Mental health specialists",
    icon: "🧠",
  },
  {
    id: "urology",
    name: "Urology",
    description: "Urinary tract and male reproductive specialists",
    icon: "🚽",
  },
  {
    id: "endocrinology",
    name: "Endocrinology",
    description: "Hormone and metabolic specialists",
    icon: "⚗️",
  },
]

export default function SpecialtiesPage() {
  useEffect(() => {
    // Animate title and description
    gsap.fromTo(".page-title", { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" })

    gsap.fromTo(
      ".page-description",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.2 },
    )

    // Animate specialty cards with stagger
    gsap.fromTo(
      ".specialty-card",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.4,
      },
    )
  }, [])

  return (
    <PageTransition>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-blue-50">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="page-title text-3xl font-bold tracking-tighter sm:text-5xl">Medical Specialties</h1>
                  <p className="page-description max-w-[900px] text-muted-foreground md:text-xl">
                    Choose a specialty to find the right doctor for your needs
                  </p>
                </div>
              </div>
              <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
                {specialties.map((specialty) => (
                  <Link key={specialty.id} href={`/specialties/${specialty.id}`}>
                    <Card className="specialty-card overflow-hidden transition-all hover:shadow-md card-hover-effect bg-white border border-blue-100">
                      <CardContent className="p-0">
                        <div className="flex flex-col items-center p-6">
                          <div className="text-4xl mb-4">{specialty.icon}</div>
                          <h3 className="text-xl font-bold">{specialty.name}</h3>
                          <p className="text-center text-muted-foreground mt-2">{specialty.description}</p>
                          <Button variant="link" className="mt-4 gap-1 text-blue-600 hover:text-blue-700">
                            View Doctors
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </PageTransition>
  )
}
