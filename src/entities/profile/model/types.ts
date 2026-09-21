export type Profile = {
  id: number
  username: string
  firstName: string
  lastName: string
  avatarUrl: string | null
  subscribersAmount: number
  isActive: boolean;
  stack: string[];
  city: string;
  description: string;
}
