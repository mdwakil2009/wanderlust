
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil, PackageCheck, Trash2 } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { IDestination } from "@/lib/types/destinations";
import getTokenFromClient from "@/lib/getTokenFromClient";

const categories = ["Beach", "Mountain", "City", "Adventure", "Cultural"];

const EditDestinationDailog = ({
  destination,
}: {
  destination: IDestination;
}) => {
  const router = useRouter();

  const [form, setForm] = useState(destination);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const update = (field: keyof typeof form, value: string) =>
    setForm((current) => ({ ...current, [field]: value }));

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setLoading(true);
    
    const token = await  getTokenFromClient()

    try {
      const { _id, ...updatedData } = form;

      const res = await fetch(
        `${process.env.NEXT_API}/destination/${destination._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`
          },
          body: JSON.stringify(updatedData),
        },
      );

      if (!res.ok) {
        throw new Error("Failed to update destination");
      }

      await res.json();

      setOpen(false);
      router.push("/destinations");
      router.refresh();
    } catch (error) {
      console.error("Update error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            aria-label="Edit destination"
          />
        }
      >
        <Pencil className="mr-1 h-4 w-4" aria-hidden="true" />
        Edit
      </DialogTrigger>

      <DialogContent className="flex max-h-[90dvh] w-[calc(100%-1rem)] max-w-lg flex-col gap-4 overflow-hidden p-4 sm:w-[calc(100%-2rem)] sm:max-w-xl sm:p-6">
        <DialogHeader className="shrink-0 space-y-1">
          <DialogTitle className="text-lg font-semibold sm:text-xl">
            Update Travel Package
          </DialogTitle>

          <DialogDescription className="text-xs leading-5 sm:text-sm">
            Update the travel package information below.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="grid min-h-0 gap-4 overflow-y-auto overscroll-contain rounded-md border border-border p-3 shadow-sm sm:gap-4 sm:p-4"
        >
          {/* Destination Name */}
          <div className="grid gap-1.5">
            <Label htmlFor="name" className="text-xs sm:text-sm">
              Destination Name
            </Label>

            <Input
              id="name"
              className="h-9 text-sm"
              placeholder="Bali Paradise"
              value={form.name}
              onChange={(event) => update("name", event.target.value)}
              required
            />
          </div>

          {/* Country and Category */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="grid min-w-0 gap-1.5">
              <Label htmlFor="country" className="text-xs sm:text-sm">
                Country
              </Label>

              <Input
                id="country"
                className="h-9 text-sm"
                placeholder="Indonesia"
                value={form.country}
                onChange={(event) => update("country", event.target.value)}
                required
              />
            </div>

            <div className="grid min-w-0 gap-1.5">
              <Label htmlFor="category" className="text-xs sm:text-sm">
                Category
              </Label>

              <Select
                value={form.category}
                onValueChange={(value) => update("category", value ?? "")}
                required
              >
                <SelectTrigger
                  id="category"
                  className="h-9 w-full text-sm"
                >
                  <SelectValue placeholder="Choose category" />
                </SelectTrigger>

                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Price and Duration */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="grid min-w-0 gap-1.5">
              <Label htmlFor="price" className="text-xs sm:text-sm">
                Price (USD)
              </Label>

              <Input
                id="price"
                type="number"
                min="0"
                className="h-9 text-sm"
                placeholder="1299"
                value={form.price}
                onChange={(event) => update("price", event.target.value)}
                required
              />
            </div>

            <div className="grid min-w-0 gap-1.5">
              <Label htmlFor="duration" className="text-xs sm:text-sm">
                Duration
              </Label>

              <Input
                id="duration"
                className="h-9 text-sm"
                placeholder="7 Days/6 Nights"
                value={form.duration}
                onChange={(event) => update("duration", event.target.value)}
                required
              />
            </div>
          </div>

          {/* Departure Date */}
          <div className="grid gap-1.5">
            <Label htmlFor="departureDate" className="text-xs sm:text-sm">
              Departure Date
            </Label>

            <Input
              id="departureDate"
              type="date"
              className="h-9 w-full min-w-0 text-sm"
              value={form.departureDate}
              onChange={(event) =>
                update("departureDate", event.target.value)
              }
              required
            />
          </div>

          {/* Image URL */}
          <div className="grid gap-1.5">
            <Label htmlFor="imageUrl" className="text-xs sm:text-sm">
              Image URL
            </Label>

            <Input
              id="imageUrl"
              type="url"
              className="h-9 w-full min-w-0 text-sm"
              placeholder="https://example.com/image.jpg"
              value={form.imageUrl}
              onChange={(event) => update("imageUrl", event.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div className="grid gap-1.5">
            <Label htmlFor="description" className="text-xs sm:text-sm">
              Description
            </Label>

            <Textarea
              id="description"
              placeholder="Describe the travel experience..."
              className="min-h-20 resize-y text-sm"
              value={form.description}
              onChange={(event) =>
                update("description", event.target.value)
              }
              required
            />
          </div>

          {/* Actions */}
          <div className="sticky bottom-0 flex flex-col-reverse gap-2 border-t border-border bg-background pt-3 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              <Trash2 className="mr-1 h-4 w-4" />
              Cancel
            </Button>

            <Button
              type="submit"
              className="w-full bg-[#00A8E8] text-white hover:bg-[#0095d1] sm:w-auto"
              disabled={loading}
            >
              <PackageCheck className="mr-1 h-4 w-4" />
              {loading ? "Saving..." : "Save Package"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDestinationDailog;