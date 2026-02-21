"use client"

import { use } from "react"
import { CompanyProfile } from "@/components/companies/company-profile"
import { companies } from "@/lib/mock-data"
import { notFound } from "next/navigation"

export default function CompanyProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const company = companies.find((c) => c.id === id)

  if (!company) {
    notFound()
  }

  return <CompanyProfile company={company} />
}
