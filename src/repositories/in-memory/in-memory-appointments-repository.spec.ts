import { describe, expect, it } from "vitest";
import { Appointment } from "../../entities/appointment";
import { InMemoryAppointmentsRepository } from "../../repositories/in-memory/in-memory-appointments-repository";

describe('In Memory Repository Tests', () => {
    it('should be able to save an appointment', async () => {
        
        const startDate = new Date()
        const endDate = new Date()
        startDate.setDate(startDate.getDate() + 1)
        endDate.setDate(endDate.getDate() + 2)

        const appointmentsRepository = new InMemoryAppointmentsRepository();

        const overlapingAppointment = await appointmentsRepository.findOverlapingAppointment(
            startDate,
            endDate,
        );

        const appointment = new Appointment({
            costumer: 'Costumer 1',
            startsAt: startDate,
            endsAt: endDate,
        });

        expect(overlapingAppointment).toBeNull()
        expect(appointmentsRepository.create(appointment)).resolves
    })

    it('should return an appointment with overlaping dates', async () => {
        
        const startDate = new Date()
        const endDate = new Date()
        startDate.setDate(startDate.getDate() + 1)
        endDate.setDate(endDate.getDate() + 2)

        const appointmentsRepository = new InMemoryAppointmentsRepository();

        const appointment = new Appointment({
            costumer: 'Costumer 1',
            startsAt: startDate,
            endsAt: endDate,
        });

        await appointmentsRepository.create(appointment);

        const overlapingAppointment2 = await appointmentsRepository.findOverlapingAppointment(
            startDate,
            endDate,
        );

        expect(overlapingAppointment2).toBeInstanceOf(Appointment)
    })

    it('should be able to save two appointments', async () => {
        
        // first appointment
        const startDate1 = new Date()
        const endDate1 = new Date()
        startDate1.setDate(startDate1.getDate() + 1)
        endDate1.setDate(endDate1.getDate() + 2)

        const appointmentsRepository = new InMemoryAppointmentsRepository();

        const appointment1 = new Appointment({
            costumer: 'Costumer 1',
            startsAt: startDate1,
            endsAt: endDate1,
        });

        const overlapingAppointment1 = await appointmentsRepository.findOverlapingAppointment(
            startDate1,
            endDate1,
        );

        // second appointment
        const startDate2 = new Date()
        const endDate2 = new Date()
        startDate2.setDate(startDate2.getDate() + 3)
        endDate2.setDate(endDate2.getDate() + 4)

        const appointment2 = new Appointment({
            costumer: 'Costumer 2',
            startsAt: startDate2,
            endsAt: endDate2,
        });

        const overlapingAppointment2 = await appointmentsRepository.findOverlapingAppointment(
            startDate2,
            endDate2,
        );

        expect(overlapingAppointment1).toBeNull()
        expect(appointmentsRepository.create(appointment1)).resolves
        expect(overlapingAppointment2).toBeNull()
        expect(appointmentsRepository.create(appointment2)).resolves
    })
})
