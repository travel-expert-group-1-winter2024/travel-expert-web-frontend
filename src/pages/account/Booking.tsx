import { useBookingDetails } from "@/hooks/useBookingDetail"
import { bookingDetail } from "@/types/bookingDetail"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

function Booking() {
  const customerId = 135;
  const { data, isLoading, error } = useBookingDetails(customerId);

  if (isLoading) return <div>Loading booking details...</div>;

  if (error instanceof Error) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4 text-red-600">Error</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return <div>No Booking details.</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Your Bookings</h2>
      <Accordion type="multiple">
        {data.map((booking: bookingDetail) => (
          <AccordionItem key={booking.bookingDetailId} value={`item-${booking.bookingDetailId}`}>
            <AccordionTrigger>
              {booking.destination} — {booking.tripStart.split('T')[0]} to {booking.tripEnd.split('T')[0]}
            </AccordionTrigger>
            <AccordionContent>
              {booking.description?.trim() && (
                <p><strong>Description:</strong> {booking.description}</p>
              )}
              {booking.region?.trim() && (
                <p><strong>Region:</strong> {booking.region.trim()}</p>
              )}
              {booking.className?.trim() && (
                <p><strong>Class:</strong> {booking.className}</p>
              )}
              {booking.fee?.trim() && (
                <p><strong>Fees Charged:</strong> {booking.fee}</p>
              )}
              {booking.product?.trim() && (
                <p><strong>Product:</strong> {booking.product}</p>
              )}
              {booking.supplier?.trim() && (
                <p><strong>Supplier:</strong> {booking.supplier}</p>
              )}
              {booking.basePrice !== null && !isNaN(booking.basePrice) && (
                <p><strong>Price:</strong> ${booking.basePrice.toFixed(2)}</p>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default Booking
