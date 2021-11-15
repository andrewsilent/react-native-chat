import { settings } from './settings_reducer';
import { user } from './user_reducer';
import { view } from './view_reducer';

const rootReducer = {
  settings: settings.reducer,
  user: user.reducer,
  view: view.reducer,
};

export { rootReducer };
