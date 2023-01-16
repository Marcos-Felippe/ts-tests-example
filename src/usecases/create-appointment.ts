import { Appointment } from "../entities/appointment"
import { AppointmentsRepository } from "../repositories/appointment-repository"

interface CreateAppointmentRequest {
    costumer: string
    startsAt: Date
    endsAt: Date
}

type CreateAppointmentResponse = Appointment

export class CreateAppointmentUseCase {

    constructor(
        private appointmentRepository: AppointmentsRepository
    ) {}

    async execute({
        costumer,
        startsAt,
        endsAt,
    }: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
        
        const overlapingAppointment = await this.appointmentRepository.findOverlapingAppointment(
            startsAt,
            endsAt
        );

        if(overlapingAppointment) {
            throw new Error('Another appointment overlaps this appointment dates')
        }

        const appointment = new Appointment({
            costumer,
            startsAt,
            endsAt,
        });

        await this.appointmentRepository.create(appointment);

        return appointment
    }
}