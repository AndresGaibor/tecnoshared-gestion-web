import React, { useState, useEffect, useRef } from 'react';
import { Location } from '../types/filters';

interface LocationSelectorProps {
  value: Location | null;
  onChange: (location: Location | null) => void;
  locations: Location[];
  className?: string;
}

export function LocationSelector({ value, onChange, locations, className = '' }: LocationSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Cerrar dropdown cuando se hace click fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLocationSelect = (location: Location | null) => {
    onChange(location);
    setIsOpen(false);
  };

  const displayText = value ? value.displayName : 'Todas las Sucursales';

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Botón principal */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 pl-3 pr-2 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
      >
        <span className="material-symbols-outlined text-[#6B7280] dark:text-gray-400 text-lg">store</span>
        <p className="text-[#111418] dark:text-white text-sm font-medium leading-normal">
          Ubicación: {displayText}
        </p>
        <span className="material-symbols-outlined text-[#6B7280] dark:text-gray-400 text-xl">
          {isOpen ? 'expand_less' : 'expand_more'}
        </span>
      </button>

      {/* Dropdown de ubicaciones */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg z-50 py-2">
          {/* Opción "Todas las Sucursales" */}
          <button
            onClick={() => handleLocationSelect(null)}
            className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-3 ${
              !value ? 'bg-primary/10 text-primary dark:bg-primary/20' : 'text-gray-900 dark:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-lg">
              {value ? 'radio_button_unchecked' : 'radio_button_checked'}
            </span>
            <div>
              <p className="font-medium">Todas las Sucursales</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Mostrar todas las ubicaciones</p>
            </div>
          </button>

          <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>

          {/* Lista de ubicaciones */}
          {locations.map((location) => (
            <button
              key={location.id}
              onClick={() => handleLocationSelect(location)}
              className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-3 ${
                value?.id === location.id ? 'bg-primary/10 text-primary dark:bg-primary/20' : 'text-gray-900 dark:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-lg">
                {value?.id === location.id ? 'radio_button_checked' : 'radio_button_unchecked'}
              </span>
              <div>
                <p className="font-medium">{location.displayName}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Sucursal {location.name}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}