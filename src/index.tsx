import App from 'App';
import {createRoot} from 'react-dom/client';

import '@fontsource/nunito';
import '@fontsource/nunito/800.css';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<App />);
