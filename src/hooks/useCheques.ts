import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';
import type { Database } from '@/integrations/supabase/types';

type DbCheque = Database['public']['Tables']['cheques']['Row'];

export interface Cheque extends Omit<DbCheque, 'datos_ocr' | 'validaciones'> {
  datos_ocr?: any;
  validaciones?: any;
}

export interface ChequeStats {
  total_cheques: number;
  total_monto: number;
  cheques_pendientes: number;
  cheques_procesados: number;
  cheques_cobrados: number;
  monto_pendiente: number;
  banco_mas_comun?: string;
  promedio_por_dia: number;
}

export const useCheques = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [cheques, setCheques] = useState<Cheque[]>([]);
  const [stats, setStats] = useState<ChequeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'cliente' | 'proveedor'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch cheques
  const fetchCheques = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('cheques')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCheques((data || []) as Cheque[]);
    } catch (error) {
      console.error('Error fetching cheques:', error);
      toast({
        title: "Error",
        description: "No se pudieron cargar los cheques",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch stats
  const fetchStats = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase.rpc('get_cheque_stats', {
        p_user_id: user.id
      });

      if (error) throw error;
      setStats(data as unknown as ChequeStats);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  // Process cheque with backend OCR
  const processChequeOCR = async (imageData: string, chequeId?: string) => {
    if (!user) {
      throw new Error('Usuario no autenticado');
    }

    try {
      const { data, error } = await supabase.functions.invoke('process-cheque-ocr', {
        body: {
          imageData,
          chequeId
        }
      });

      if (error) throw error;
      
      // Refresh cheques after processing
      await fetchCheques();
      await fetchStats();
      
      return data;
    } catch (error) {
      console.error('Error processing OCR:', error);
      throw error;
    }
  };

  // Add cheque
  const addCheque = async (chequeData: Partial<Cheque>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('cheques')
        .insert({
          user_id: user.id,
          numero_cheque: chequeData.numero_cheque || '',
          banco: chequeData.banco || '',
          monto: chequeData.monto || 0,
          tipo_cheque: chequeData.tipo_cheque || 'cliente',
          estado: chequeData.estado || 'pendiente',
          intentos_procesamiento: chequeData.intentos_procesamiento || 0,
          procesado_en_backend: chequeData.procesado_en_backend || false,
          sincronizado: chequeData.sincronizado !== undefined ? chequeData.sincronizado : true,
          ...chequeData,
        })
        .select()
        .single();

      if (error) throw error;
      
      setCheques(prev => [data as Cheque, ...prev]);
      await fetchStats();
      
      toast({
        title: "Éxito",
        description: "Cheque agregado correctamente",
      });
      
      return data;
    } catch (error) {
      console.error('Error adding cheque:', error);
      toast({
        title: "Error",
        description: "No se pudo agregar el cheque",
        variant: "destructive",
      });
      throw error;
    }
  };

  // Update cheque
  const updateCheque = async (id: string, updates: Partial<Cheque>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('cheques')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      
      setCheques(prev => prev.map(c => c.id === id ? data as Cheque : c));
      await fetchStats();
      
      toast({
        title: "Éxito",
        description: "Cheque actualizado correctamente",
      });
      
      return data;
    } catch (error) {
      console.error('Error updating cheque:', error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el cheque",
        variant: "destructive",
      });
      throw error;
    }
  };

  // Delete cheque
  const deleteCheque = async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('cheques')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
      
      setCheques(prev => prev.filter(c => c.id !== id));
      await fetchStats();
      
      toast({
        title: "Éxito",
        description: "Cheque eliminado correctamente",
      });
    } catch (error) {
      console.error('Error deleting cheque:', error);
      toast({
        title: "Error",
        description: "No se pudo eliminar el cheque",
        variant: "destructive",
      });
      throw error;
    }
  };

  // Batch update cheques
  const batchUpdateCheques = async (ids: string[], updates: Partial<Cheque>) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('cheques')
        .update(updates)
        .in('id', ids)
        .eq('user_id', user.id);

      if (error) throw error;
      
      setCheques(prev => prev.map(c => 
        ids.includes(c.id) ? { ...c, ...updates } : c
      ));
      await fetchStats();
      
      toast({
        title: "Éxito",
        description: `${ids.length} cheque(s) actualizado(s) correctamente`,
      });
    } catch (error) {
      console.error('Error batch updating cheques:', error);
      toast({
        title: "Error",
        description: "No se pudieron actualizar los cheques",
        variant: "destructive",
      });
      throw error;
    }
  };

  // Get filtered cheques
  const getFilteredCheques = () => {
    return cheques.filter(cheque => {
      const matchesFilter = filter === 'all' || cheque.tipo_cheque === filter;
      const matchesSearch = !searchTerm || 
        cheque.numero_cheque.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cheque.banco.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cheque.beneficiario?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cheque.monto.toString().includes(searchTerm);
      
      return matchesFilter && matchesSearch;
    });
  };

  useEffect(() => {
    if (user) {
      fetchCheques();
      fetchStats();
    }
  }, [user]);

  // Set up real-time updates
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('cheques-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'cheques',
          filter: `user_id=eq.${user.id}`
        },
        () => {
          fetchCheques();
          fetchStats();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return {
    cheques: getFilteredCheques(),
    stats,
    loading,
    filter,
    searchTerm,
    setFilter,
    setSearchTerm,
    addCheque,
    updateCheque,
    deleteCheque,
    batchUpdateCheques,
    processChequeOCR,
    refresh: () => {
      fetchCheques();
      fetchStats();
    }
  };
};