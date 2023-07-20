import { useState } from 'react';
import { RequestView } from './components/RequestView';
import { RequestSentView } from './components/RequestSentView';

export const OfficialAccount = () => {
  const [state, setState] = useState<'request' | 'sent'>('request');
  return state === 'request' ? <RequestView setState={setState} /> : <RequestSentView />;
};
