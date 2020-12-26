import { IsDefined, IsString, MinLength } from 'class-validator';

export class CreateGroupPayload {
  @IsDefined()
  @IsString()
  @MinLength(1)
  name: string;
}
