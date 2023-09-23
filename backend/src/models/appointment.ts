import { InferSchemaType, model, Schema } from "mongoose";
const appointmentSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    doctorId: { type: Schema.Types.ObjectId, required: true },
    firstname: { type: String, required: true, unique: true },
    lastname: { type: String, required: true, unique: true },
    age: { type: Number, required: true},
    date:{type:Date, required:true},
    gender: { type: String, required: true},
    description: { type: String, required: true},
    status:{type: String,required:true}

    
});
type Appointment = InferSchemaType<typeof appointmentSchema>;

export default model<Appointment>("Appointment", appointmentSchema);