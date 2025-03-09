"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { MunicipalityData, SchoolColumns } from "@/types";
import { SchoolForm } from "../common/school-form";

interface CreateSchoolDialogProps {
  label: string;
  title: string;
  description?: string;
  type: "school" | "campus";
  municipalities?: MunicipalityData[];
  institutions?: SchoolColumns[];
  isDialogOpen: boolean;
  setIsDialogOpen: (open: boolean) => void;
}

export function CreateSchoolDialog({
  label,
  title,
  description,
  isDialogOpen,
  municipalities,
  type,
  institutions,
  setIsDialogOpen,
}: CreateSchoolDialogProps) {
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="max-lg:w-full bg-blue-500 hover:bg-blue-600">
          <Plus className="mr-2 size-4" />
          {label}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] max-md:h-[90%] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <SchoolForm
          type={type}
          municipalities={municipalities!}
          institutions={institutions}
          onCancel={() => setIsDialogOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
