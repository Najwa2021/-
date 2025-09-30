import React from 'react';

export const SchoolIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="50" fill="#166534"/>
        <g transform="translate(25, 25) scale(2.2)" stroke="white">
            <path d="M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            <path d="M18 10v6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            <path d="M6 10v6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            <path d="M2 12h20" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            <path d="m6 10 6-6 6 6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            <path d="M2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </g>
    </svg>
);
