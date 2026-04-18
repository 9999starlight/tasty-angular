import { filter, map, merge, Observable } from 'rxjs';

export interface InfoMessage {
  message: string;
  status: boolean;
}

export const emptyInfoMessage: InfoMessage = {
  message: '',
  status: false,
};

export function mapTextToInfoMessage(
  source$: Observable<string | null | undefined>,
  status: boolean,
): Observable<InfoMessage> {
  return source$.pipe(
    filter((message): message is string => !!message),
    map((message) => ({ message, status })),
  );
}

export function mergeInfoMessages(
  ...sources: Observable<InfoMessage>[]
): Observable<InfoMessage> {
  return merge(...sources);
}
