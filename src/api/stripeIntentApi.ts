import { stripeIntentRequest } from "@/types/stripeIntentRequest";
import api from "./axios";

export const stripeIntent = (intentData:stripeIntentRequest) => 
    api.post(`/api/bookings/create-payment-intent`, intentData)