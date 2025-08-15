import { EventModel } from "./event.model";
import { IEvent, IEventDoc } from "./event.interface";
import dayjs from "dayjs";

export class EventService {
  static async createEvent(data: IEvent): Promise<IEventDoc> {
    const event = new EventModel(data);
    return event.save();
  }

  static async getAllEvents(): Promise<IEventDoc[]> {
    // Fetch all events sorted by date
    const events = await EventModel.find().sort({ date: 1 });
    return events.map((event) => {
      // Calculate status dynamically
      const now = dayjs();
      const start = dayjs(event.date);
      const end = event.endDate ? dayjs(event.endDate) : start.add(2, "hour");
      if (now.isBefore(start)) event.status = "Upcoming";
      else if (now.isAfter(end)) event.status = "Past";
      else event.status = "Ongoing";
      return event;
    });
  }

  static async getEventById(id: string): Promise<IEventDoc | null> {
    return EventModel.findById(id);
  }

  static async updateEvent(id: string, data: Partial<IEvent>): Promise<IEventDoc | null> {
    return EventModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  static async deleteEvent(id: string): Promise<IEventDoc | null> {
    return EventModel.findByIdAndDelete(id);
  }
}
