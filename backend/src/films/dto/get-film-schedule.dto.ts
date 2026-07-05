import { IsUUID } from 'class-validator';

export class GetFilmScheduleDTO {
  @IsUUID(4, { message: 'id must be a valid UUID' })
  id: string;
}
