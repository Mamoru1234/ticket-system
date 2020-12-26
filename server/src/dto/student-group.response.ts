import { Expose } from 'class-transformer/decorators';

export class StudentGroupResponse {
  @Expose()
  id: string;
  @Expose()
  name: string;
}
