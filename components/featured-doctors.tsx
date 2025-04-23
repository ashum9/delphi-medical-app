"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

// Featured doctors data
const featuredDoctors = [
  {
    id: "dr-emma-wilson",
    name: "Dr. Emma Wilson",
    specialty: "Cardiology",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    experience: 12,
  },
  {
    id: "dr-michael-chen",
    name: "Dr. Michael Chen",
    specialty: "Neurology",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    experience: 15,
  },
  {
    id: "dr-sophia-rodriguez",
    name: "Dr. Sophia Rodriguez",
    specialty: "Pediatrics",
    image:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80",
    experience: 10,
  },
  {
    id: "dr-james-patel",
    name: "Dr. James Patel",
    specialty: "Dermatology",
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1964&q=80",
    experience: 8,
  },
]

export function FeaturedDoctors() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Animate section title
    gsap.fromTo(
      ".section-title",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      },
    )

    // Animate doctor cards with stagger
    gsap.fromTo(
      cardsRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      },
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="w-full py-16 md:py-24 bg-blue-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2 section-title">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Meet Our Top Doctors</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Experienced specialists dedicated to providing exceptional care
            </p>
          </div>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {featuredDoctors.map((doctor, index) => (
            <Card
              key={doctor.id}
              className="overflow-hidden card-hover-effect bg-white border border-blue-100"
              ref={(el) => (cardsRef.current[index] = el)}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={doctor.image || "/placeholder.svg"}
                  alt={doctor.name}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold">{doctor.name}</h3>
                <p className="text-blue-600 font-medium">{doctor.specialty}</p>
                <p className="text-sm text-muted-foreground mt-2">{doctor.experience} years of experience</p>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button className="w-full bg-primary hover:bg-blue-600 btn-hover-effect" asChild>
                  <Link href={`/doctors/${doctor.id}`}>
                    Book Appointment
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
