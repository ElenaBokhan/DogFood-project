import {createRoot} from 'react-dom/client';

import '@fontsource/nunito';
import '@fontsource/nunito/800.css';
import App from './App';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<App />);
