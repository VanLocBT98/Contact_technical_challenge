export interface IOlympicData {
  athlete: string;
  age: number;
  country: string;
  year: number;
  date: string;
  sport: string;
  gold: number;
  silver: number;
  bronze: number;
  total: number;
  id: string;
}
export interface IUser {
  _id: string;
  user_name: string;
  user_email: string;
  user_phone: number;
  user_title: UserTitle;
  user_type: UserType;
}
