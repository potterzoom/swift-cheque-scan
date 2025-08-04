import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { ChequeEcuador, ChequeStats } from '@/core/types/cheque';

interface ChequesState {
  // Estado
  cheques: ChequeEcuador[];
  isLoading: boolean;
  filter: 'all' | 'cliente' | 'proveedor';
  searchTerm: string;
  
  // Acciones
  addCheque: (cheque: ChequeEcuador) => void;
  updateCheque: (id: string, updates: Partial<ChequeEcuador>) => void;
  deleteCheque: (id: string) => void;
  setFilter: (filter: 'all' | 'cliente' | 'proveedor') => void;
  setSearchTerm: (term: string) => void;
  getFilteredCheques: () => ChequeEcuador[];
  getStats: () => ChequeStats;
  clearAllCheques: () => void;
}

export const useChequesStore = create<ChequesState>()(
  devtools(
    persist(
      (set, get) => ({
        // Estado inicial
        cheques: [],
        isLoading: false,
        filter: 'all',
        searchTerm: '',

        // Acciones
        addCheque: (cheque) => {
          set((state) => ({
            cheques: [cheque, ...state.cheques]
          }));
        },

        updateCheque: (id, updates) => {
          set((state) => ({
            cheques: state.cheques.map(cheque =>
              cheque.id === id ? { ...cheque, ...updates } : cheque
            )
          }));
        },

        deleteCheque: (id) => {
          set((state) => ({
            cheques: state.cheques.filter(cheque => cheque.id !== id)
          }));
        },

        setFilter: (filter) => {
          set({ filter });
        },

        setSearchTerm: (searchTerm) => {
          set({ searchTerm });
        },

        getFilteredCheques: () => {
          const { cheques, filter, searchTerm } = get();
          let filtered = cheques;

          // Filtrar por tipo
          if (filter !== 'all') {
            filtered = filtered.filter(cheque => cheque.tipo === filter);
          }

          // Filtrar por búsqueda
          if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(cheque =>
              cheque.numero.toLowerCase().includes(term) ||
              cheque.emisor.toLowerCase().includes(term) ||
              cheque.beneficiario.toLowerCase().includes(term) ||
              cheque.banco.toLowerCase().includes(term)
            );
          }

          return filtered.sort((a, b) => 
            new Date(b.fechaProcesamiento).getTime() - new Date(a.fechaProcesamiento).getTime()
          );
        },

        getStats: () => {
          const { cheques } = get();
          const hoy = new Date().toDateString();
          
          const procesadosHoy = cheques.filter(cheque =>
            new Date(cheque.fechaProcesamiento).toDateString() === hoy
          ).length;

          const clientesUnicos = new Set(
            cheques.filter(c => c.tipo === 'cliente').map(c => c.emisor)
          ).size;

          const proveedoresUnicos = new Set(
            cheques.filter(c => c.tipo === 'proveedor').map(c => c.emisor)
          ).size;

          const validacionesExitosas = cheques.filter(c =>
            c.validacionRUC?.valido === true
          ).length;

          const fondosVerificados = cheques.filter(c =>
            c.verificacionBancaria?.fondosDisponibles === true
          ).length;

          const montoTotal = cheques.reduce((sum, cheque) => sum + cheque.monto, 0);
          const promedioPorCheque = cheques.length > 0 ? montoTotal / cheques.length : 0;

          return {
            totalCheques: cheques.length,
            clientesUnicos,
            proveedoresUnicos,
            procesadosHoy,
            validacionesExitosas,
            fondosVerificados,
            montoTotal,
            promedioPorCheque
          };
        },

        clearAllCheques: () => {
          set({ cheques: [] });
        }
      }),
      {
        name: 'cheques-storage',
        version: 1
      }
    ),
    { name: 'cheques-store' }
  )
);