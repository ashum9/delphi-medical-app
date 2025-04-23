"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { CalendarIcon, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { BookingConfirmation } from "@/components/booking-confirmation"

// Generate time slots from 9 AM to 5 PM
const generateTimeSlots = () => {
  const slots = []
  for (let hour = 9; hour <= 17; hour++) {
    const hourFormatted = hour % 12 === 0 ? 12 : hour % 12
    const ampm = hour < 12 ? "AM" : "PM"
    slots.push(`${hourFormatted}:00 ${ampm}`)
    if (hour < 17) {
      slots.push(`${hourFormatted}:30 ${ampm}`)
    }
  }
  return slots
}

const timeSlots = generateTimeSlots()

export function BookingForm({ doctor }) {
  const router = useRouter()
  const [date, setDate] = useState(null)
  const [time, setTime] = useState("")
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [appointmentDetails, setAppointmentDetails] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!date || !time) {
      alert("Please select both date and time for your appointment")
      return
    }

    // Generate a random token number
    const specialtyPrefix = doctor.specialty.charAt(0).toUpperCase()
    const randomNum = Math.floor(Math.random() * 900) + 100
    const tokenNumber = `${specialtyPrefix}-${randomNum}`

    // Current token at clinic (would be fetched from backend in real app)
    const currentToken = `${specialtyPrefix}-${randomNum - 3}`

    const appointmentData = {
      id: `apt-${Date.now()}`,
      doctorName: doctor.name,
      doctorSpecialty: doctor.specialty,
      date: format(date, "yyyy-MM-dd"),
      time: time,
      hospital: doctor.hospitals[0],
      tokenNumber: tokenNumber,
      currentToken: currentToken,
      status: "upcoming",
    }

    setAppointmentDetails(appointmentData)
    setShowConfirmation(true)

    // In a real app, we would save this to a database
    console.log("Booking appointment:", appointmentData)
  }

  const handleConfirmationClose = () => {
    setShowConfirmation(false)
    router.push("/dashboard")
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Select Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                disabled={(date) =>
                  date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                  date > new Date(new Date().setDate(new Date().getDate() + 30))
                }
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Select Time</label>
          <Select value={time} onValueChange={setTime}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select time">
                {time ? (
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    {time}
                  </div>
                ) : (
                  "Select time"
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {timeSlots.map((slot) => (
                <SelectItem key={slot} value={slot}>
                  {slot}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" className="w-full">
          Book Appointment
        </Button>
      </form>

      {showConfirmation && <BookingConfirmation appointment={appointmentDetails} onClose={handleConfirmationClose} />}
    </>
  )
}
