import { InferSchemaType, model, Schema } from "mongoose";

const doctorSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    firstname: { type: String, required: true, unique: true },
    secondname: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true, unique: true, select: false },
    password: { type: String, required: true, select: false },
});

type Doctor = InferSchemaType<typeof doctorSchema>;

export default model<Doctor>("Doctor", doctorSchema);