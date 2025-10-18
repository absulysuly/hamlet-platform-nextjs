
import React from 'react';
import { IconProps } from '../../icons/Icons.tsx';

const ScaleIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c-.317.042-.63.09-.94.137m-11.62 0c-.317.042-.63.09-.94.137m12.56-1.546a21.037 21.037 0 01-1.147.224m-10.274 0c.38.06.764.12 1.147.224M4.5 10.5a2.25 2.25 0 002.25 2.25h.75a2.25 2.25 0 002.25-2.25v-1.5a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v1.5zm9-1.5a2.25 2.25 0 00-2.25 2.25v1.5a2.25 2.25 0 002.25 2.25h.75a2.25 2.25 0 002.25-2.25v-1.5a2.25 2.25 0 00-2.25-2.25h-.75z" />
    </svg>
);

export default ScaleIcon;
