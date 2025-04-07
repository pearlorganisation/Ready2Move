'use client'

import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/helper/card"
import { Building2, Users, House } from "lucide-react"
import { Sidebar } from "@/components/sidebar"

export default function DashboardPage() {
  return (
    <div>
       <Sidebar />
       <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard title="Users" value="15" description="This month" icon={<Users className="h-5 w-5" />} />
        <StatsCard
          title="Properties"
          value="24"
          description="Total properties"
          icon={<House className="h-5 w-5" />}
        />
        <StatsCard
          title="Projects"
          value="8"
          description="Active projects"
          icon={<Building2 className="h-5 w-5" />}
        />
        <StatsCard title="Leads" value="142" description="New this month" icon={<Users className="h-5 w-5" />} />
  
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Properties</CardTitle>
            <CardDescription>Latest properties added to the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between py-2 border-b">
                <span>Luxury Villa</span>
                <span className="text-muted-foreground">$1.2M</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span>Downtown Apartment</span>
                <span className="text-muted-foreground">$450K</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span>Suburban House</span>
                <span className="text-muted-foreground">$680K</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Leads</CardTitle>
            <CardDescription>Latest potential clients</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between py-2 border-b">
                <span>John Smith</span>
                <span className="text-muted-foreground">2 days ago</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span>Sarah Johnson</span>
                <span className="text-muted-foreground">5 days ago</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span>Michael Brown</span>
                <span className="text-muted-foreground">1 week ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </div>
    
  )
}

function StatsCard({
  title,
  value,
  description,
  icon,
}: {
  title: string
  value: string
  description: string
  icon: React.ReactNode
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

