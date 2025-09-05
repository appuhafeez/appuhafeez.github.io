import React from 'react';
import { Link } from 'react-router-dom';


export default function NotFound() {
    return (
        <div className="p-6 text-center">
            <h1 className="text-3xl font-extrabold mb-2">404</h1>
            <p className="mb-4">We couldn't find that page.</p>
            <Link to="/" className="underline">Go Home</Link>
        </div>
    );
}