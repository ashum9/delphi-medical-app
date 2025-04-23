"use client"

import React from "react"

import { useEffect, useState, useRef } from "react"
import { Users, Clock, HeartPulse, Award } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export function AnimatedStats() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)
  const statsRef = useRef([])

  const stats = [
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      value: 50,
      label: "Specialists",
      suffix: "+",
    },
    {
      icon: <HeartPulse className="h-8 w-8 text-blue-600" />,
      value: 1000,
      label: "Happy Patients",
      suffix: "+",
    },
    {
      icon: <Clock className="h-8 w-8 text-blue-600" />,
      value: 24,
      label: "Customer Support",
      suffix: "/7",
    },
    {
      icon: <Award className="h-8 w-8 text-blue-600" />,
      value: 15,
      label: "Years of Excellence",
      suffix: "+",
    },
  ]

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Animate section title
    gsap.fromTo(
      ".stats-title",
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

    // Animate stats with stagger
    gsap.fromTo(
      statsRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          onEnter: () => setIsVisible(true),
        },
      },
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="w-full py-16 md:py-24 bg-gradient-to-b from-white to-blue-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2 stats-title">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Our Impact in Numbers</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Trusted by thousands of patients for quality healthcare services
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
              isVisible={isVisible}
              delay={index * 150}
              ref={(el) => (statsRef.current[index] = el)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

const StatCard = React.forwardRef(({ icon, value, label, suffix = "", isVisible, delay }, ref) => {
  const [count, setCount] = useState(0)
  const countRef = useRef(null)

  useEffect(() => {
    if (!isVisible) return

    gsap.to(countRef.current, {
      duration: 2,
      innerText: value,
      snap: { innerText: 1 },
      delay: delay / 1000,
      ease: "power2.out",
    })
  }, [isVisible, value, delay])

  return (
    <div ref={ref} className="flex flex-col items-center space-y-2 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 transition-transform duration-300 hover:scale-110">
        {icon}
      </div>
      <h3 className="text-3xl font-bold md:text-4xl flex items-center justify-center">
        <span ref={countRef}>0</span>
        <span>{suffix}</span>
      </h3>
      <p className="text-muted-foreground">{label}</p>
    </div>
  )
})

StatCard.displayName = "StatCard"
