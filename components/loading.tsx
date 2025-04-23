"use client"

import { useEffect, useState } from "react"
import { gsap } from "gsap"

export function LoadingScreen({ isLoading = true }) {
  const [show, setShow] = useState(isLoading)

  useEffect(() => {
    if (!isLoading) {
      const timeout = setTimeout(() => {
        setShow(false)
      }, 800) // Keep showing for a bit after loading is done
      return () => clearTimeout(timeout)
    } else {
      setShow(true)
    }
  }, [isLoading])

  useEffect(() => {
    if (show) {
      // Animate the logo and loading dots
      gsap.fromTo(
        ".loading-logo",
        { scale: 0.8, opacity: 0.5 },
        { scale: 1, opacity: 1, duration: 1, repeat: -1, yoyo: true, ease: "power1.inOut" },
      )
    }
  }, [show])

  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white bg-opacity-95 transition-all duration-500">
      <div className="loading-logo text-4xl font-bold text-primary mb-6">𝘿𝙚𝙡𝙥𝙝𝙞</div>
      <div className="loading-dots flex">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export function PageTransition({ children }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate page loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <div className={`transition-opacity duration-500 ${isLoading ? "opacity-0" : "opacity-100"}`}>{children}</div>
    </>
  )
}
