-- Create schema for cheque management system
CREATE TABLE IF NOT EXISTS public.cheques (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  numero_cheque VARCHAR(50) NOT NULL,
  banco VARCHAR(100) NOT NULL,
  codigo_banco VARCHAR(10),
  fecha_emision DATE,
  fecha_vencimiento DATE,
  monto DECIMAL(12,2) NOT NULL,
  beneficiario VARCHAR(200),
  ruc_cedula_beneficiario VARCHAR(20),
  cuenta_bancaria VARCHAR(50),
  tipo_cheque VARCHAR(20) DEFAULT 'cliente', -- 'cliente' or 'proveedor'
  estado VARCHAR(20) DEFAULT 'pendiente', -- 'pendiente', 'procesado', 'rechazado', 'cobrado'
  imagen_url TEXT,
  imagen_encrypted TEXT, -- Encrypted image data
  datos_ocr JSONB, -- Raw OCR results
  confianza_ocr DECIMAL(3,2), -- OCR confidence 0.00-1.00
  validaciones JSONB, -- Validation results
  intentos_procesamiento INTEGER DEFAULT 0,
  procesado_en_backend BOOLEAN DEFAULT false,
  sincronizado BOOLEAN DEFAULT true,
  notas TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for OCR processing queue
CREATE TABLE IF NOT EXISTS public.ocr_queue (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  cheque_id UUID,
  imagen_data TEXT NOT NULL, -- Base64 image data
  estado VARCHAR(20) DEFAULT 'pendiente', -- 'pendiente', 'procesando', 'completado', 'error'
  intentos INTEGER DEFAULT 0,
  resultado JSONB,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  processed_at TIMESTAMP WITH TIME ZONE
);

-- Create table for offline data sync
CREATE TABLE IF NOT EXISTS public.sync_queue (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  data_type VARCHAR(50) NOT NULL, -- 'cheque', 'image', etc.
  data_payload JSONB NOT NULL,
  sync_status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'syncing', 'completed', 'failed'
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  synced_at TIMESTAMP WITH TIME ZONE
);

-- Create user profiles table for authentication
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  email VARCHAR(255),
  nombre VARCHAR(100),
  empresa VARCHAR(200),
  configuraciones JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.cheques ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ocr_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sync_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for cheques
CREATE POLICY "Users can manage their own cheques" 
ON public.cheques 
FOR ALL 
USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own OCR queue" 
ON public.ocr_queue 
FOR ALL 
USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own sync queue" 
ON public.sync_queue 
FOR ALL 
USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own profile" 
ON public.user_profiles 
FOR ALL 
USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX idx_cheques_user_id ON public.cheques(user_id);
CREATE INDEX idx_cheques_estado ON public.cheques(estado);
CREATE INDEX idx_cheques_fecha_emision ON public.cheques(fecha_emision);
CREATE INDEX idx_ocr_queue_estado ON public.ocr_queue(estado);
CREATE INDEX idx_sync_queue_status ON public.sync_queue(sync_status);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for timestamp updates
CREATE TRIGGER update_cheques_updated_at
BEFORE UPDATE ON public.cheques
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at
BEFORE UPDATE ON public.user_profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function for cheque statistics
CREATE OR REPLACE FUNCTION public.get_cheque_stats(p_user_id UUID)
RETURNS JSONB AS $$
DECLARE
  stats JSONB;
BEGIN
  SELECT jsonb_build_object(
    'total_cheques', COUNT(*),
    'total_monto', COALESCE(SUM(monto), 0),
    'cheques_pendientes', COUNT(*) FILTER (WHERE estado = 'pendiente'),
    'cheques_procesados', COUNT(*) FILTER (WHERE estado = 'procesado'),
    'cheques_cobrados', COUNT(*) FILTER (WHERE estado = 'cobrado'),
    'monto_pendiente', COALESCE(SUM(monto) FILTER (WHERE estado = 'pendiente'), 0),
    'banco_mas_comun', (
      SELECT banco 
      FROM public.cheques 
      WHERE user_id = p_user_id 
      GROUP BY banco 
      ORDER BY COUNT(*) DESC 
      LIMIT 1
    ),
    'promedio_por_dia', (
      SELECT COALESCE(AVG(daily_count), 0)
      FROM (
        SELECT COUNT(*) as daily_count
        FROM public.cheques
        WHERE user_id = p_user_id
        AND created_at >= CURRENT_DATE - INTERVAL '30 days'
        GROUP BY DATE(created_at)
      ) daily_stats
    )
  ) INTO stats
  FROM public.cheques
  WHERE user_id = p_user_id;
  
  RETURN stats;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;