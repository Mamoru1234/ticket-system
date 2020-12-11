import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';

export class SetHeaderItemsAction {
  static readonly type = '[App header] set items';
  constructor(public items: HeaderItem[]) {
  }
}

export interface HeaderItem {
  label: string;
}

export interface AppHeaderState {
  items: HeaderItem[];
}

@State<AppHeaderState>({
  name: 'appHeaderStore',
  defaults: {
    items: [],
  },
})
@Injectable()
export class AppHeaderStore {

  @Selector()
  static items(state: AppHeaderState): HeaderItem[] {
    return state.items;
  }

  @Action(SetHeaderItemsAction)
  setItems(ctx: StateContext<AppHeaderState>, action: SetHeaderItemsAction): void {
    ctx.setState({
      items: action.items,
    });
  }
}
