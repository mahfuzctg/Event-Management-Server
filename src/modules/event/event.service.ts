import { EventModel } from "./event.model";
import { IEvent, IEventDoc } from "./event.interface";
import { calculateEventStatusByTimezone } from "../../utils/calculateEventStatus";

/**
 * EventService - handles all CRUD operations for events
 */
export class EventService {
  // Create a new event
  static async createEvent(data: IEvent): Promise<IEventDoc> {
    const event = new EventModel(data);
    return event.save();
  }

  // Get all events with dynamic, timezone-aware status
  static async getAllEvents(visitorTZ?: string): Promise<IEventDoc[]> {
    const events = await EventModel.find().sort({ date: 1 });
    return events.map((event) => {
      try {
        event.status = calculateEventStatusByTimezone(
          event.date,
          event.endDate,
          visitorTZ
        );
      } catch {
        event.status = "Upcoming"; // fallback
      }
      return event;
    });
  }

  // Get a single event by ID
  static async getEventById(
    id: string,
    visitorTZ?: string
  ): Promise<IEventDoc | null> {
    const event = await EventModel.findById(id);
    if (event) {
      try {
        event.status = calculateEventStatusByTimezone(
          event.date,
          event.endDate,
          visitorTZ
        );
      } catch {
        event.status = "Upcoming"; // fallback
      }
    }
    return event;
  }

  // Update an event by ID
  static async updateEvent(
    id: string,
    data: Partial<IEvent>,
    visitorTZ?: string
  ): Promise<IEventDoc | null> {
    const updatedEvent = await EventModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (updatedEvent) {
      try {
        updatedEvent.status = calculateEventStatusByTimezone(
          updatedEvent.date,
          updatedEvent.endDate,
          visitorTZ
        );
      } catch {
        updatedEvent.status = "Upcoming"; // fallback
      }
    }

    return updatedEvent;
  }

  // Delete an event by ID
  static async deleteEvent(id: string): Promise<IEventDoc | null> {
    return EventModel.findByIdAndDelete(id);
  }
}
