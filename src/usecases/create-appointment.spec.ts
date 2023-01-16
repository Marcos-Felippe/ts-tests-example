import { describe, expect, it } from "vitest";
import { Appointment } from "../entities/appointment";
import { InMemoryAppointmentsRepository } from "../repositories/in-memory/in-memory-appointments-repository";
import { CreateAppointmentUseCase } from "./create-appointment";

describe('Create Appointment', () => {
    it('should be able to create an appointment', () => {
        
        const startDate = new Date()
        const endDate = new Date()
        startDate.setDate(startDate.getDate() + 1)
        endDate.setDate(endDate.getDate() + 2)

        const appointmentsRepository = new InMemoryAppointmentsRepository();
        const createAppointment = new CreateAppointmentUseCase(
            appointmentsRepository
        );

        expect(createAppointment.execute({
            costumer: 'Costumer 1',
            startsAt: startDate,
            endsAt: endDate,
        })).resolves.toBeInstanceOf(Appointment)
    })

    it('should not be able to create an appointment with overlaping dates', async () => {
        
        const startDate = new Date()
        const endDate = new Date()
        startDate.setDate(startDate.getDate() + 1)
        endDate.setDate(endDate.getDate() + 2)

        const appointmentsRepository = new InMemoryAppointmentsRepository();
        const createAppointment = new CreateAppointmentUseCase(
            appointmentsRepository
        );

        await createAppointment.execute({
            costumer: 'Costumer 1',
            startsAt: startDate,
            endsAt: endDate,
        });

        expect(createAppointment.execute({
            costumer: 'Costumer 2',
            startsAt: startDate,
            endsAt: endDate,
        })).rejects.toBeInstanceOf(Error)
    })

    it('should be able to create an appointment without overlaping dates', async () => {
        
        const appointmentsRepository = new InMemoryAppointmentsRepository();
        const createAppointment = new CreateAppointmentUseCase(
            appointmentsRepository
        );

        // first appointment
        const startDate1 = new Date()
        const endDate1 = new Date()
        startDate1.setDate(startDate1.getDate() + 1)
        endDate1.setDate(endDate1.getDate() + 2)

        await createAppointment.execute({
            costumer: 'Costumer 1',
            startsAt: startDate1,
            endsAt: endDate1,
        });

        // second appointment
        const startDate2 = new Date()
        const endDate2 = new Date()
        startDate2.setDate(startDate2.getDate() + 3)
        endDate2.setDate(endDate2.getDate() + 4)

        expect(createAppointment.execute({
            costumer: 'Costumer 2',
            startsAt: startDate2,
            endsAt: endDate2,
        })).resolves.toBeInstanceOf(Appointment)
    })
})
