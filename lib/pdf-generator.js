import { jsPDF } from "jspdf"

export const generateAppointmentPDF = (appointment) => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  })

  // Header
  doc.setFont("helvetica", "bold")
  doc.setFontSize(24)
  doc.setTextColor(0, 128, 128)
  doc.text("𝘿𝙚𝙡𝙥𝙝𝙞", 105, 20, { align: "center" })

  doc.setFont("helvetica", "normal")
  doc.setFontSize(12)
  doc.setTextColor(100, 100, 100)
  doc.text("Medical Appointment Services", 105, 28, { align: "center" })

  doc.setDrawColor(0, 128, 128)
  doc.setLineWidth(0.5)
  doc.line(20, 35, 190, 35)

  // Title
  doc.setFont("helvetica", "bold")
  doc.setFontSize(18)
  doc.setTextColor(0, 0, 0)
  doc.text("Appointment Confirmation", 105, 50, { align: "center" })

  const startY = 70
  const lineHeight = 10
  const col1 = 40
  const col2 = 100

  // Appointment Details
  doc.setFont("helvetica", "bold")
  doc.text("Doctor:", col1, startY)
  doc.setFont("helvetica", "normal")
  doc.text(appointment.doctorName, col2, startY)

  doc.setFont("helvetica", "bold")
  doc.text("Specialty:", col1, startY + lineHeight)
  doc.setFont("helvetica", "normal")
  doc.text(appointment.doctorSpecialty, col2, startY + lineHeight)

  doc.setFont("helvetica", "bold")
  doc.text("Date:", col1, startY + lineHeight * 2)
  doc.setFont("helvetica", "normal")
  doc.text("23 / 04 / 2025", col2, startY + lineHeight * 2)

  doc.setFont("helvetica", "bold")
  doc.text("Time:", col1, startY + lineHeight * 3)
  doc.setFont("helvetica", "normal")
  doc.text(appointment.time, col2, startY + lineHeight * 3)

  doc.setFont("helvetica", "bold")
  doc.text("Hospital:", col1, startY + lineHeight * 4)
  doc.setFont("helvetica", "normal")
  doc.text(appointment.hospital, col2, startY + lineHeight * 4)

  doc.setFont("helvetica", "bold")
  doc.text("Token Number:", col1, startY + lineHeight * 5)
  doc.setFont("helvetica", "normal")
  doc.text(appointment.tokenNumber, col2, startY + lineHeight * 5)

  doc.setFont("helvetica", "bold")
  doc.text("Status:", col1, startY + lineHeight * 6)
  doc.setFont("helvetica", "normal")
  doc.text(appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1), col2, startY + lineHeight * 6)

  // Token Box
  doc.setDrawColor(0, 128, 128)
  doc.setFillColor(240, 255, 255)
  doc.roundedRect(65, startY + lineHeight * 8, 80, 40, 5, 5, "FD")

  doc.setFont("helvetica", "bold")
  doc.setFontSize(14)
  doc.setTextColor(0, 128, 128)
  doc.text("Your Token", 105, startY + lineHeight * 10, { align: "center" })

  doc.setFontSize(24)
  doc.text(appointment.tokenNumber, 105, startY + lineHeight * 12, { align: "center" })

  // Footer
  doc.setFont("helvetica", "normal")
  doc.setFontSize(10)
  doc.setTextColor(100, 100, 100)
  doc.text("Please arrive 15 minutes before your appointment time.", 105, 250, { align: "center" })
  doc.text("For any changes, please contact us at support@delphi-medical.com", 105, 256, { align: "center" })

  // QR Image
  const qrBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAA..."
  doc.addImage(qrBase64, "PNG", 20, 230, 30, 30)

  // Save PDF
  doc.save(`delphi-appointment-${appointment.tokenNumber}.pdf`)
}
