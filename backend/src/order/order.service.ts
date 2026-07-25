import { Injectable } from '@nestjs/common';
import { FilmsService } from '../films/films.service';
import { OrderModel } from './model/order.model';
import { DaytimeNotMatchException } from './exceptions/daytime-not-match.exception';
import { SessionNotFoundException } from './exceptions/session-not-found.exception';

@Injectable()
export class OrderService {
  constructor(private filmsService: FilmsService) {}

  /**
   * Реализация проверки билетов такая, так как в теории (не в нашем случае)
   * может быть куплено много разных билетов на разные фильмы и сеансы,
   * и нужно проверить каждый билет на валидность,
   * а также обновить информацию о занятых местах для каждого фильма и сеанса
   */
  async createOrder(order: OrderModel) {
    const result = [];

    const allTickets = order.tickets;

    for (const ticket of allTickets) {
      const schedule = await this.filmsService.findFilmScheduleByID(
        ticket.film,
      );

      const session = schedule.find((item) => item.id === ticket.session);

      if (!session) {
        throw new SessionNotFoundException('Session not found');
      }

      if (session.daytime !== ticket.daytime) {
        throw new DaytimeNotMatchException(
          'Daytime does not match for session',
        );
      }

      const personPlace = `${ticket.row}:${ticket.seat}`;

      const filmSessionData = await this.filmsService.updateFilmTakenPlaces(
        ticket.film,
        ticket.session,
        personPlace,
      );

      result.push({
        film: ticket.film,
        session: filmSessionData!.id,
        daytime: filmSessionData!.daytime,
        row: ticket.row,
        seat: ticket.seat,
        price: filmSessionData!.price,
        id: crypto.randomUUID(),
      });
    }

    return result;
  }
}
