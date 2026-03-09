import { Bus, Booking, User } from '../types'

export const mockBuses: Bus[] = [
  {
    id: '1',
    name: 'Volvo Multi-Axle Semi Sleeper',
    type: 'AC',
    source: 'Mumbai',
    destination: 'Pune',
    departureTime: '06:00',
    arrivalTime: '09:30',
    farePerSeat: 450,
    totalSeats: 28,
    availableSeats: 12,
    amenities: ['Wi-Fi', 'Charging Point', 'Water Bottle', 'Blanket'],
    rating: 4.5,
    operator: 'RedBus Travels'
  },
  {
    id: '2',
    name: 'Scania Multi-Axle Semi Sleeper',
    type: 'AC',
    source: 'Delhi',
    destination: 'Jaipur',
    departureTime: '22:30',
    arrivalTime: '05:00',
    farePerSeat: 650,
    totalSeats: 28,
    availableSeats: 8,
    amenities: ['Wi-Fi', 'Charging Point', 'Water Bottle', 'Snacks'],
    rating: 4.7,
    operator: 'Sharma Travels'
  },
  {
    id: '3',
    name: 'Ashok Leyland Non-AC Seater',
    type: 'Non-AC',
    source: 'Bangalore',
    destination: 'Chennai',
    departureTime: '14:00',
    arrivalTime: '19:30',
    farePerSeat: 280,
    totalSeats: 28,
    availableSeats: 18,
    amenities: ['Water Bottle', 'First Aid'],
    rating: 4.1,
    operator: 'South India Travels'
  },
  {
    id: '4',
    name: 'Mercedes Multi-Axle AC Sleeper',
    type: 'AC',
    source: 'Kolkata',
    destination: 'Bhubaneswar',
    departureTime: '20:00',
    arrivalTime: '06:30',
    farePerSeat: 750,
    totalSeats: 28,
    availableSeats: 5,
    amenities: ['Wi-Fi', 'Charging Point', 'Water Bottle', 'Blanket', 'Entertainment'],
    rating: 4.8,
    operator: 'Eastern Express'
  }
]

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+91 9876543210',
    role: 'user'
  },
  {
    id: 'admin',
    name: 'Admin User',
    email: 'admin@busbook.com',
    phone: '+91 9999999999',
    role: 'admin'
  }
]

export const mockBookings: Booking[] = [
  {
    id: 'BK001',
    userId: '1',
    busId: '1',
    selectedSeats: [1, 2],
    passengerDetails: [
      { name: 'John Doe', age: 28, gender: 'male', seatNumber: 1 },
      { name: 'Jane Doe', age: 26, gender: 'female', seatNumber: 2 }
    ],
    totalAmount: 900,
    bookingDate: new Date('2024-01-15'),
    travelDate: new Date('2024-01-20'),
    status: 'confirmed',
    paymentMethod: 'UPI',
    bookingReference: 'REF123456789'
  }
]

export const cities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Pune', 'Hyderabad', 
  'Ahmedabad', 'Jaipur', 'Surat', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Bhopal'
]

export type { User }
