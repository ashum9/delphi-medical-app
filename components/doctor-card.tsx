import Link from "next/link"
import { Calendar, MapPin } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export function DoctorCard({ doctor }) {
  return (
    <Card className="overflow-hidden card-hover-effect border border-blue-100">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <img
            src={doctor.image || "/placeholder.svg"}
            alt={doctor.name}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-2">
          <h3 className="text-xl font-bold">{doctor.name}</h3>
          <p className="text-sm text-muted-foreground">{doctor.qualification}</p>
          <div className="flex items-center text-sm">
            <Calendar className="mr-2 h-4 w-4 text-blue-600" />
            <span>{doctor.experience} years experience</span>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">Hospitals:</p>
            {doctor.hospitals.map((hospital) => (
              <div key={hospital} className="flex items-center text-sm text-muted-foreground">
                <MapPin className="mr-2 h-4 w-4 text-blue-600" />
                <span>{hospital}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button className="w-full bg-blue-600 hover:bg-blue-700 btn-hover-effect" asChild>
          <Link href={`/doctors/${doctor.id}`}>Book Appointment</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
