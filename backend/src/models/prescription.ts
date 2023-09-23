import { InferSchemaType, model, Schema } from "mongoose";

const prescriptionSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    doctorId: { type: Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    description: { type: String },
    date:{type: Date},
}, { timestamps: true });

type Prescription = InferSchemaType<typeof prescriptionSchema>;

export default model<Prescription>("Prescription", prescriptionSchema);