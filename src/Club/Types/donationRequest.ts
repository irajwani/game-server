export interface IDonationRequest {
  id: string;
  userId: string;
  clubId: string;
  requested: number;
  donated: number;
  excess: number;
  isFulfilled: boolean;
  hasExpired: boolean;
  createdAt: Date;
  updatedAt: Date;
}
