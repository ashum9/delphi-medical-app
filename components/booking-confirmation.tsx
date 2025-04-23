"use client"

import { Calendar, Clock, Download, MapPin, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { generateAppointmentPDF } from "@/lib/pdf-generator"

export function BookingConfirmation({ appointment, onClose }) {
  const handleDownloadPDF = () => {
    generateAppointmentPDF(appointment)
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Appointment Confirmed!</DialogTitle>
          <DialogDescription>Your appointment has been successfully booked.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="rounded-lg bg-teal-50 p-4 border border-teal-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">{appointment.doctorName}</h3>
              <div className="bg-teal-100 text-teal-800 px-2.5 py-0.5 rounded-full text-xs font-medium">Confirmed</div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{new Date(appointment.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{appointment.time}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{appointment.hospital}</span>
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>Your Token: {appointment.tokenNumber}</span>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-blue-50 p-4 border border-blue-100">
            <h4 className="font-medium text-sm mb-2">Current Token at Clinic</h4>
            <div className="flex items-center">
              <div className="bg-white rounded-md px-3 py-2 border border-blue-200 font-mono text-lg">
                {appointment.currentToken}
              </div>
              <p className="ml-3 text-sm text-muted-foreground">Estimated wait time: ~30 minutes</p>
            </div>
          </div>
        </div>
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="flex-1 gap-2" onClick={handleDownloadPDF}>
            <Download className="h-4 w-4" />
            Download Receipt
          </Button>
          <Button className="flex-1" onClick={onClose}>
            View Dashboard
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
