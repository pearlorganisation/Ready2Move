"use client";
import { Button } from "@/components/helper/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/helper/card";
import { Input } from "@/components/helper/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/helper/tab";
import { Badge } from "@/components/helper/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/helper/select";
import { Phone, Mail, MoreHorizontal } from "lucide-react";
import { useState } from "react";

export default function LeadsPage() {
  const [status, setStatus] = useState("New");
  const [isopen, setIsopen] = useState(false);
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Leads</h1>
        <Button>Add New Lead</Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Lead Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Input placeholder="Search leads..." className="w-64" />
              <Button variant="outline" size="sm">
                Search
              </Button>
            </div>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-[180px] p-2 px-2 border rounded-md"
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="converted">Converted</option>
            </select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>S No.</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <LeadRow
                Sno="1"
                name="John Smith"
                email="john.smith@example.com"
                phone="(555) 123-4567"
                AssignedTo="Aman"
                status="pending"
                date="Mar 15, 2023"
              />
              <LeadRow
                Sno="2"
                name="John Smith"
                email="john.smith@example.com"
                phone="(555) 123-4567"
                AssignedTo="Naman"
                status="calling"
                date="Mar 15, 2023"
              />
              <LeadRow
                Sno="3"
                name="John Smith"
                email="john.smith@example.com"
                phone="(555) 123-4567"
                AssignedTo="Aman"
                status="qualified"
                date="Mar 15, 2023"
              />
              <LeadRow
                Sno="4"
                name="John Smith"
                email="john.smith@example.com"
                phone="(555) 123-4567"
                AssignedTo="Aman"
                status="pending"
                date="Mar 15, 2023"
              />
            </TableBody>
          </Table>

          <div className="flex items-center justify-end space-x-2 mt-4">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function LeadRow({ Sno, name, email, phone, AssignedTo, status, date }) {
  return (
    <TableRow>
      <TableCell className="font-medium">{Sno}</TableCell>

      <TableCell className="font-medium">{name}</TableCell>
      <TableCell>
        <div className="flex flex-col">
          <div className="flex items-center text-sm">
            <Mail className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
            {email}
          </div>
        </div>
      </TableCell>
      <TableCell className="font-medium">{phone}</TableCell>
      <TableCell>{AssignedTo}</TableCell>
      <TableCell>
        <Badge
          variant={
            status === "New"
              ? "outline"
              : status === "qualified"
              ? "secondary"
              : status === "pending"
              ? "default"
              : "success"
          }
        >
          {status}
        </Badge>
      </TableCell>

      <TableCell>{date}</TableCell>
      <TableCell className="text-right">
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
