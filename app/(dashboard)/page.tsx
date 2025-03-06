"use client"

import { logout } from "@/actions/auth"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div>
      <Button onClick={async () => await logout()}>Logout</Button>
    </div>
  )
}
