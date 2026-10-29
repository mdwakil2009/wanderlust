
"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Trash2, AlertTriangle } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const DeleteDestinationDialog = ({ id }: { id: string }) => {
  const router = useRouter();

  const handelDelete = async () => {
    try {
      const res = await fetch(`http://localhost:8000/destination/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Destination deleted successfully!");
        router.replace("/destinations");
        router.refresh();
      } else {
        toast.error(data.message || "Failed to delete destination");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button
            variant="destructive"
            size="sm"
            aria-label="Delete destination"
            className="gap-1.5 rounded-lg transition-all duration-200 hover:shadow-md"
          />
        }
      >
        <Trash2 className="h-4 w-4" aria-hidden="true" />
        Delete
      </AlertDialogTrigger>

      <AlertDialogContent className="w-[calc(100%-2rem)] max-w-md overflow-hidden rounded-2xl border border-neutral-200 bg-white p-0 shadow-2xl">
        <AlertDialogHeader className="items-center px-5 pb-2 pt-7 text-center sm:px-7 sm:pt-8">
          {/* Warning Icon */}
          <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 ring-8 ring-red-50/50">
            <Trash2
              className="h-7 w-7 text-red-600"
              aria-hidden="true"
            />
          </div>

          <AlertDialogTitle className="text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
            Delete this destination?
          </AlertDialogTitle>

          <AlertDialogDescription className="max-w-sm text-sm leading-6 text-neutral-500">
            Are you sure you want to delete this travel package? All related
            destination information may be lost. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Warning Message */}
        <div className="mx-5 mt-3 flex items-start gap-3 rounded-xl border border-red-100 bg-red-50/70 p-3.5 sm:mx-7">
          <AlertTriangle
            className="mt-0.5 h-4 w-4 shrink-0 text-red-600"
            aria-hidden="true"
          />

          <p className="text-xs leading-5 text-red-700">
            <span className="font-semibold">Warning:</span> This destination
            will be permanently removed from your collection.
          </p>
        </div>

        {/* Action Buttons */}
        <AlertDialogFooter className="flex-col-reverse gap-2 px-5 pb-5 pt-5 sm:flex-row sm:px-7 sm:pb-7">
          <AlertDialogCancel className="mt-0 w-full rounded-xl border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-100 sm:w-auto">
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={(event) => {
              event.preventDefault();
              handelDelete();
            }}
            className="w-full rounded-xl bg-red-600 text-white shadow-sm transition-all hover:bg-red-700 hover:shadow-md sm:w-auto"
          >
            <Trash2 className="mr-2 h-4 w-4" aria-hidden="true" />
            Yes, Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDestinationDialog;
