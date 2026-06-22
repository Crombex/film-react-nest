import { Injectable } from '@nestjs/common';
import { FilmsService } from '../films/films.service';
import { OrderEntity } from './entity/order.entity';
import { DaytimeNotMatchException } from './exceptions/daytime-not-match.exception';
import { PlaceAlreadyTakenException } from './exceptions/place-already-taken.exception';
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
  async createOrder(order: OrderEntity) {
    const response = {
      total: 0,
      items: [],
    };

    const allTickets = order.tickets;

    for (const ticket of allTickets) {
      const { items: filmSchedule } =
        await this.filmsService.findFilmScheduleByID(ticket.film);

      const session = filmSchedule.find((item) => item.id === ticket.session);

      if (!session) {
        throw new SessionNotFoundException('Session not found');
      }

      if (session.daytime !== ticket.daytime) {
        throw new DaytimeNotMatchException(
          'Daytime does not match for session',
        );
      }

      const personPlace = `${ticket.row}:${ticket.seat}`;

      if (session.taken.includes(personPlace)) {
        throw new PlaceAlreadyTakenException(
          'Place is already taken for session',
        );
      }

      const data = await this.filmsService.updateFilmTakenPlaces(
        ticket.film,
        ticket.session,
        personPlace,
      );

      response.items.push({
        film: ticket.film,
        session: data.id,
        daytime: data.daytime,
        row: ticket.row,
        seat: ticket.seat,
        price: data.price,
        id: crypto.randomUUID(),
      });

      response.total++;
    }

    return response;
  }
}
