import React from 'react';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="sticky bottom-0 w-full bg-white text-slate-600 border-t border-slate-200 sm:py-5 py-1 px-4 sm:px-6 lg:px-8 mt-auto shadow-xs">
      <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-0 p-1 text-center sm:text-left text-xs">
        <p className="text-slate-500 font-medium">
          &copy; {new Date().getFullYear()} Admin Dashboard. All rights reserved.
        </p>
        <p className="flex items-center justify-center gap-1 font-medium text-slate-500">
          Developed with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> by{' '}
          <span className="font-bold text-slate-800">Deepak Kushwaha</span>
        </p>
      </div>
    </footer>
  );
}
