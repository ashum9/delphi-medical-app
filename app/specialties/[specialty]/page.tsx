import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { DoctorCard } from "@/components/doctor-card"

// Mock data for doctors
const doctorsData = {
  cardiology: [
    {
      id: "dr-smith",
      name: "Dr. John Smith",
      qualification: "MD, FACC",
      experience: 15,
      hospitals: ["City Heart Hospital", "Medical Center"],
      image: "/placeholder.svg?height=300&width=300",
      specialty: "Cardiology",
    },
    {
      id: "dr-patel",
      name: "Dr. Anita Patel",
      qualification: "MD, FACC, PhD",
      experience: 12,
      hospitals: ["University Hospital", "Cardiac Care Center"],
      image: "/placeholder.svg?height=300&width=300",
      specialty: "Cardiology",
    },
    {
      id: "dr-johnson",
      name: "Dr. Robert Johnson",
      qualification: "MD, FACC",
      experience: 20,
      hospitals: ["Heart Institute", "General Hospital"],
      image: "/placeholder.svg?height=300&width=300",
      specialty: "Cardiology",
    },
  ],
  dermatology: [
    {
      id: "dr-williams",
      name: "Dr. Sarah Williams",
      qualification: "MD, FAAD",
      experience: 10,
      hospitals: ["Skin Care Clinic", "Medical Center"],
      image: "/placeholder.svg?height=300&width=300",
      specialty: "Dermatology",
    },
    {
      id: "dr-chen",
      name: "Dr. David Chen",
      qualification: "MD, FAAD",
      experience: 8,
      hospitals: ["University Hospital", "Dermatology Institute"],
      image: "/placeholder.svg?height=300&width=300",
      specialty: "Dermatology",
    },
  ],
  orthopedics: [
    {
      id: "dr-garcia",
      name: "Dr. Maria Garcia",
      qualification: "MD, FAAOS",
      experience: 18,
      hospitals: ["Orthopedic Center", "Sports Medicine Clinic"],
      image: "/placeholder.svg?height=300&width=300",
      specialty: "Orthopedics",
    },
    {
      id: "dr-thompson",
      name: "Dr. James Thompson",
      qualification: "MD, FAAOS",
      experience: 22,
      hospitals: ["Joint Replacement Center", "General Hospital"],
      image: "/placeholder.svg?height=300&width=300",
      specialty: "Orthopedics",
    },
  ],
  neurology: [
    {
      id: "dr-kim",
      name: "Dr. Jennifer Kim",
      qualification: "MD, PhD",
      experience: 14,
      hospitals: ["Neuroscience Center", "University Hospital"],
      image: "/placeholder.svg?height=300&width=300",
      specialty: "Neurology",
    },
  ],
  pediatrics: [
    {
      id: "dr-rodriguez",
      name: "Dr. Carlos Rodriguez",
      qualification: "MD, FAAP",
      experience: 16,
      hospitals: ["Children's Hospital", "Family Care Center"],
      image: "/placeholder.svg?height=300&width=300",
      specialty: "Pediatrics",
    },
  ],
  dentistry: [
    {
      id: "dr-wilson",
      name: "Dr. Emily Wilson",
      qualification: "DDS",
      experience: 9,
      hospitals: ["Dental Care Clinic", "Smile Center"],
      image: "/placeholder.svg?height=300&width=300",
      specialty: "Dentistry",
    },
  ],
}

// Default doctors for specialties without specific data
const defaultDoctors = [
  {
    id: "dr-default-1",
    name: "Dr. Jane Doe",
    qualification: "MD",
    experience: 10,
    hospitals: ["General Hospital", "Medical Center"],
    image: "/placeholder.svg?height=300&width=300",
    specialty: "",
  },
  {
    id: "dr-default-2",
    name: "Dr. Michael Brown",
    qualification: "MD, PhD",
    experience: 15,
    hospitals: ["University Hospital", "Specialty Clinic"],
    image: "/placeholder.svg?height=300&width=300",
    specialty: "",
  },
]

// Helper to get specialty name from ID
const getSpecialtyName = (id) => {
  const specialtyMap = {
    cardiology: "Cardiology",
    dermatology: "Dermatology",
    orthopedics: "Orthopedics",
    neurology: "Neurology",
    pediatrics: "Pediatrics",
    dentistry: "Dentistry",
    ophthalmology: "Ophthalmology",
    gynecology: "Gynecology",
    ent: "ENT",
    psychiatry: "Psychiatry",
    urology: "Urology",
    endocrinology: "Endocrinology",
  }
  return specialtyMap[id] || id.charAt(0).toUpperCase() + id.slice(1)
}

export default function SpecialtyPage({ params }) {
  const specialty = params.specialty
  const specialtyName = getSpecialtyName(specialty)

  // Get doctors for this specialty or use default
  const doctors =
    doctorsData[specialty] ||
    defaultDoctors.map((doctor) => ({
      ...doctor,
      specialty: specialtyName,
    }))

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-teal-50">
          <div className="container px-4 md:px-6">
            <div className="mb-8">
              <Link href="/specialties">
                <Button variant="ghost" className="gap-1">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Specialties
                </Button>
              </Link>
            </div>
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">{specialtyName} Specialists</h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Find and book appointments with top {specialtyName.toLowerCase()} doctors
                </p>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {doctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
