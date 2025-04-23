"use client"

import { useState } from "react"
import { Download, FileText, Upload, FileUp, AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for prescriptions
const prescriptions = [
  {
    id: "presc-001",
    doctorName: "Dr. John Smith",
    date: "2023-09-10",
    medicines: [
      { name: "Amoxicillin", dosage: "500mg", frequency: "3 times a day", duration: "7 days" },
      { name: "Ibuprofen", dosage: "400mg", frequency: "As needed", duration: "5 days" },
    ],
  },
  {
    id: "presc-002",
    doctorName: "Dr. Anita Patel",
    date: "2023-08-25",
    medicines: [
      { name: "Lisinopril", dosage: "10mg", frequency: "Once daily", duration: "30 days" },
      { name: "Aspirin", dosage: "81mg", frequency: "Once daily", duration: "30 days" },
    ],
  },
]

// Mock data for lab tests
const labTests = [
  {
    id: "lab-001",
    name: "Complete Blood Count",
    date: "2023-09-05",
    lab: "City Medical Lab",
    status: "completed",
    fileUrl: "#",
  },
  {
    id: "lab-002",
    name: "Lipid Profile",
    date: "2023-08-20",
    lab: "University Hospital Lab",
    status: "completed",
    fileUrl: "#",
  },
  {
    id: "lab-003",
    name: "Thyroid Function Test",
    date: "2023-07-15",
    lab: "Health Diagnostics",
    status: "completed",
    fileUrl: "#",
  },
]

// Mock data for medical history
const medicalHistory = [
  {
    id: "hist-001",
    name: "Previous Surgery Records",
    date: "2023-06-10",
    type: "PDF",
    size: "2.4 MB",
    fileUrl: "#",
  },
  {
    id: "hist-002",
    name: "Allergy Test Results",
    date: "2023-05-22",
    type: "PDF",
    size: "1.8 MB",
    fileUrl: "#",
  },
]

export function LabTestsHistory() {
  const [activeSubTab, setActiveSubTab] = useState("prescriptions")
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState([])

  const handleFileUpload = (event) => {
    const files = event.target.files
    if (files.length > 0) {
      setIsUploading(true)
      setUploadProgress(0)

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setIsUploading(false)

            // Add the uploaded files to the list
            const newFiles = Array.from(files).map((file) => ({
              id: `hist-${Date.now()}`,
              name: file.name,
              date: new Date().toISOString().split("T")[0],
              type: file.name.split(".").pop().toUpperCase(),
              size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
              fileUrl: "#",
            }))

            setUploadedFiles([...uploadedFiles, ...newFiles])
            return 0
          }
          return prev + 10
        })
      }, 300)
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="prescriptions" className="w-full" onValueChange={setActiveSubTab}>
        <TabsList className="grid w-full md:w-auto grid-cols-3">
          <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
          <TabsTrigger value="lab-tests">Lab Tests</TabsTrigger>
          <TabsTrigger value="medical-history">Medical History</TabsTrigger>
        </TabsList>

        {/* Prescriptions Tab */}
        <TabsContent value="prescriptions" className="mt-6">
          {prescriptions.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No prescriptions found</h3>
              <p className="text-muted-foreground mt-2">Your prescriptions will appear here after doctor visits</p>
              <img
                src="/placeholder.svg?height=200&width=200"
                alt="No prescriptions"
                className="mx-auto my-6 h-40 w-40 opacity-50"
              />
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {prescriptions.map((prescription) => (
                <Card key={prescription.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{prescription.doctorName}</CardTitle>
                        <CardDescription>
                          Prescribed on {new Date(prescription.date).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <Badge variant="outline" className="bg-teal-50">
                        Prescription
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Medicine</TableHead>
                          <TableHead>Dosage</TableHead>
                          <TableHead>Frequency</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {prescription.medicines.map((medicine, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{medicine.name}</TableCell>
                            <TableCell>{medicine.dosage}</TableCell>
                            <TableCell>{medicine.frequency}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full gap-2">
                      <Download className="h-4 w-4" />
                      Download Prescription
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Lab Tests Tab */}
        <TabsContent value="lab-tests" className="mt-6">
          {labTests.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No lab tests found</h3>
              <p className="text-muted-foreground mt-2">Your lab test reports will appear here</p>
              <img
                src="/placeholder.svg?height=200&width=200"
                alt="No lab tests"
                className="mx-auto my-6 h-40 w-40 opacity-50"
              />
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {labTests.map((test) => (
                  <Card key={test.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{test.name}</CardTitle>
                          <CardDescription>Date: {new Date(test.date).toLocaleDateString()}</CardDescription>
                        </div>
                        <Badge variant="outline" className="bg-blue-50">
                          Report
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Lab:</span>
                          <span className="text-sm font-medium">{test.lab}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Status:</span>
                          <span className="text-sm font-medium capitalize">{test.status}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full gap-2">
                        <Download className="h-4 w-4" />
                        Download Report
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        {/* Medical History Tab */}
        <TabsContent value="medical-history" className="mt-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload Medical History</CardTitle>
                <CardDescription>
                  Upload your previous medical records, reports, or any health-related documents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <FileUp className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">Drag and drop files here</h3>
                  <p className="text-sm text-muted-foreground mb-4">or click to browse files (PDF, JPG, PNG, DOC)</p>
                  <input type="file" id="file-upload" className="hidden" multiple onChange={handleFileUpload} />
                  <label htmlFor="file-upload">
                    <Button variant="outline" className="gap-2" as="span">
                      <Upload className="h-4 w-4" />
                      Select Files
                    </Button>
                  </label>
                </div>

                {isUploading && (
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Your Medical Records</h3>
                <Badge variant="outline">{medicalHistory.length + uploadedFiles.length} Files</Badge>
              </div>

              {medicalHistory.length === 0 && uploadedFiles.length === 0 ? (
                <div className="text-center py-12 bg-muted/20 rounded-lg">
                  <AlertCircle className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium">No records found</h3>
                  <p className="text-muted-foreground mt-2">Upload your medical history to keep track of your health</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {[...medicalHistory, ...uploadedFiles].map((record) => (
                    <Card key={record.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-muted rounded-md p-2">
                              <FileText className="h-5 w-5 text-teal-600" />
                            </div>
                            <div>
                              <h4 className="font-medium">{record.name}</h4>
                              <p className="text-xs text-muted-foreground">
                                Uploaded on {new Date(record.date).toLocaleDateString()} • {record.type} • {record.size}
                              </p>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
