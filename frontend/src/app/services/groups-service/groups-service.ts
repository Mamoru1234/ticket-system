import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface GroupDto {
  id: number;
  name: string;
}

let lastGroupId = 0;

function groupId() {
  return lastGroupId++;
}
function generateGroup(name: string): GroupDto {
  return {
    name,
    id: groupId(),
  };
}

@Injectable()
export class GroupsService {
  private readonly groups$ = new BehaviorSubject<GroupDto[]>([]);
  getAllGroups(): Observable<GroupDto[]> {
    const groups = [
      generateGroup('G1'),
      generateGroup('G2'),
      generateGroup('G3'),
      generateGroup('Advanced'),
    ];
    this.groups$.next(groups);
    return this.groups$;
  }
}
