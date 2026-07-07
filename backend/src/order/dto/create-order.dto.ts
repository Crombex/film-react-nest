import {
  IsString,
  IsUUID,
  IsArray,
  ArrayNotEmpty,
  IsEmail,
  ValidateNested,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

export class TicketDTO {
  @IsUUID(4, { message: 'film must be a valid UUID' })
  film: string;

  @IsUUID(4, { message: 'session must be a valid UUID' })
  session: string;

  @IsString({ message: 'daytime must be a string' })
  daytime: string;

  @IsNumber({}, { message: 'row must be a number' })
  row: number;

  @IsNumber({}, { message: 'seat must be a number' })
  seat: number;

  @IsNumber({}, { message: 'price must be a number' })
  price: number;
}

export class CreateOrderDTO {
  @IsEmail({}, { message: 'email must be a valid email' })
  email: string;

  @IsString({ message: 'phone must be a string' })
  phone: string;

  @IsArray({ message: 'tickets must be an array' })
  @ArrayNotEmpty({ message: 'tickets array must not be empty' })
  @ValidateNested({ each: true })
  @Type(() => TicketDTO)
  tickets: TicketDTO[];
}
