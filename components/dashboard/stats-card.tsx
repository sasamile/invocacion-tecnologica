import React from "react";
import { LucideIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  description: string;
  value: number;
  Icon: LucideIcon;
  backgroundColor?: string;
}

export function StatsCard({
  title,
  description,
  value,
  Icon,
  backgroundColor,
}: StatsCardProps) {
  return (
    <Card
    className="text-white"
      style={{
        backgroundColor: `${backgroundColor}`,
      }}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-none">
        <CardTitle className="font-medium">{title}</CardTitle>
        <Icon className="size-5 text-white" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        <p className="text-sm">{description}</p>
      </CardContent>
    </Card>
  );
}
