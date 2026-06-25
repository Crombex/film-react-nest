import { TicketEntity } from './ticket.entity';

export interface OrderEntity {
  email: string;
  phone: string;
  tickets: TicketEntity[];
}
