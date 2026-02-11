// Type definitions for MUbrella App

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  createdAt: Date;
}

export interface ParkingLocation {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  totalSlots: number;
  availableSlots: number;
  pricePerHour: number;
  distance?: number;
  facilities?: string[];
}

export interface CreditBalance {
  balance: number;
  currency: string;
  lastUpdated: Date;
}

export interface RewardPoints {
  points: number;
  level: string;
  nextLevelPoints?: number;
}

export interface Transaction {
  id: string;
  type: 'parking' | 'topup' | 'refund' | 'reward';
  amount: number;
  description: string;
  date: Date;
  status: 'pending' | 'completed' | 'failed';
  parkingLocation?: ParkingLocation;
}

export interface ParkingSession {
  id: string;
  parkingLocationId: string;
  parkingLocation: ParkingLocation;
  startTime: Date;
  endTime?: Date;
  duration?: number;
  fee?: number;
  status: 'active' | 'completed' | 'cancelled';
  vehicleNumber?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  date: Date;
  read: boolean;
  actionUrl?: string;
}

// Navigation Types
export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Home: undefined;
  ParkingDetail: { parkingId: string };
  Profile: undefined;
  Wallet: undefined;
  Rewards: undefined;
  History: undefined;
  Settings: undefined;
};

// Props Types
export interface SplashScreenProps {
  navigation: any;
}

export interface LoginScreenProps {
  navigation: any;
}

export interface HomeScreenProps {
  navigation: any;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface LoginResponse {
  token: string;
  user: User;
  expiresAt: Date;
}

export interface ParkingLocationResponse {
  locations: ParkingLocation[];
  total: number;
}