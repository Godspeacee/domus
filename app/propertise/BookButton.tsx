"use client";

import { Button } from "@radix-ui/themes";
import axios from "axios";
import React from "react";
import { useSession } from "next-auth/react";

interface BookButtonProps {
  property: {
    id: string;
    title: string;
    price: number;
  };
}

const BookButton = ({ property }: BookButtonProps) => {
  const { data: session } = useSession();

  const handleBooking = async () => {
    if (!session?.user?.email) {
      alert("Please log in to book this property");
      return;
    }

    try {
      const res = await axios.post("/api/paystack/initialize", {
        email: session.user.email,
        amount: property.price,
        propertyId: property.id,
      });

      // Redirect user to Paystack checkout page
      window.location.href = res.data.data.authorization_url;
    } catch (error) {
      console.error(error);
      alert("Payment initialization failed. Try again.");
    }
  };

  return <Button onClick={handleBooking}>Book Appointment</Button>;
};

export default BookButton;
