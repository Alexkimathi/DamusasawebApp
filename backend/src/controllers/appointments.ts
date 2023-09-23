import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import AppointmentModel from "../models/appointment";
import { assertIsDefined } from "../util/assertIsDefined";

//gets all the appointments

export const getAppointments: RequestHandler = async (req, res, next) => {
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);

        const appointments = await AppointmentModel.find({ userId: authenticatedUserId }).exec();
        res.status(200).json(appointments);
    } catch (error) {
        next(error);
    }
};

//gets a single appointment
export const getAppointment: RequestHandler = async (req, res, next) => {
    const appointmentId = req.params.noteId;
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);

        if (!mongoose.isValidObjectId(appointmentId)) {
            throw createHttpError(400, "Invalid appointment id");
        }

        const appointment = await AppointmentModel.findById(appointmentId).exec();

        if (!appointment) {
            throw createHttpError(404, "Appointment not found");
        }

        if (!appointment.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "You cannot access this note");
        }

        res.status(200).json(appointment);
    } catch (error) {
        next(error);
    }
};

interface CreateNoteBody {
    firstname?: string,
    lastname?: string,
    age?: Number,
    date?: Date,
    gender?: string,
    description?: string,
    status?: string,
    
}

export const createAppointment: RequestHandler<unknown, unknown, CreateNoteBody, unknown> = async (req, res, next) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const age = req.body.age;
    const date = req.body.date;
    const gender = req.body.gender;
    const description = req.body.description;
    const status = req.body.status;
   
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);

        if (!firstname) {
            throw createHttpError(400, "Appointment must have a firstname");
        }
        if (!lastname) {
            throw createHttpError(400, "Appointment must have a lastname");
        }
        if (!age) {
            throw createHttpError(400, "Appointment must have a age");
        }
        if (!date) {
            throw createHttpError(400, "Appointment must have a date");
        }
        if (!gender) {
            throw createHttpError(400, "Appointment must have a gender");
        }
        if (!description) {
            throw createHttpError(400, "Appointment must have a description");
        }

        const newAppointment = await AppointmentModel.create({
            userId: authenticatedUserId,
            firstname: firstname,
            lastname: lastname,
            age:age,
            date:date,
            gender:gender,
            description:description,
            status:status,
        });

        res.status(201).json(newAppointment);
    } catch (error) {
        next(error);
    }
};

interface UpdateAppointmentParams {
    AppointmentId: string,
}

interface UpdateNoteBody {
    firstname?: string,
    lastname?: string,
    age?: Number,
    date?: Date,
    gender?: string,
    description?: string,
    status?: string,
}

export const updateAppointment: RequestHandler<UpdateAppointmentParams, unknown, UpdateNoteBody, unknown> = async (req, res, next) => {
    const AppointmentId = req.params.AppointmentId;
    const newFirstname = req.body.firstname;
    const newLastname = req.body.lastname;
    const newAge = req.body.age;
    const newDate = req.body.date;
    const newGender = req.body.gender;
    const newDescription = req.body.description;
    const newStatus = req.body.status;
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);

        if (!mongoose.isValidObjectId(AppointmentId)) {
            throw createHttpError(400, "Invalid appointment id");
        }

        if (!newFirstname) {
            throw createHttpError(400, "Appointment must have a firstname");
        }
        if (!newLastname) {
            throw createHttpError(400, "Appointment must have a lastname");
        }
        if (!newAge) {
            throw createHttpError(400, "Appointment must have a age");
        }

        const appointment = await AppointmentModel.findById(AppointmentId).exec();

        if (!appointment) {
            throw createHttpError(404, "Appointment not found");
        }

        if (!appointment.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "You cannot access this Appointment");
        }

        appointment.firstname = newFirstname;
        appointment.lastname = newLastname;
       


        const updatedAppointment = await appointment.save();

        res.status(200).json(updatedAppointment);
    } catch (error) {
        next(error);
    }
};

export const deleteAppointment: RequestHandler = async (req, res, next) => {
    const appointmentId = req.params.appointmentId;
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);

        if (!mongoose.isValidObjectId(appointmentId)) {
            throw createHttpError(400, "Invalid appointment id");
        }

        const appointment = await AppointmentModel.findById(appointmentId).exec();

        if (!appointment) {
            throw createHttpError(404, "Note not found");
        }

        if (!appointment.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "You cannot access this appointment");
        }

        await appointment.remove();

        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};