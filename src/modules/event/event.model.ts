import { Schema, model } from "mongoose";
import { IEventDoc } from "./event.interface";
import dayjs from "dayjs";

const eventSchema = new Schema<IEventDoc>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  endDate: { type: Date }, 
  location: { type: String },
  image: { type: String },
  status: { type: String, enum: ["Upcoming", "Ongoing", "Past"], default: "Upcoming" },
}, { timestamps: true });

// Pre-save hook to calculate status automatically
eventSchema.pre("save", function (next) {
  const now = dayjs();
  const start = dayjs(this.date);
  const end = this.endDate ? dayjs(this.endDate) : start.add(2, "hour"); // default 2-hour event
  if (now.isBefore(start)) this.status = "Upcoming";
  else if (now.isAfter(end)) this.status = "Past";
  else this.status = "Ongoing";
  next();
});

export const EventModel = model<IEventDoc>("Event", eventSchema);
