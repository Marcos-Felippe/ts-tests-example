import { Appointment } from "../../entities/appointment";
import { AppointmentsRepository } from "../appointment-repository";
 
export class InMemoryAppointmentsRepository implements AppointmentsRepository {
    public items: Appointment[] = []

    async create(appointment: Appointment): Promise<void> {
        this.items.push(appointment);
        return
    }

    async findOverlapingAppointment(startsAt: Date, endsAt: Date): Promise<Appointment | null> {
        let user = this.items.find(appointment => appointment.startsAt === startsAt);
        if(user?.startsAt === startsAt) {
            return user
        }

        user = this.items.find(appointment => appointment.endsAt === endsAt);
        if(user?.endsAt === endsAt) {
            return user
        }

        return null
    }
}