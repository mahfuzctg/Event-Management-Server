import { Document } from "mongoose";

export type EventStatus = "Upcoming" | "Ongoing" | "Past";

export interface IEvent {
  title: string;
  description: string;
  date: Date;
  endDate?: Date; // optional end date/time
  location?: string;
  image?: string;
  status?: EventStatus;
}

export interface IEventDoc extends IEvent, Document {}
