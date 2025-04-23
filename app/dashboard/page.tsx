"use client"

import { useState, useEffect } from "react"
import { Download, Calendar, Clock, MapPin, User } from "lucide-react"
import { gsap } from "gsap"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/header"
import { generateAppointmentPDF } from "@/lib/pdf-generator"
import { LabTestsHistory } from "@/components/lab-tests-history"
import { PageTransition } from "@/components/loading"

// Mock appointment data
const appointments = [
  {
    id: "apt-001",
    doctorName: "Dr. John Smith",
    doctorSpecialty: "Cardiology",
    date: "2023-09-15",
    time: "10:00 AM",
    hospital: "City Heart Hospital",
    tokenNumber: "C-123",
    status: "upcoming",
  },
  {
    id: "apt-002",
    doctorName: "Dr. Anita Patel",
    doctorSpecialty: "Cardiology",
    date: "2023-09-20",
    time: "2:30 PM",
    hospital: "University Hospital",
    tokenNumber: "C-145",
    status: "upcoming",
  },
  {
    id: "apt-003",
    doctorName: "Dr. Maria Garcia",
    doctorSpecialty: "Orthopedics",
    date: "2023-08-30",
    time: "11:15 AM",
    hospital: "Orthopedic Center",
    tokenNumber: "O-078",
    status: "completed",
  },
  {
    id: "apt-004",
    doctorName: "Dr. Sarah Williams",
    doctorSpecialty: "Dermatology",
    date: "2023-08-25",
    time: "9:00 AM",
    hospital: "Skin Care Clinic",
    tokenNumber: "D-056",
    status: "completed",
  },
  {
    id: "apt-005",
    doctorName: "Dr. Jennifer Kim",
    doctorSpecialty: "Neurology",
    date: "2023-08-10",
    time: "3:45 PM",
    hospital: "Neuroscience Center",
    tokenNumber: "N-112",
    status: "cancelled",
  },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("upcoming")

  const upcomingAppointments = appointments.filter((apt) => apt.status === "upcoming")
  const pastAppointments = appointments.filter((apt) => apt.status === "completed" || apt.status === "cancelled")

  useEffect(() => {
    // Animate dashboard title and description
    gsap.fromTo(".dashboard-title", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" })

    gsap.fromTo(
      ".dashboard-description",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.2 },
    )

    // Animate tabs
    gsap.fromTo(
      ".tabs-container",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.4 },
    )
  }, [])

  const handleDownloadPDF = (appointment) => {
    generateAppointmentPDF(appointment)
  }

  const formatDate = (dateString) => {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  return (
    <PageTransition>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-blue-50">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-start space-y-4 mb-8">
                <h1 className="dashboard-title text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  My Dashboard
                </h1>
                <p className="dashboard-description text-muted-foreground">
                  Manage your appointments and medical records
                </p>
              </div>

              <Tabs defaultValue="upcoming" className="w-full tabs-container" onValueChange={setActiveTab}>
                <TabsList className="grid w-full md:w-auto grid-cols-3">
                  <TabsTrigger value="upcoming">Upcoming Appointments</TabsTrigger>
                  <TabsTrigger value="history">Appointment History</TabsTrigger>
                  <TabsTrigger value="lab-tests">Lab Tests & History</TabsTrigger>
                </TabsList>
                <TabsContent value="upcoming" className="mt-6">
                  {upcomingAppointments.length === 0 ? (
                    <div className="text-center py-12">
                      <h3 className="text-lg font-medium">No upcoming appointments</h3>
                      <p className="text-muted-foreground mt-2">Book an appointment with a doctor to get started</p>
                      <img
                        src="/placeholder.svg?height=200&width=200"
                        alt="No appointments"
                        className="mx-auto my-6 h-40 w-40 opacity-50"
                      />
                      <Button className="mt-4 bg-blue-600 hover:bg-blue-700 btn-hover-effect" asChild>
                        <a href="/specialties">Book Appointment</a>
                      </Button>
                    </div>
                  ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {upcomingAppointments.map((appointment) => (
                        <AppointmentCard
                          key={appointment.id}
                          appointment={appointment}
                          onDownload={handleDownloadPDF}
                        />
                      ))}
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="history" className="mt-6">
                  {pastAppointments.length === 0 ? (
                    <div className="text-center py-12">
                      <h3 className="text-lg font-medium">No appointment history</h3>
                      <p className="text-muted-foreground mt-2">Your past appointments will appear here</p>
                      <img
                        src="/placeholder.svg?height=200&width=200"
                        alt="No appointment history"
                        className="mx-auto my-6 h-40 w-40 opacity-50"
                      />
                    </div>
                  ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {pastAppointments.map((appointment) => (
                        <AppointmentCard
                          key={appointment.id}
                          appointment={appointment}
                          onDownload={handleDownloadPDF}
                        />
                      ))}
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="lab-tests" className="mt-6">
                  <LabTestsHistory />
                </TabsContent>
              </Tabs>
            </div>
          </section>
        </main>
      </div>
    </PageTransition>
  )
}

function AppointmentCard({ appointment, onDownload }) {
  const statusColors = {
    upcoming: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  }

  return (
    <Card className="card-hover-effect border border-blue-100">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{appointment.doctorName}</CardTitle>
            <CardDescription>{appointment.doctorSpecialty}</CardDescription>
          </div>
          <div className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[appointment.status]}`}>
            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-blue-600" />
            <span>{new Date(appointment.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-blue-600" />
            <span>{appointment.time}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-blue-600" />
            <span>{appointment.hospital}</span>
          </div>
          <div className="flex items-center">
            <User className="h-4 w-4 mr-2 text-blue-600" />
            <span>Token: {appointment.tokenNumber}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full gap-2 btn-hover-effect" onClick={() => onDownload(appointment)}>
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
      </CardFooter>
    </Card>
  )
}
