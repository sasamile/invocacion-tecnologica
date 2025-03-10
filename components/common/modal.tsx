"use client";

import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface ModalProps {
  title: string;
  descripion?: string;
  isOpen: boolean; 
  onClose: () => void;
  children?: React.ReactNode;
  className?: string;
}

export function Modal({
  title,
  descripion,
  isOpen,
  onClose,
  children,
  className,
}: ModalProps) {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent
        className={cn(
          "p-0 py-6 max-md:h-[90%] overflow-y-auto",
          className
        )}
      >
        <DialogHeader className="px-6">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{descripion}</DialogDescription>
        </DialogHeader>
        
        <div className="px-6 pt-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
}