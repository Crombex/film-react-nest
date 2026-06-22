import { IsUUID } from 'class-validator';

export class GetFilmScheduleDTO {
  @IsUUID(4)
  id: string;
}
