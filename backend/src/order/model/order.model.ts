import { TicketModel } from './ticket.model';

export interface OrderModel {
  email: string;
  phone: string;
  tickets: TicketModel[];
}
