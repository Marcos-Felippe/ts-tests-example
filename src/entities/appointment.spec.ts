import { expect, test } from 'vitest'
import { Appointment } from './appointment'

test('create an appoitment', () => {

    const startDate = new Date()
    const endDate = new Date()
    startDate.setDate(endDate.getDate() + 1)
    endDate.setDate(endDate.getDate() + 2)

    const appointment = new Appointment({
        costumer: 'Costumer 1',
        startsAt: startDate,
        endsAt: endDate,
    })

    expect(appointment).toBeInstanceOf(Appointment)
    expect(appointment.costumer).toEqual('Costumer 1')
    expect(appointment.startsAt).toEqual(startDate)
    expect(appointment.endsAt).toEqual(endDate)
})

test('cannot create an appointment with start date before current date', () => {
    
    const startDate = new Date()
    const endDate = new Date()
    startDate.setDate(endDate.getDate() -  1)
    endDate.setDate(endDate.getDate() + 1)

    expect(() => {
        return new Appointment({
            costumer: 'Costumer 1',
            startsAt: startDate,
            endsAt: endDate,
        })
    }).toThrow()
})

test('cannot create an appointment with end date before start date', () => {
    
    const startDate = new Date()
    const endDate = new Date()
    startDate.setDate(endDate.getDate() + 1)
    endDate.setDate(endDate.getDate() - 1)

    expect(() => {
        return new Appointment({
            costumer: 'Costumer 1',
            startsAt: startDate,
            endsAt: endDate,
        })
    }).toThrow()
})