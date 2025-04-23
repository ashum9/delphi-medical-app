import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { BookingForm } from "@/components/booking-form"

// Mock data for doctors (same as in specialty page)
const allDoctors = [
  {
    id: "dr-smith",
    name: "Dr. John Smith",
    qualification: "MD, FACC",
    experience: 15,
    hospitals: ["City Heart Hospital", "Medical Center"],
    image: "/placeholder.svg?height=300&width=300",
    specialty: "Cardiology",
    bio: "Dr. Smith is a board-certified cardiologist with over 15 years of experience in treating heart conditions. He specializes in preventive cardiology and heart failure management.",
    education: [
      "Medical Degree: Harvard Medical School",
      "Residency: Massachusetts General Hospital",
      "Fellowship: Cleveland Clinic",
    ],
    specializations: ["Preventive Cardiology", "Heart Failure Management", "Cardiac Imaging"],
  },
  {
    id: "dr-patel",
    name: "Dr. Anita Patel",
    qualification: "MD, FACC, PhD",
    experience: 12,
    hospitals: ["University Hospital", "Cardiac Care Center"],
    image: "/placeholder.svg?height=300&width=300",
    specialty: "Cardiology",
    bio: "Dr. Patel is a cardiologist specializing in interventional procedures and cardiac imaging. She has published numerous research papers on cardiovascular health.",
    education: [
      "Medical Degree: Johns Hopkins University",
      "Residency: Stanford University Medical Center",
      "Fellowship: Mayo Clinic",
    ],
    specializations: ["Interventional Cardiology", "Cardiac Imaging", "Women's Heart Health"],
  },
  // Add more doctors from other specialties
]

export default function DoctorPage({ params }) {
  const doctorId = params.id
  const doctor = allDoctors.find((doc) => doc.id === doctorId) || allDoctors[0]

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-teal-50">
          <div className="container px-4 md:px-6">
            <div className="mb-8">
              <Link href={`/specialties/${doctor.specialty.toLowerCase()}`}>
                <Button variant="ghost" className="gap-1">
                  <ArrowLeft className="h-4 w-4" />
                  Back to {doctor.specialty} Doctors
                </Button>
              </Link>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <img
                    src={doctor.image || "/placeholder.svg"}
                    alt={doctor.name}
                    width={200}
                    height={200}
                    className="rounded-lg object-cover"
                  />
                  <div>
                    <h1 className="text-3xl font-bold">{doctor.name}</h1>
                    <p className="text-muted-foreground">{doctor.qualification}</p>
                    <p className="text-muted-foreground">{doctor.specialty}</p>
                    <p className="mt-2">{doctor.experience} years of experience</p>
                    <div className="mt-4">
                      <h3 className="font-semibold">Hospitals:</h3>
                      <ul className="list-disc list-inside text-muted-foreground">
                        {doctor.hospitals.map((hospital) => (
                          <li key={hospital}>{hospital}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">About</h2>
                  <p className="text-muted-foreground">{doctor.bio}</p>
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">Education</h2>
                  <ul className="list-disc list-inside text-muted-foreground">
                    {doctor.education.map((edu, index) => (
                      <li key={index}>{edu}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">Specializations</h2>
                  <ul className="list-disc list-inside text-muted-foreground">
                    {doctor.specializations.map((spec, index) => (
                      <li key={index}>{spec}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="lg:pl-6">
                <div className="sticky top-6 bg-white rounded-lg border shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4">Book an Appointment</h2>
                  <BookingForm doctor={doctor} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
