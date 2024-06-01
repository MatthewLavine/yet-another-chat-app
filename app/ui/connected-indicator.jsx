'use client';

import { clsx } from 'clsx';

export default function ConnectedIndicator({ connected }) {
    return (
        <div className='object-top-left m-5'>
            <button
                type="button"
                className={
                    clsx(
                        "cursor-default h-10 items-center rounded-lg px-4 text-sm font-medium text-white transition-colors aria-disabled:cursor-not-allowed aria-disabled:opacity-50",
                        connected && "bg-green-500", !connected && "bg-red-500"
                    )}>
                {connected ? "Connected" : "Disconnected"}
            </button>
        </div>
    );
};