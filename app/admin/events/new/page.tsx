"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PageTransition } from "@/components/navigation/page-transition";
import { NeoCard } from "@/components/ui/neo-card";
import { NeoButton } from "@/components/ui/neo-button";
import { NeoInput } from "@/components/ui/neo-input";
import { useAuthStore } from "@/hooks/use-auth-store";
import { useEventStore } from "@/hooks/use-event-store";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, MapPin, Users, Image } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Form schema
const eventSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  time: z.string().regex(/^\d{2}:\d{2}$/, "Time must be in HH:MM format"),
  location: z.string().min(3, "Location must be at least 3 characters"),
  capacity: z.coerce.number().min(1, "Capacity must be at least 1"),
  category: z.string().optional(),
  image: z.string().url("Image must be a valid URL").optional().or(z.literal("")),
});

type EventFormData = z.infer<typeof eventSchema>;

export default function NewEventPage() {
  const router = useRouter();
  const { isAuthenticated, isAdmin } = useAuthStore();
  const { addEvent } = useEventStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      description: "",
      date: new Date().toISOString().split("T")[0], // Today's date
      time: "18:00",
      location: "",
      capacity: 100,
      category: "",
      image: "",
    },
  });

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    if (!isAdmin()) {
      router.push("/events");
      return;
    }
  }, [isAuthenticated, isAdmin, router]);

  const onSubmit = (data: EventFormData) => {
    setIsSubmitting(true);
    
    try {
      const eventId = addEvent({
        ...data,
        image: data.image || undefined,
        category: data.category || undefined,
      });
      
      if (eventId) {
        router.push("/admin/events");
      }
    } catch (error) {
      console.error("Failed to create event:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-12">
        <Link href="/admin/events" className="inline-block mb-6">
          <NeoButton variant="secondary">
            <ArrowLeft size={18} className="mr-2" />
            Back to Events
          </NeoButton>
        </Link>

        <div className="mb-10">
          <h1 className="text-4xl font-extrabold">
            CREATE <span className="text-yellow-400">NEW EVENT</span>
          </h1>
          <div className="h-2 w-20 bg-yellow-400 mt-2"></div>
        </div>

        <NeoCard>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <div className="flex items-center mb-2">
                  <label className="font-bold text-black block">
                    Event Title
                  </label>
                </div>
                <NeoInput
                  {...register("title")}
                  placeholder="Enter event title"
                  error={errors.title?.message}
                />
              </div>

              <div className="md:col-span-2">
                <div className="flex items-center mb-2">
                  <label className="font-bold text-black block">
                    Description
                  </label>
                </div>
                <textarea
                  {...register("description")}
                  placeholder="Enter event description"
                  rows={5}
                  className="w-full py-3 px-4 bg-white border-4 border-black outline-none focus:outline-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                />
                {errors.description?.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div>
                <div className="flex items-center mb-2">
                  <Calendar size={18} className="mr-2" />
                  <label className="font-bold text-black block">Date</label>
                </div>
                <NeoInput
                  type="date"
                  {...register("date")}
                  error={errors.date?.message}
                />
              </div>

              <div>
                <div className="flex items-center mb-2">
                  <Clock size={18} className="mr-2" />
                  <label className="font-bold text-black block">Time</label>
                </div>
                <NeoInput
                  type="time"
                  {...register("time")}
                  error={errors.time?.message}
                />
              </div>

              <div className="md:col-span-2">
                <div className="flex items-center mb-2">
                  <MapPin size={18} className="mr-2" />
                  <label className="font-bold text-black block">Location</label>
                </div>
                <NeoInput
                  {...register("location")}
                  placeholder="Enter event location"
                  error={errors.location?.message}
                />
              </div>

              <div>
                <div className="flex items-center mb-2">
                  <Users size={18} className="mr-2" />
                  <label className="font-bold text-black block">Capacity</label>
                </div>
                <NeoInput
                  type="number"
                  {...register("capacity")}
                  min={1}
                  error={errors.capacity?.message}
                />
              </div>

              <div>
                <div className="flex items-center mb-2">
                  <label className="font-bold text-black block">Category</label>
                </div>
                <NeoInput
                  {...register("category")}
                  placeholder="Enter event category (optional)"
                  error={errors.category?.message}
                />
              </div>

              <div className="md:col-span-2">
                <div className="flex items-center mb-2">
                  <Image size={18} className="mr-2" />
                  <label className="font-bold text-black block">
                    Image URL
                  </label>
                </div>
                <NeoInput
                  {...register("image")}
                  placeholder="Enter image URL (optional)"
                  error={errors.image?.message}
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Link href="/admin/events">
                <NeoButton variant="secondary" type="button">
                  Cancel
                </NeoButton>
              </Link>
              <NeoButton
                variant="primary"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating..." : "Create Event"}
              </NeoButton>
            </div>
          </form>
        </NeoCard>
      </div>
    </PageTransition>
  );
}