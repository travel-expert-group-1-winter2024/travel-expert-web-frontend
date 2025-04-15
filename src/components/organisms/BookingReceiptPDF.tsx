// components/organisms/booking/BookingReceiptPDF.tsx
import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer'
import { format } from 'date-fns'

// Create enhanced styles
const styles = StyleSheet.create({
  page: {
    padding: 0,
    fontFamily: 'Helvetica',
    backgroundColor: '#f8fafc',
  },
  container: {
    margin: 40,
    padding: 30,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    borderBottomStyle: 'solid',
  },
  logo: {
    width: 120,
    height: 40,
  },
  headerText: {
    fontSize: 10,
    color: '#64748b',
    textAlign: 'right',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    borderBottomStyle: 'solid',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    width: '30%',
    color: '#475569',
  },
  value: {
    width: '70%',
    color: '#1e293b',
  },
  highlightBox: {
    backgroundColor: '#f1f5f9',
    padding: 15,
    borderRadius: 6,
    marginBottom: 20,
  },
  highlightText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e40af',
    textAlign: 'center',
  },
  footer: {
    marginTop: 30,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    borderTopStyle: 'solid',
    fontSize: 10,
    color: '#64748b',
  },
  qrCode: {
    width: 80,
    height: 80,
    marginTop: 15,
    alignSelf: 'center',
  },
  nameItem: {
    fontSize: 12,
    color: '#1e293b',
    marginBottom: 2,
  },
})

// Add your company logo (replace with actual logo)
const CompanyLogo = () => (
  <Image
    style={styles.logo}
    src='https://via.placeholder.com/120x40?text=TravelExpert'
  />
)

// Generating a simple QR code - or we can skip this
const QRCodePlaceholder = () => (
  <Image
    style={styles.qrCode}
    src='https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://travelexpert.com/booking/confirmation'
  />
)

interface BookingReceiptPDFProps {
  booking: {
    id: string
    customerName: string
    customerEmail: string
    bookingDate: string
    startDate: string
    endDate: string
    totalAmount: number
    paymentMethod: string
    tourName: string
    referenceNumber?: string
    departureLocation?: string
    travellerNames: []
  }
}

export const BookingReceiptPDF = ({ booking }: BookingReceiptPDFProps) => (
  <Document>
    <Page size='A4' style={styles.page}>
      <View style={styles.container}>
        {/* Header with logo */}
        <View style={styles.header}>
          <CompanyLogo />
          <View style={styles.headerText}>
            <Text>Booking Confirmation</Text>
            <Text>Issued: {format(new Date(), 'PPP')}</Text>
          </View>
        </View>

        {/* Main title */}
        <Text style={styles.title}>Thank you for your booking!</Text>
        <Text style={styles.subtitle}>
          Your adventure with Travel Expert begins on{' '}
          {format(new Date(booking.startDate), 'PPP')}
        </Text>

        {/* Highlight box */}
        <View style={styles.highlightBox}>
          <Text style={styles.highlightText}>
            Booking Reference: {booking.id}
          </Text>
        </View>

        {/* Booking details section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Booking Details</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Tour Package:</Text>
            <Text style={styles.value}>{booking.tourName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Booking Date:</Text>
            <Text style={styles.value}>
              {format(new Date(booking.bookingDate), 'PPPp')}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Travel Dates:</Text>
            <Text style={styles.value}>
              {format(new Date(booking.startDate), 'PPP')} -{' '}
              {format(new Date(booking.endDate), 'PPP')}
            </Text>
          </View>
          {booking.departureLocation && (
            <View style={styles.row}>
              <Text style={styles.label}>Departure From:</Text>
              <Text style={styles.value}>{booking.departureLocation}</Text>
            </View>
          )}
        </View>

        {/* Payment details section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Information</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Total Amount:</Text>
            <Text
              style={[styles.value, { color: '#1e40af', fontWeight: 'bold' }]}
            >
              ${booking.totalAmount.toFixed(2)}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Payment Method:</Text>
            <Text style={styles.value}>{booking.paymentMethod}</Text>
          </View>
          {booking.referenceNumber && (
            <View style={styles.row}>
              <Text style={styles.label}>Payment Reference:</Text>
              <Text style={styles.value}>{booking.referenceNumber}</Text>
            </View>
          )}
        </View>

        {/* Customer information section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer Information</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{booking.customerName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{booking.customerEmail}</Text>
          </View>
          {booking.travellerNames.length > 0 && (
            <View style={styles.row}>
              <Text style={styles.label}>Traveller Names:</Text>
              <View style={styles.value}>
                {booking.travellerNames.map((name: string, index: number) => (
                  <Text key={index} style={styles.nameItem}>
                    • {name}
                  </Text>
                ))}
              </View>
            </View>
          )}
        </View>
        {/* QR code for easy reference */}
        <QRCodePlaceholder />

        {/* Footer with terms */}
        <View style={styles.footer}>
          <Text style={{ marginBottom: 5, fontWeight: 'bold' }}>
            Important Information:
          </Text>
          <Text style={{ marginBottom: 3 }}>
            • Please present this confirmation at check-in
          </Text>
          <Text style={{ marginBottom: 3 }}>
            • Cancellation policy: Full refund 30+ days prior, 50% refund 15-29
            days prior
          </Text>
          <Text style={{ marginBottom: 3 }}>
            • Contact support@travelexpert.com for any questions
          </Text>
          <Text style={{ marginTop: 10, fontStyle: 'italic' }}>
            Thank you for choosing Travel Expert. We wish you a wonderful
            journey!
          </Text>
        </View>
      </View>
    </Page>
  </Document>
)
