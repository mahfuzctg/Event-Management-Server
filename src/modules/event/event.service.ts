import { EventModel } from "./event.model";
import { IEvent, IEventDoc } from "./event.interface";
import { calculateEventStatus } from "../../utils/calculateEventStatus";

export class EventService {
  static async createEvent(data: IEvent): Promise<IEventDoc> {
    const event = new EventModel(data);
    return event.save();
  }

  static async getAllEvents(): Promise<IEventDoc[]> {
    const events = await EventModel.find().sort({ date: 1 });
    return events.map((event) => {
      event.status = calculateEventStatus(event.date, event.endDate);
      return event;
    });
  }

  static async getEventById(id: string): Promise<IEventDoc | null> {
    const event = await EventModel.findById(id);
    if (event) {
      event.status = calculateEventStatus(event.date, event.endDate);
    }
    return event;
  }

  static async updateEvent(id: string, data: Partial<IEvent>): Promise<IEventDoc | null> {
    const updatedEvent = await EventModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (updatedEvent) {
      updatedEvent.status = calculateEventStatus(updatedEvent.date, updatedEvent.endDate);
    }

    return updatedEvent;
  }

  static async deleteEvent(id: string): Promise<IEventDoc | null> {
    return EventModel.findByIdAndDelete(id);
  }
}
