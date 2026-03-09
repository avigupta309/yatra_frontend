import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { User } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { PassengerDetail } from "../../types";
import React from "react";

const passengerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  age: z
    .number()
    .min(1, "Age must be at least 1")
    .max(120, "Age must be less than 120"),
  gender: z.enum(["male", "female", "other"]),
  seatNumber: z.number(),
});

const formSchema = z.object({
  passengers: z
    .array(passengerSchema)
    .min(1, "At least one passenger is required"),
});

interface PassengerDetailsProps {
  selectedSeats: number[];
  onPassengerDetails: (passengers: PassengerDetail[]) => void;
  initialPassengers?: PassengerDetail[];
}

export function PassengerDetails({
  selectedSeats,
  onPassengerDetails,
  initialPassengers = [],
}: PassengerDetailsProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      passengers:
        selectedSeats.length > 0
          ? selectedSeats.map((seat, index) => ({
              name: initialPassengers[index]?.name || "",
              age: initialPassengers[index]?.age || 25,
              gender: initialPassengers[index]?.gender || "male",
              seatNumber: seat,
            }))
          : [],
    },
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: "passengers",
  });

  // Update passengers when selected seats change
  React.useEffect(() => {
    const currentPassengers = form.getValues("passengers");
    const newPassengers = selectedSeats.map((seat, index) => ({
      name: currentPassengers[index]?.name || "",
      age: currentPassengers[index]?.age || 25,
      gender: currentPassengers[index]?.gender || ("male" as const),
      seatNumber: seat,
    }));

    form.setValue("passengers", newPassengers);
  }, [selectedSeats, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onPassengerDetails(values.passengers);
  };

  if (selectedSeats.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <User className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">
            Please select seats first to add passenger details
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Passenger Details</CardTitle>
        <p className="text-sm text-gray-600">
          Please provide details for all selected seats
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium text-gray-900">
                    Passenger {index + 1} - Seat {selectedSeats[index]}
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name={`passengers.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`passengers.${index}.age`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Age"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`passengers.${index}.gender`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}

            <Button type="submit" className="w-full">
              Continue to Payment
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
