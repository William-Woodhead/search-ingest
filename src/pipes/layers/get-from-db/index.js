import { requestContent } from '../../../services/content-db';
import { EVENTS } from '../../../core/enums';
import { emit } from '../../../core/event-emitter';

export function listener(event, payload) {
  switch(event.type) {
    case EVENTS.METHOD_CREATE:
    case EVENTS.RESPONSE_FROM_ES:
      return getFromDB(payload);
    default:
      return;
  }
}

function getFromDB(config = {}) {
  return requestContent(config).then((result) => {
    emit(EVENTS.RESPONSE_FROM_DB, { ...config, result });
  }).catch((err) => {
    emit(EVENTS.ERROR, err);
  });
}
