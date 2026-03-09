export interface BusFormInputs {
  busName: string;
  busNumber: string;
  latitude: number;
  longitude: number;
  type: string;
  source: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  farePerSeat: number;
  totalSeats: number;
  amenities: string[];
  operator: string;
  driverName: string;
  driverEmail: string;
  driverPhoneNumber: string;
  driverAddress: string;
  busDriver: string;
  interiorPic: FileList;
  exteriorPic: FileList;
  busDriverId: {
    driverName: string;
    email: string;
    phoneNumber: string;
    address: string;
  };
}
