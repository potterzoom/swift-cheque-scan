import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

interface OfflineData {
  id: string;
  type: 'cheque' | 'image';
  data: any;
  timestamp: number;
}

export const useOfflineSync = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingSync, setPendingSync] = useState<OfflineData[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      toast({
        title: "Conexión restaurada",
        description: "Sincronizando datos pendientes...",
      });
      syncPendingData();
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast({
        title: "Sin conexión",
        description: "Los datos se guardarán localmente",
        variant: "destructive",
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Load pending data from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('pending_sync_data');
    if (stored) {
      try {
        const data = JSON.parse(stored);
        setPendingSync(data);
      } catch (error) {
        console.error('Error loading offline data:', error);
      }
    }
  }, []);

  // Save data offline
  const saveOfflineData = (type: 'cheque' | 'image', data: any) => {
    const offlineItem: OfflineData = {
      id: crypto.randomUUID(),
      type,
      data,
      timestamp: Date.now()
    };

    const newPendingData = [...pendingSync, offlineItem];
    setPendingSync(newPendingData);
    localStorage.setItem('pending_sync_data', JSON.stringify(newPendingData));

    toast({
      title: "Datos guardados offline",
      description: "Se sincronizarán cuando recupere la conexión",
    });

    return offlineItem.id;
  };

  // Sync pending data to server
  const syncPendingData = async () => {
    if (!user || !isOnline || pendingSync.length === 0 || isSyncing) return;

    setIsSyncing(true);

    try {
      const syncPromises = pendingSync.map(async (item) => {
        try {
          const { error } = await supabase
            .from('sync_queue')
            .insert({
              user_id: user.id,
              data_type: item.type,
              data_payload: item.data,
              sync_status: 'pending'
            });

          if (error) throw error;
          return item.id;
        } catch (error) {
          console.error(`Error syncing item ${item.id}:`, error);
          return null;
        }
      });

      const syncedIds = (await Promise.all(syncPromises)).filter(Boolean);
      
      // Remove synced items
      const remainingData = pendingSync.filter(item => !syncedIds.includes(item.id));
      setPendingSync(remainingData);
      localStorage.setItem('pending_sync_data', JSON.stringify(remainingData));

      if (syncedIds.length > 0) {
        toast({
          title: "Sincronización completada",
          description: `${syncedIds.length} elemento(s) sincronizado(s)`,
        });
      }
    } catch (error) {
      console.error('Error during sync:', error);
      toast({
        title: "Error de sincronización",
        description: "Algunos datos no se pudieron sincronizar",
        variant: "destructive",
      });
    } finally {
      setIsSyncing(false);
    }
  };

  // Process cheque offline
  const processChequeOffline = (imageData: string, chequeData?: any) => {
    const offlineData = {
      imageData,
      chequeData,
      action: 'process_cheque',
      timestamp: Date.now()
    };

    return saveOfflineData('cheque', offlineData);
  };

  // Clear all offline data
  const clearOfflineData = () => {
    setPendingSync([]);
    localStorage.removeItem('pending_sync_data');
  };

  return {
    isOnline,
    pendingSync: pendingSync.length,
    isSyncing,
    saveOfflineData,
    processChequeOffline,
    syncPendingData,
    clearOfflineData
  };
};