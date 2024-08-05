import React, { useState, useEffect } from 'react'
import { FilePath } from '../common/config'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export default function Create_Table() {
  const [data, setdata] = useState([])

  useEffect(() => {
    const res = fetch('/Table.json')
      .then((response) => response.json())
      .then((data) => setdata(data))
      .catch((error) => console.error('Error fetching invoices:', error))
  }, [])

  console.log(data)

  return (
    <Table>
      <TableCaption>A list of matches found.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Company Name for Emails</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Email Status</TableHead>
          <TableHead>Seniority</TableHead>
          <TableHead>Mobile Phone</TableHead>
          <TableHead>Corporate Phone</TableHead>
          <TableHead>Other Phone</TableHead>
          <TableHead>Stage</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item['First Name']}</TableCell>
            <TableCell>{item['Last Name']}</TableCell>
            <TableCell>{item['Title']}</TableCell>
            <TableCell>{item['Company']}</TableCell>
            <TableCell>{item['Company Name for Emails']}</TableCell>
            <TableCell>{item['Email']}</TableCell>
            <TableCell>{item['Email Status']}</TableCell>
            <TableCell>{item['Seniority']}</TableCell>
            <TableCell>{item['Mobile Phone']}</TableCell>
            <TableCell>{item['Corporate Phone']}</TableCell>
            <TableCell>{item['Other Phone']}</TableCell>
            <TableCell>{item['Stage']}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
