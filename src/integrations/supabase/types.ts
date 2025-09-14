export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      addon_services: {
        Row: {
          base_price: number
          category: string
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          pricing_model: string | null
        }
        Insert: {
          base_price: number
          category: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          pricing_model?: string | null
        }
        Update: {
          base_price?: number
          category?: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          pricing_model?: string | null
        }
        Relationships: []
      }
      alerts: {
        Row: {
          alert_type: string
          created_at: string
          id: string
          is_resolved: boolean | null
          message: string
          resolved_at: string | null
          server_id: string | null
        }
        Insert: {
          alert_type: string
          created_at?: string
          id?: string
          is_resolved?: boolean | null
          message: string
          resolved_at?: string | null
          server_id?: string | null
        }
        Update: {
          alert_type?: string
          created_at?: string
          id?: string
          is_resolved?: boolean | null
          message?: string
          resolved_at?: string | null
          server_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "alerts_server_id_fkey"
            columns: ["server_id"]
            isOneToOne: false
            referencedRelation: "servers"
            referencedColumns: ["id"]
          },
        ]
      }
      alianzas: {
        Row: {
          activo: boolean | null
          contacto_email: string | null
          contacto_telefono: string | null
          created_at: string
          descripcion: string | null
          id: string
          nombre_alianza: string
          servicios_ofrecidos: string[] | null
          tipo_alianza: string
        }
        Insert: {
          activo?: boolean | null
          contacto_email?: string | null
          contacto_telefono?: string | null
          created_at?: string
          descripcion?: string | null
          id?: string
          nombre_alianza: string
          servicios_ofrecidos?: string[] | null
          tipo_alianza: string
        }
        Update: {
          activo?: boolean | null
          contacto_email?: string | null
          contacto_telefono?: string | null
          created_at?: string
          descripcion?: string | null
          id?: string
          nombre_alianza?: string
          servicios_ofrecidos?: string[] | null
          tipo_alianza?: string
        }
        Relationships: []
      }
      analisis_abc: {
        Row: {
          clasificacion: string
          created_at: string
          fecha_calculo: string
          id: string
          porcentaje_acumulado: number
          producto_id: string
          user_id: string
          valor_venta_anual: number
        }
        Insert: {
          clasificacion: string
          created_at?: string
          fecha_calculo?: string
          id?: string
          porcentaje_acumulado?: number
          producto_id: string
          user_id: string
          valor_venta_anual?: number
        }
        Update: {
          clasificacion?: string
          created_at?: string
          fecha_calculo?: string
          id?: string
          porcentaje_acumulado?: number
          producto_id?: string
          user_id?: string
          valor_venta_anual?: number
        }
        Relationships: [
          {
            foreignKeyName: "analisis_abc_producto_id_fkey"
            columns: ["producto_id"]
            isOneToOne: false
            referencedRelation: "productos"
            referencedColumns: ["id"]
          },
        ]
      }
      appointments: {
        Row: {
          appointment_date: string
          appointment_type: string | null
          created_at: string | null
          doctor_id: string
          id: string
          notes: string | null
          patient_id: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          appointment_date: string
          appointment_type?: string | null
          created_at?: string | null
          doctor_id: string
          id?: string
          notes?: string | null
          patient_id: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          appointment_date?: string
          appointment_type?: string | null
          created_at?: string | null
          doctor_id?: string
          id?: string
          notes?: string | null
          patient_id?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "appointments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          access_reason: string | null
          action_type: string
          changes_made: Json | null
          compliance_flags: Json | null
          id: string
          ip_address: unknown | null
          patient_id: number | null
          record_id: number | null
          session_id: string | null
          table_name: string
          timestamp: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          access_reason?: string | null
          action_type: string
          changes_made?: Json | null
          compliance_flags?: Json | null
          id?: string
          ip_address?: unknown | null
          patient_id?: number | null
          record_id?: number | null
          session_id?: string | null
          table_name: string
          timestamp?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          access_reason?: string | null
          action_type?: string
          changes_made?: Json | null
          compliance_flags?: Json | null
          id?: string
          ip_address?: unknown | null
          patient_id?: number | null
          record_id?: number | null
          session_id?: string | null
          table_name?: string
          timestamp?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      backup_schedules: {
        Row: {
          backup_location: string | null
          backup_size_bytes: number | null
          backup_status: string | null
          backup_type: string
          created_at: string | null
          id: string
          last_backup_date: string | null
          next_backup_date: string | null
          retention_years: number | null
        }
        Insert: {
          backup_location?: string | null
          backup_size_bytes?: number | null
          backup_status?: string | null
          backup_type: string
          created_at?: string | null
          id?: string
          last_backup_date?: string | null
          next_backup_date?: string | null
          retention_years?: number | null
        }
        Update: {
          backup_location?: string | null
          backup_size_bytes?: number | null
          backup_status?: string | null
          backup_type?: string
          created_at?: string | null
          id?: string
          last_backup_date?: string | null
          next_backup_date?: string | null
          retention_years?: number | null
        }
        Relationships: []
      }
      calendario_agricola: {
        Row: {
          created_at: string
          id: string
          mejor_momento_venta: string | null
          precio_historico_promedio: number | null
          producto: string
          region: string
          temporada_cosecha_fin: string | null
          temporada_cosecha_inicio: string | null
          temporada_siembra_fin: string | null
          temporada_siembra_inicio: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          mejor_momento_venta?: string | null
          precio_historico_promedio?: number | null
          producto: string
          region: string
          temporada_cosecha_fin?: string | null
          temporada_cosecha_inicio?: string | null
          temporada_siembra_fin?: string | null
          temporada_siembra_inicio?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          mejor_momento_venta?: string | null
          precio_historico_promedio?: number | null
          producto?: string
          region?: string
          temporada_cosecha_fin?: string | null
          temporada_cosecha_inicio?: string | null
          temporada_siembra_fin?: string | null
          temporada_siembra_inicio?: string | null
        }
        Relationships: []
      }
      capacity_controls: {
        Row: {
          covid_protocols_enabled: boolean | null
          created_at: string
          current_capacity: number | null
          event_id: string
          id: string
          mask_required: boolean | null
          max_allowed_capacity: number
          msp_guidelines_version: string | null
          updated_at: string
          vaccination_required: boolean | null
        }
        Insert: {
          covid_protocols_enabled?: boolean | null
          created_at?: string
          current_capacity?: number | null
          event_id: string
          id?: string
          mask_required?: boolean | null
          max_allowed_capacity: number
          msp_guidelines_version?: string | null
          updated_at?: string
          vaccination_required?: boolean | null
        }
        Update: {
          covid_protocols_enabled?: boolean | null
          created_at?: string
          current_capacity?: number | null
          event_id?: string
          id?: string
          mask_required?: boolean | null
          max_allowed_capacity?: number
          msp_guidelines_version?: string | null
          updated_at?: string
          vaccination_required?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "capacity_controls_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      categorias: {
        Row: {
          created_at: string
          descripcion: string | null
          icono: string | null
          id: string
          nombre: string
          requiere_registro_sanitario: boolean | null
          user_id: string
        }
        Insert: {
          created_at?: string
          descripcion?: string | null
          icono?: string | null
          id?: string
          nombre: string
          requiere_registro_sanitario?: boolean | null
          user_id: string
        }
        Update: {
          created_at?: string
          descripcion?: string | null
          icono?: string | null
          id?: string
          nombre?: string
          requiere_registro_sanitario?: boolean | null
          user_id?: string
        }
        Relationships: []
      }
      clientes: {
        Row: {
          apellido: string | null
          cedula: string
          created_at: string
          credito_usado: number | null
          descuento_porcentaje: number | null
          direccion: string | null
          email: string | null
          es_cliente_frecuente: boolean | null
          id: string
          limite_credito: number | null
          nombre: string
          telefono: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          apellido?: string | null
          cedula: string
          created_at?: string
          credito_usado?: number | null
          descuento_porcentaje?: number | null
          direccion?: string | null
          email?: string | null
          es_cliente_frecuente?: boolean | null
          id?: string
          limite_credito?: number | null
          nombre: string
          telefono?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          apellido?: string | null
          cedula?: string
          created_at?: string
          credito_usado?: number | null
          descuento_porcentaje?: number | null
          direccion?: string | null
          email?: string | null
          es_cliente_frecuente?: boolean | null
          id?: string
          limite_credito?: number | null
          nombre?: string
          telefono?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      compliance_reports: {
        Row: {
          compliance_status: string | null
          file_path: string | null
          generated_at: string | null
          generated_by: string | null
          id: string
          report_data: Json
          report_period_end: string
          report_period_start: string
          report_type: string
        }
        Insert: {
          compliance_status?: string | null
          file_path?: string | null
          generated_at?: string | null
          generated_by?: string | null
          id?: string
          report_data: Json
          report_period_end: string
          report_period_start: string
          report_type: string
        }
        Update: {
          compliance_status?: string | null
          file_path?: string | null
          generated_at?: string | null
          generated_by?: string | null
          id?: string
          report_data?: Json
          report_period_end?: string
          report_period_start?: string
          report_type?: string
        }
        Relationships: []
      }
      configuracion_comisiones: {
        Row: {
          activo: boolean | null
          created_at: string
          id: string
          porcentaje_comision: number | null
          servicios_adicionales: string[] | null
          tipo_usuario: string
          transacciones_gratuitas: number | null
        }
        Insert: {
          activo?: boolean | null
          created_at?: string
          id?: string
          porcentaje_comision?: number | null
          servicios_adicionales?: string[] | null
          tipo_usuario: string
          transacciones_gratuitas?: number | null
        }
        Update: {
          activo?: boolean | null
          created_at?: string
          id?: string
          porcentaje_comision?: number | null
          servicios_adicionales?: string[] | null
          tipo_usuario?: string
          transacciones_gratuitas?: number | null
        }
        Relationships: []
      }
      configuracion_sistema: {
        Row: {
          clave: string
          created_at: string
          descripcion: string | null
          id: string
          updated_at: string
          user_id: string
          valor: string
        }
        Insert: {
          clave: string
          created_at?: string
          descripcion?: string | null
          id?: string
          updated_at?: string
          user_id: string
          valor: string
        }
        Update: {
          clave?: string
          created_at?: string
          descripcion?: string | null
          id?: string
          updated_at?: string
          user_id?: string
          valor?: string
        }
        Relationships: []
      }
      configuration_audit: {
        Row: {
          action: string
          category: string
          config_key: string
          created_at: string
          id: string
          ip_address: unknown | null
          new_value: Json | null
          old_value: Json | null
          user_agent: string | null
          user_id: string
        }
        Insert: {
          action: string
          category: string
          config_key: string
          created_at?: string
          id?: string
          ip_address?: unknown | null
          new_value?: Json | null
          old_value?: Json | null
          user_agent?: string | null
          user_id: string
        }
        Update: {
          action?: string
          category?: string
          config_key?: string
          created_at?: string
          id?: string
          ip_address?: unknown | null
          new_value?: Json | null
          old_value?: Json | null
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      daily_counters: {
        Row: {
          appointments_completed: number | null
          appointments_scheduled: number | null
          counter_date: string | null
          created_at: string | null
          id: string
          medical_alerts: number | null
          patients_critical: number | null
          patients_new: number | null
          patients_total: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          appointments_completed?: number | null
          appointments_scheduled?: number | null
          counter_date?: string | null
          created_at?: string | null
          id?: string
          medical_alerts?: number | null
          patients_critical?: number | null
          patients_new?: number | null
          patients_total?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          appointments_completed?: number | null
          appointments_scheduled?: number | null
          counter_date?: string | null
          created_at?: string | null
          id?: string
          medical_alerts?: number | null
          patients_critical?: number | null
          patients_new?: number | null
          patients_total?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      data_encryption_keys: {
        Row: {
          created_at: string | null
          expires_at: string | null
          id: string
          is_active: boolean | null
          key_name: string
          key_purpose: string
          key_version: number
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          key_name: string
          key_purpose: string
          key_version?: number
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          key_name?: string
          key_purpose?: string
          key_version?: number
        }
        Relationships: []
      }
      data_exports: {
        Row: {
          created_at: string | null
          download_url: string | null
          downloaded_at: string | null
          expires_at: string | null
          export_format: string
          export_type: string
          file_path: string | null
          id: string
          qr_code_data: string | null
          two_factor_verified: boolean | null
          user_id: string
          verification_code: string | null
        }
        Insert: {
          created_at?: string | null
          download_url?: string | null
          downloaded_at?: string | null
          expires_at?: string | null
          export_format?: string
          export_type: string
          file_path?: string | null
          id?: string
          qr_code_data?: string | null
          two_factor_verified?: boolean | null
          user_id: string
          verification_code?: string | null
        }
        Update: {
          created_at?: string | null
          download_url?: string | null
          downloaded_at?: string | null
          expires_at?: string | null
          export_format?: string
          export_type?: string
          file_path?: string | null
          id?: string
          qr_code_data?: string | null
          two_factor_verified?: boolean | null
          user_id?: string
          verification_code?: string | null
        }
        Relationships: []
      }
      datos_offline: {
        Row: {
          created_at: string
          datos_json: Json
          fotos_comprimidas: string[] | null
          id: string
          sincronizado: boolean | null
          sincronizado_at: string | null
          tipo_dato: string
          usuario_id: string
        }
        Insert: {
          created_at?: string
          datos_json: Json
          fotos_comprimidas?: string[] | null
          id?: string
          sincronizado?: boolean | null
          sincronizado_at?: string | null
          tipo_dato: string
          usuario_id: string
        }
        Update: {
          created_at?: string
          datos_json?: Json
          fotos_comprimidas?: string[] | null
          id?: string
          sincronizado?: boolean | null
          sincronizado_at?: string | null
          tipo_dato?: string
          usuario_id?: string
        }
        Relationships: []
      }
      datos_sincronizacion: {
        Row: {
          created_at: string
          datos: Json
          id: string
          intentos_sincronizacion: number | null
          operacion: string
          sincronizado: boolean | null
          tabla_destino: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          datos: Json
          id?: string
          intentos_sincronizacion?: number | null
          operacion: string
          sincronizado?: boolean | null
          tabla_destino: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          datos?: Json
          id?: string
          intentos_sincronizacion?: number | null
          operacion?: string
          sincronizado?: boolean | null
          tabla_destino?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      electronic_invoices: {
        Row: {
          access_key: string
          authorization_number: string | null
          created_at: string
          customer_identification: string
          customer_name: string
          event_id: string | null
          id: string
          invoice_number: string
          issue_date: string
          iva: number | null
          sri_status: string | null
          subtotal_0: number | null
          subtotal_12: number | null
          total: number
          user_id: string
          xml_document: string | null
        }
        Insert: {
          access_key: string
          authorization_number?: string | null
          created_at?: string
          customer_identification: string
          customer_name: string
          event_id?: string | null
          id?: string
          invoice_number: string
          issue_date: string
          iva?: number | null
          sri_status?: string | null
          subtotal_0?: number | null
          subtotal_12?: number | null
          total: number
          user_id: string
          xml_document?: string | null
        }
        Update: {
          access_key?: string
          authorization_number?: string | null
          created_at?: string
          customer_identification?: string
          customer_name?: string
          event_id?: string | null
          id?: string
          invoice_number?: string
          issue_date?: string
          iva?: number | null
          sri_status?: string | null
          subtotal_0?: number | null
          subtotal_12?: number | null
          total?: number
          user_id?: string
          xml_document?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "electronic_invoices_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      empresas: {
        Row: {
          created_at: string
          direccion: string | null
          email: string | null
          es_contribuyente_especial: boolean | null
          id: string
          nombre_comercial: string | null
          obligado_contabilidad: boolean | null
          razon_social: string
          ruc: string
          telefono: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          direccion?: string | null
          email?: string | null
          es_contribuyente_especial?: boolean | null
          id?: string
          nombre_comercial?: string | null
          obligado_contabilidad?: boolean | null
          razon_social: string
          ruc: string
          telefono?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          direccion?: string | null
          email?: string | null
          es_contribuyente_especial?: boolean | null
          id?: string
          nombre_comercial?: string | null
          obligado_contabilidad?: boolean | null
          razon_social?: string
          ruc?: string
          telefono?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      encrypted_medical_data: {
        Row: {
          created_at: string | null
          created_by: string | null
          data_type: string
          encrypted_data: string
          encryption_key_id: string
          id: string
          last_accessed: string | null
          patient_id: number
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          data_type: string
          encrypted_data: string
          encryption_key_id: string
          id?: string
          last_accessed?: string | null
          patient_id: number
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          data_type?: string
          encrypted_data?: string
          encryption_key_id?: string
          id?: string
          last_accessed?: string | null
          patient_id?: number
        }
        Relationships: []
      }
      event_addons: {
        Row: {
          addon_id: string
          created_at: string
          event_id: string
          id: string
          quantity: number | null
          status: string | null
          total_price: number
          user_id: string
        }
        Insert: {
          addon_id: string
          created_at?: string
          event_id: string
          id?: string
          quantity?: number | null
          status?: string | null
          total_price: number
          user_id: string
        }
        Update: {
          addon_id?: string
          created_at?: string
          event_id?: string
          id?: string
          quantity?: number | null
          status?: string | null
          total_price?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "event_addons_addon_id_fkey"
            columns: ["addon_id"]
            isOneToOne: false
            referencedRelation: "addon_services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_addons_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          created_at: string
          current_attendance: number | null
          description: string | null
          end_time: string | null
          event_date: string
          event_type: string | null
          id: string
          location: string | null
          max_capacity: number | null
          msp_permit_number: string | null
          requires_covid_protocols: boolean | null
          sri_authorization: string | null
          start_time: string | null
          status: string | null
          title: string
          updated_at: string
          user_id: string
          virtual_platform_url: string | null
        }
        Insert: {
          created_at?: string
          current_attendance?: number | null
          description?: string | null
          end_time?: string | null
          event_date: string
          event_type?: string | null
          id?: string
          location?: string | null
          max_capacity?: number | null
          msp_permit_number?: string | null
          requires_covid_protocols?: boolean | null
          sri_authorization?: string | null
          start_time?: string | null
          status?: string | null
          title: string
          updated_at?: string
          user_id: string
          virtual_platform_url?: string | null
        }
        Update: {
          created_at?: string
          current_attendance?: number | null
          description?: string | null
          end_time?: string | null
          event_date?: string
          event_type?: string | null
          id?: string
          location?: string | null
          max_capacity?: number | null
          msp_permit_number?: string | null
          requires_covid_protocols?: boolean | null
          sri_authorization?: string | null
          start_time?: string | null
          status?: string | null
          title?: string
          updated_at?: string
          user_id?: string
          virtual_platform_url?: string | null
        }
        Relationships: []
      }
      haciendas: {
        Row: {
          activa: boolean | null
          contacto_email: string | null
          contacto_telefono: string | null
          created_at: string
          hectareas: number | null
          id: string
          nombre: string
          propietario_id: string
          provincia: string
          tipo_cultivo: string | null
          ubicacion: string
          updated_at: string
        }
        Insert: {
          activa?: boolean | null
          contacto_email?: string | null
          contacto_telefono?: string | null
          created_at?: string
          hectareas?: number | null
          id?: string
          nombre: string
          propietario_id: string
          provincia: string
          tipo_cultivo?: string | null
          ubicacion: string
          updated_at?: string
        }
        Update: {
          activa?: boolean | null
          contacto_email?: string | null
          contacto_telefono?: string | null
          created_at?: string
          hectareas?: number | null
          id?: string
          nombre?: string
          propietario_id?: string
          provincia?: string
          tipo_cultivo?: string | null
          ubicacion?: string
          updated_at?: string
        }
        Relationships: []
      }
      horarios_disponibles: {
        Row: {
          activo: boolean | null
          capacidad_actual: number | null
          capacidad_maxima: number | null
          created_at: string
          fecha_hora: string
          id: string
          servicio_id: string
        }
        Insert: {
          activo?: boolean | null
          capacidad_actual?: number | null
          capacidad_maxima?: number | null
          created_at?: string
          fecha_hora: string
          id?: string
          servicio_id: string
        }
        Update: {
          activo?: boolean | null
          capacidad_actual?: number | null
          capacidad_maxima?: number | null
          created_at?: string
          fecha_hora?: string
          id?: string
          servicio_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_horarios_servicio"
            columns: ["servicio_id"]
            isOneToOne: false
            referencedRelation: "servicios"
            referencedColumns: ["id"]
          },
        ]
      }
      inventario_detalles: {
        Row: {
          created_at: string
          diferencia: number | null
          id: string
          inventario_id: string | null
          observaciones: string | null
          producto_id: string | null
          stock_fisico: number | null
          stock_sistema: number
        }
        Insert: {
          created_at?: string
          diferencia?: number | null
          id?: string
          inventario_id?: string | null
          observaciones?: string | null
          producto_id?: string | null
          stock_fisico?: number | null
          stock_sistema: number
        }
        Update: {
          created_at?: string
          diferencia?: number | null
          id?: string
          inventario_id?: string | null
          observaciones?: string | null
          producto_id?: string | null
          stock_fisico?: number | null
          stock_sistema?: number
        }
        Relationships: [
          {
            foreignKeyName: "inventario_detalles_inventario_id_fkey"
            columns: ["inventario_id"]
            isOneToOne: false
            referencedRelation: "inventarios_fisicos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventario_detalles_producto_id_fkey"
            columns: ["producto_id"]
            isOneToOne: false
            referencedRelation: "productos"
            referencedColumns: ["id"]
          },
        ]
      }
      inventarios_fisicos: {
        Row: {
          created_at: string
          estado: string | null
          fecha_cierre: string | null
          fecha_inicio: string
          id: string
          nombre: string
          observaciones: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          estado?: string | null
          fecha_cierre?: string | null
          fecha_inicio: string
          id?: string
          nombre: string
          observaciones?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          estado?: string | null
          fecha_cierre?: string | null
          fecha_inicio?: string
          id?: string
          nombre?: string
          observaciones?: string | null
          user_id?: string
        }
        Relationships: []
      }
      invoice_sequences: {
        Row: {
          created_at: string
          current_sequence: number
          document_type: string
          emission_point: string
          establishment_code: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_sequence?: number
          document_type: string
          emission_point?: string
          establishment_code?: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_sequence?: number
          document_type?: string
          emission_point?: string
          establishment_code?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      invoice_templates: {
        Row: {
          created_at: string
          css_styles: string | null
          html_content: string | null
          id: string
          is_default: boolean | null
          logo_url: string | null
          name: string
          template_type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          css_styles?: string | null
          html_content?: string | null
          id?: string
          is_default?: boolean | null
          logo_url?: string | null
          name: string
          template_type?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          css_styles?: string | null
          html_content?: string | null
          id?: string
          is_default?: boolean | null
          logo_url?: string | null
          name?: string
          template_type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      jornaleros: {
        Row: {
          apellido: string
          cedula: string
          created_at: string
          direccion: string | null
          edad: number | null
          estado: Database["public"]["Enums"]["estado_jornalero"] | null
          experiencia_anos: number | null
          fecha_ultimo_trabajo: string | null
          foto_url: string | null
          habilidades: string[] | null
          huella_dactilar: string | null
          id: string
          nombre: string
          rating: number | null
          salario_diario_promedio: number | null
          telefono: string | null
          ubicacion_actual: string | null
          updated_at: string
          user_id: string | null
          verificado_biometricamente: boolean | null
        }
        Insert: {
          apellido: string
          cedula: string
          created_at?: string
          direccion?: string | null
          edad?: number | null
          estado?: Database["public"]["Enums"]["estado_jornalero"] | null
          experiencia_anos?: number | null
          fecha_ultimo_trabajo?: string | null
          foto_url?: string | null
          habilidades?: string[] | null
          huella_dactilar?: string | null
          id?: string
          nombre: string
          rating?: number | null
          salario_diario_promedio?: number | null
          telefono?: string | null
          ubicacion_actual?: string | null
          updated_at?: string
          user_id?: string | null
          verificado_biometricamente?: boolean | null
        }
        Update: {
          apellido?: string
          cedula?: string
          created_at?: string
          direccion?: string | null
          edad?: number | null
          estado?: Database["public"]["Enums"]["estado_jornalero"] | null
          experiencia_anos?: number | null
          fecha_ultimo_trabajo?: string | null
          foto_url?: string | null
          habilidades?: string[] | null
          huella_dactilar?: string | null
          id?: string
          nombre?: string
          rating?: number | null
          salario_diario_promedio?: number | null
          telefono?: string | null
          ubicacion_actual?: string | null
          updated_at?: string
          user_id?: string | null
          verificado_biometricamente?: boolean | null
        }
        Relationships: []
      }
      load_balancer_configs: {
        Row: {
          algorithm: string
          created_at: string
          health_check_interval: number | null
          id: string
          is_active: boolean | null
          max_retries: number | null
          timeout: number | null
          updated_at: string
        }
        Insert: {
          algorithm?: string
          created_at?: string
          health_check_interval?: number | null
          id?: string
          is_active?: boolean | null
          max_retries?: number | null
          timeout?: number | null
          updated_at?: string
        }
        Update: {
          algorithm?: string
          created_at?: string
          health_check_interval?: number | null
          id?: string
          is_active?: boolean | null
          max_retries?: number | null
          timeout?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      location_history: {
        Row: {
          accuracy: number | null
          altitude: number | null
          anomaly_reason: string | null
          created_at: string | null
          heading: number | null
          id: string
          is_anomaly: boolean | null
          latitude: number
          location_source: string | null
          longitude: number
          speed: number | null
          travel_mode_active: boolean | null
          user_id: string
        }
        Insert: {
          accuracy?: number | null
          altitude?: number | null
          anomaly_reason?: string | null
          created_at?: string | null
          heading?: number | null
          id?: string
          is_anomaly?: boolean | null
          latitude: number
          location_source?: string | null
          longitude: number
          speed?: number | null
          travel_mode_active?: boolean | null
          user_id: string
        }
        Update: {
          accuracy?: number | null
          altitude?: number | null
          anomaly_reason?: string | null
          created_at?: string | null
          heading?: number | null
          id?: string
          is_anomaly?: boolean | null
          latitude?: number
          location_source?: string | null
          longitude?: number
          speed?: number | null
          travel_mode_active?: boolean | null
          user_id?: string
        }
        Relationships: []
      }
      medical_audit_logs: {
        Row: {
          access_reason: string | null
          action_type: string
          changes_made: Json | null
          id: string
          ip_address: unknown | null
          patient_id: number | null
          record_id: number | null
          table_name: string
          timestamp: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          access_reason?: string | null
          action_type: string
          changes_made?: Json | null
          id?: string
          ip_address?: unknown | null
          patient_id?: number | null
          record_id?: number | null
          table_name: string
          timestamp?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          access_reason?: string | null
          action_type?: string
          changes_made?: Json | null
          id?: string
          ip_address?: unknown | null
          patient_id?: number | null
          record_id?: number | null
          table_name?: string
          timestamp?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      medical_records: {
        Row: {
          blood_pressure: string | null
          chief_complaint: string | null
          created_at: string | null
          diagnosis: string[] | null
          digital_signature: string | null
          doctor_id: string
          heart_rate: number | null
          height: number | null
          id: string
          patient_id: string
          physical_examination: string | null
          prescriptions: Json | null
          present_illness: string | null
          previous_version_id: string | null
          signature_timestamp: string | null
          temperature: number | null
          treatment_plan: string | null
          updated_at: string | null
          version: number | null
          visit_date: string | null
          weight: number | null
        }
        Insert: {
          blood_pressure?: string | null
          chief_complaint?: string | null
          created_at?: string | null
          diagnosis?: string[] | null
          digital_signature?: string | null
          doctor_id: string
          heart_rate?: number | null
          height?: number | null
          id?: string
          patient_id: string
          physical_examination?: string | null
          prescriptions?: Json | null
          present_illness?: string | null
          previous_version_id?: string | null
          signature_timestamp?: string | null
          temperature?: number | null
          treatment_plan?: string | null
          updated_at?: string | null
          version?: number | null
          visit_date?: string | null
          weight?: number | null
        }
        Update: {
          blood_pressure?: string | null
          chief_complaint?: string | null
          created_at?: string | null
          diagnosis?: string[] | null
          digital_signature?: string | null
          doctor_id?: string
          heart_rate?: number | null
          height?: number | null
          id?: string
          patient_id?: string
          physical_examination?: string | null
          prescriptions?: Json | null
          present_illness?: string | null
          previous_version_id?: string | null
          signature_timestamp?: string | null
          temperature?: number | null
          treatment_plan?: string | null
          updated_at?: string | null
          version?: number | null
          visit_date?: string | null
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "medical_records_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "medical_records_previous_version_id_fkey"
            columns: ["previous_version_id"]
            isOneToOne: false
            referencedRelation: "medical_records"
            referencedColumns: ["id"]
          },
        ]
      }
      metricas_plataforma: {
        Row: {
          created_at: string
          datos_metrica: Json
          fecha_registro: string | null
          id: string
          region: string
          tipo_metrica: string
        }
        Insert: {
          created_at?: string
          datos_metrica: Json
          fecha_registro?: string | null
          id?: string
          region: string
          tipo_metrica: string
        }
        Update: {
          created_at?: string
          datos_metrica?: Json
          fecha_registro?: string | null
          id?: string
          region?: string
          tipo_metrica?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          created_at: string | null
          email_sent: boolean | null
          id: string
          is_read: boolean | null
          message: string
          patient_id: string | null
          priority: Database["public"]["Enums"]["notification_priority"] | null
          send_email: boolean | null
          send_whatsapp: boolean | null
          title: string
          user_id: string
          whatsapp_sent: boolean | null
        }
        Insert: {
          created_at?: string | null
          email_sent?: boolean | null
          id?: string
          is_read?: boolean | null
          message: string
          patient_id?: string | null
          priority?: Database["public"]["Enums"]["notification_priority"] | null
          send_email?: boolean | null
          send_whatsapp?: boolean | null
          title: string
          user_id: string
          whatsapp_sent?: boolean | null
        }
        Update: {
          created_at?: string | null
          email_sent?: boolean | null
          id?: string
          is_read?: boolean | null
          message?: string
          patient_id?: string | null
          priority?: Database["public"]["Enums"]["notification_priority"] | null
          send_email?: boolean | null
          send_whatsapp?: boolean | null
          title?: string
          user_id?: string
          whatsapp_sent?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      orden_compra_detalles: {
        Row: {
          cantidad: number
          created_at: string
          id: string
          orden_id: string
          precio_unitario: number
          producto_id: string
          subtotal: number
        }
        Insert: {
          cantidad: number
          created_at?: string
          id?: string
          orden_id: string
          precio_unitario: number
          producto_id: string
          subtotal: number
        }
        Update: {
          cantidad?: number
          created_at?: string
          id?: string
          orden_id?: string
          precio_unitario?: number
          producto_id?: string
          subtotal?: number
        }
        Relationships: [
          {
            foreignKeyName: "orden_compra_detalles_orden_id_fkey"
            columns: ["orden_id"]
            isOneToOne: false
            referencedRelation: "ordenes_compra"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orden_compra_detalles_producto_id_fkey"
            columns: ["producto_id"]
            isOneToOne: false
            referencedRelation: "productos"
            referencedColumns: ["id"]
          },
        ]
      }
      ordenes_compra: {
        Row: {
          created_at: string
          estado: string
          fecha_entrega_esperada: string | null
          fecha_orden: string
          id: string
          iva: number
          numero_orden: string
          observaciones: string | null
          proveedor_id: string | null
          subtotal: number
          total: number
          user_id: string
        }
        Insert: {
          created_at?: string
          estado?: string
          fecha_entrega_esperada?: string | null
          fecha_orden?: string
          id?: string
          iva?: number
          numero_orden: string
          observaciones?: string | null
          proveedor_id?: string | null
          subtotal?: number
          total?: number
          user_id: string
        }
        Update: {
          created_at?: string
          estado?: string
          fecha_entrega_esperada?: string | null
          fecha_orden?: string
          id?: string
          iva?: number
          numero_orden?: string
          observaciones?: string | null
          proveedor_id?: string | null
          subtotal?: number
          total?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ordenes_compra_proveedor_id_fkey"
            columns: ["proveedor_id"]
            isOneToOne: false
            referencedRelation: "proveedores"
            referencedColumns: ["id"]
          },
        ]
      }
      patient_consent: {
        Row: {
          consent_date: string | null
          consent_expiry: string | null
          consent_given: boolean
          consent_type: string
          consent_version: string
          id: string
          ip_address: unknown | null
          legal_basis: string | null
          patient_id: number
          withdrawal_date: string | null
        }
        Insert: {
          consent_date?: string | null
          consent_expiry?: string | null
          consent_given: boolean
          consent_type: string
          consent_version: string
          id?: string
          ip_address?: unknown | null
          legal_basis?: string | null
          patient_id: number
          withdrawal_date?: string | null
        }
        Update: {
          consent_date?: string | null
          consent_expiry?: string | null
          consent_given?: boolean
          consent_type?: string
          consent_version?: string
          id?: string
          ip_address?: unknown | null
          legal_basis?: string | null
          patient_id?: number
          withdrawal_date?: string | null
        }
        Relationships: []
      }
      patients: {
        Row: {
          address: string | null
          allergies: string[] | null
          blood_type: string | null
          cedula: string
          chronic_conditions: string[] | null
          city: string | null
          created_at: string | null
          date_of_birth: string | null
          email: string | null
          emergency_contact: string | null
          emergency_phone: string | null
          first_name: string
          gender: string | null
          id: string
          insurance_number: string | null
          insurance_provider: string | null
          insurance_type: Database["public"]["Enums"]["insurance_type"] | null
          last_name: string
          last_visit: string | null
          parish: string | null
          patient_status: Database["public"]["Enums"]["patient_status"] | null
          patient_type: Database["public"]["Enums"]["patient_type"]
          phone: string | null
          province: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          address?: string | null
          allergies?: string[] | null
          blood_type?: string | null
          cedula: string
          chronic_conditions?: string[] | null
          city?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email?: string | null
          emergency_contact?: string | null
          emergency_phone?: string | null
          first_name: string
          gender?: string | null
          id?: string
          insurance_number?: string | null
          insurance_provider?: string | null
          insurance_type?: Database["public"]["Enums"]["insurance_type"] | null
          last_name: string
          last_visit?: string | null
          parish?: string | null
          patient_status?: Database["public"]["Enums"]["patient_status"] | null
          patient_type?: Database["public"]["Enums"]["patient_type"]
          phone?: string | null
          province?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          address?: string | null
          allergies?: string[] | null
          blood_type?: string | null
          cedula?: string
          chronic_conditions?: string[] | null
          city?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email?: string | null
          emergency_contact?: string | null
          emergency_phone?: string | null
          first_name?: string
          gender?: string | null
          id?: string
          insurance_number?: string | null
          insurance_provider?: string | null
          insurance_type?: Database["public"]["Enums"]["insurance_type"] | null
          last_name?: string
          last_visit?: string | null
          parish?: string | null
          patient_status?: Database["public"]["Enums"]["patient_status"] | null
          patient_type?: Database["public"]["Enums"]["patient_type"]
          phone?: string | null
          province?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      payment_gateways: {
        Row: {
          api_key_encrypted: string | null
          created_at: string
          id: string
          is_active: boolean | null
          is_sandbox: boolean | null
          merchant_id: string | null
          provider: string
          updated_at: string
          user_id: string
        }
        Insert: {
          api_key_encrypted?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          is_sandbox?: boolean | null
          merchant_id?: string | null
          provider: string
          updated_at?: string
          user_id: string
        }
        Update: {
          api_key_encrypted?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          is_sandbox?: boolean | null
          merchant_id?: string | null
          provider?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      performance_metrics: {
        Row: {
          active_connections: number | null
          cpu_usage: number | null
          created_at: string
          error_rate: number | null
          id: string
          memory_usage: number | null
          response_time: number | null
          server_id: string
        }
        Insert: {
          active_connections?: number | null
          cpu_usage?: number | null
          created_at?: string
          error_rate?: number | null
          id?: string
          memory_usage?: number | null
          response_time?: number | null
          server_id: string
        }
        Update: {
          active_connections?: number | null
          cpu_usage?: number | null
          created_at?: string
          error_rate?: number | null
          id?: string
          memory_usage?: number | null
          response_time?: number | null
          server_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "performance_metrics_server_id_fkey"
            columns: ["server_id"]
            isOneToOne: false
            referencedRelation: "servers"
            referencedColumns: ["id"]
          },
        ]
      }
      productos: {
        Row: {
          arancel_ecuador: string | null
          categoria: string
          codigo_auxiliar: string[] | null
          codigo_barras: string | null
          codigo_interno: string
          created_at: string
          descripcion: string | null
          es_producto_ice: boolean | null
          estado: string | null
          fecha_vencimiento: string | null
          ice: boolean | null
          ice_porcentaje: number | null
          ice_valor: number | null
          id: string
          iva_porcentaje: number | null
          lote: string | null
          marca: string | null
          nombre: string
          peso: number | null
          precio_costo: number | null
          precio_detalle: number | null
          precio_mayorista: number | null
          precio_venta: number
          proveedor: string | null
          registro_sanitario: string | null
          requiere_receta: boolean | null
          stock_actual: number | null
          stock_maximo: number | null
          stock_minimo: number
          tipo_producto_ice: string | null
          ubicacion_almacen: string | null
          unidad_medida: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          arancel_ecuador?: string | null
          categoria: string
          codigo_auxiliar?: string[] | null
          codigo_barras?: string | null
          codigo_interno: string
          created_at?: string
          descripcion?: string | null
          es_producto_ice?: boolean | null
          estado?: string | null
          fecha_vencimiento?: string | null
          ice?: boolean | null
          ice_porcentaje?: number | null
          ice_valor?: number | null
          id?: string
          iva_porcentaje?: number | null
          lote?: string | null
          marca?: string | null
          nombre: string
          peso?: number | null
          precio_costo?: number | null
          precio_detalle?: number | null
          precio_mayorista?: number | null
          precio_venta: number
          proveedor?: string | null
          registro_sanitario?: string | null
          requiere_receta?: boolean | null
          stock_actual?: number | null
          stock_maximo?: number | null
          stock_minimo: number
          tipo_producto_ice?: string | null
          ubicacion_almacen?: string | null
          unidad_medida?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          arancel_ecuador?: string | null
          categoria?: string
          codigo_auxiliar?: string[] | null
          codigo_barras?: string | null
          codigo_interno?: string
          created_at?: string
          descripcion?: string | null
          es_producto_ice?: boolean | null
          estado?: string | null
          fecha_vencimiento?: string | null
          ice?: boolean | null
          ice_porcentaje?: number | null
          ice_valor?: number | null
          id?: string
          iva_porcentaje?: number | null
          lote?: string | null
          marca?: string | null
          nombre?: string
          peso?: number | null
          precio_costo?: number | null
          precio_detalle?: number | null
          precio_mayorista?: number | null
          precio_venta?: number
          proveedor?: string | null
          registro_sanitario?: string | null
          requiere_receta?: boolean | null
          stock_actual?: number | null
          stock_maximo?: number | null
          stock_minimo?: number
          tipo_producto_ice?: string | null
          ubicacion_almacen?: string | null
          unidad_medida?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      properties: {
        Row: {
          area: string
          bathrooms: number
          bedrooms: number
          created_at: string
          description: string | null
          featured: boolean | null
          id: string
          image_url: string | null
          location: string
          price: number
          property_type: string
          status: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          area: string
          bathrooms?: number
          bedrooms?: number
          created_at?: string
          description?: string | null
          featured?: boolean | null
          id?: string
          image_url?: string | null
          location: string
          price: number
          property_type?: string
          status?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          area?: string
          bathrooms?: number
          bedrooms?: number
          created_at?: string
          description?: string | null
          featured?: boolean | null
          id?: string
          image_url?: string | null
          location?: string
          price?: number
          property_type?: string
          status?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      proveedores: {
        Row: {
          activo: boolean | null
          calificacion: number | null
          contacto: string | null
          created_at: string
          direccion: string | null
          email: string | null
          id: string
          nombre: string
          ruc: string | null
          telefono: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          activo?: boolean | null
          calificacion?: number | null
          contacto?: string | null
          created_at?: string
          direccion?: string | null
          email?: string | null
          id?: string
          nombre: string
          ruc?: string | null
          telefono?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          activo?: boolean | null
          calificacion?: number | null
          contacto?: string | null
          created_at?: string
          direccion?: string | null
          email?: string | null
          id?: string
          nombre?: string
          ruc?: string | null
          telefono?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      red_confianza: {
        Row: {
          avalista_id: string
          certificacion_agricultura_familiar: boolean | null
          comentarios: string | null
          created_at: string
          estado: string | null
          fecha_aval: string | null
          id: string
          organizacion: string | null
          tipo_aval: string
          usuario_id: string
        }
        Insert: {
          avalista_id: string
          certificacion_agricultura_familiar?: boolean | null
          comentarios?: string | null
          created_at?: string
          estado?: string | null
          fecha_aval?: string | null
          id?: string
          organizacion?: string | null
          tipo_aval: string
          usuario_id: string
        }
        Update: {
          avalista_id?: string
          certificacion_agricultura_familiar?: boolean | null
          comentarios?: string | null
          created_at?: string
          estado?: string | null
          fecha_aval?: string | null
          id?: string
          organizacion?: string | null
          tipo_aval?: string
          usuario_id?: string
        }
        Relationships: []
      }
      registros_trabajo: {
        Row: {
          calificacion_hacienda: number | null
          calificacion_jornalero: number | null
          capataz_id: string
          comentarios_capataz: string | null
          comentarios_jornalero: string | null
          created_at: string
          datos_offline: Json | null
          descripcion: string | null
          estado: Database["public"]["Enums"]["estado_trabajo"] | null
          fecha_trabajo: string
          fotos_trabajo: string[] | null
          hacienda_id: string
          hora_fin: string | null
          hora_inicio: string | null
          id: string
          jornalero_id: string
          salario_acordado: number | null
          sincronizado: boolean | null
          tipo_trabajo: Database["public"]["Enums"]["tipo_trabajo"]
          ubicacion_gps: string | null
          updated_at: string
        }
        Insert: {
          calificacion_hacienda?: number | null
          calificacion_jornalero?: number | null
          capataz_id: string
          comentarios_capataz?: string | null
          comentarios_jornalero?: string | null
          created_at?: string
          datos_offline?: Json | null
          descripcion?: string | null
          estado?: Database["public"]["Enums"]["estado_trabajo"] | null
          fecha_trabajo: string
          fotos_trabajo?: string[] | null
          hacienda_id: string
          hora_fin?: string | null
          hora_inicio?: string | null
          id?: string
          jornalero_id: string
          salario_acordado?: number | null
          sincronizado?: boolean | null
          tipo_trabajo: Database["public"]["Enums"]["tipo_trabajo"]
          ubicacion_gps?: string | null
          updated_at?: string
        }
        Update: {
          calificacion_hacienda?: number | null
          calificacion_jornalero?: number | null
          capataz_id?: string
          comentarios_capataz?: string | null
          comentarios_jornalero?: string | null
          created_at?: string
          datos_offline?: Json | null
          descripcion?: string | null
          estado?: Database["public"]["Enums"]["estado_trabajo"] | null
          fecha_trabajo?: string
          fotos_trabajo?: string[] | null
          hacienda_id?: string
          hora_fin?: string | null
          hora_inicio?: string | null
          id?: string
          jornalero_id?: string
          salario_acordado?: number | null
          sincronizado?: boolean | null
          tipo_trabajo?: Database["public"]["Enums"]["tipo_trabajo"]
          ubicacion_gps?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "registros_trabajo_hacienda_id_fkey"
            columns: ["hacienda_id"]
            isOneToOne: false
            referencedRelation: "haciendas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "registros_trabajo_jornalero_id_fkey"
            columns: ["jornalero_id"]
            isOneToOne: false
            referencedRelation: "jornaleros"
            referencedColumns: ["id"]
          },
        ]
      }
      reservas: {
        Row: {
          cliente_apellido: string | null
          cliente_cedula: string
          cliente_email: string | null
          cliente_nombre: string
          cliente_telefono: string
          cliente_user_id: string | null
          codigo_verificacion: string | null
          created_at: string
          estado: Database["public"]["Enums"]["estado_reserva"] | null
          horario_id: string
          id: string
          monto_iva: number | null
          monto_total: number
          updated_at: string
          user_id: string
          verificado_at: string | null
        }
        Insert: {
          cliente_apellido?: string | null
          cliente_cedula: string
          cliente_email?: string | null
          cliente_nombre: string
          cliente_telefono: string
          cliente_user_id?: string | null
          codigo_verificacion?: string | null
          created_at?: string
          estado?: Database["public"]["Enums"]["estado_reserva"] | null
          horario_id: string
          id?: string
          monto_iva?: number | null
          monto_total: number
          updated_at?: string
          user_id: string
          verificado_at?: string | null
        }
        Update: {
          cliente_apellido?: string | null
          cliente_cedula?: string
          cliente_email?: string | null
          cliente_nombre?: string
          cliente_telefono?: string
          cliente_user_id?: string | null
          codigo_verificacion?: string | null
          created_at?: string
          estado?: Database["public"]["Enums"]["estado_reserva"] | null
          horario_id?: string
          id?: string
          monto_iva?: number | null
          monto_total?: number
          updated_at?: string
          user_id?: string
          verificado_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_reservas_horario"
            columns: ["horario_id"]
            isOneToOne: false
            referencedRelation: "horarios_disponibles"
            referencedColumns: ["id"]
          },
        ]
      }
      retenciones: {
        Row: {
          base_imponible: number
          codigo_retencion: string
          created_at: string
          id: string
          porcentaje: number
          tipo_retencion: string
          transaccion_id: string
          valor_retencion: number
        }
        Insert: {
          base_imponible: number
          codigo_retencion: string
          created_at?: string
          id?: string
          porcentaje: number
          tipo_retencion: string
          transaccion_id: string
          valor_retencion: number
        }
        Update: {
          base_imponible?: number
          codigo_retencion?: string
          created_at?: string
          id?: string
          porcentaje?: number
          tipo_retencion?: string
          transaccion_id?: string
          valor_retencion?: number
        }
        Relationships: [
          {
            foreignKeyName: "retenciones_transaccion_id_fkey"
            columns: ["transaccion_id"]
            isOneToOne: false
            referencedRelation: "transacciones"
            referencedColumns: ["id"]
          },
        ]
      }
      scheduled_tasks: {
        Row: {
          configuration: Json | null
          created_at: string | null
          id: string
          is_active: boolean | null
          last_run: string | null
          next_run: string | null
          schedule_time: string
          task_type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          configuration?: Json | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          last_run?: string | null
          next_run?: string | null
          schedule_time: string
          task_type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          configuration?: Json | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          last_run?: string | null
          next_run?: string | null
          schedule_time?: string
          task_type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      security_alerts: {
        Row: {
          alert_data: Json | null
          alert_type: string
          auto_resolved: boolean | null
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string
          notification_methods: string[] | null
          notified_contacts: boolean | null
          resolved_at: string | null
          severity: string
          title: string
          user_id: string
        }
        Insert: {
          alert_data?: Json | null
          alert_type: string
          auto_resolved?: boolean | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          notification_methods?: string[] | null
          notified_contacts?: boolean | null
          resolved_at?: string | null
          severity?: string
          title: string
          user_id: string
        }
        Update: {
          alert_data?: Json | null
          alert_type?: string
          auto_resolved?: boolean | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          notification_methods?: string[] | null
          notified_contacts?: boolean | null
          resolved_at?: string | null
          severity?: string
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      security_scans: {
        Row: {
          completed_at: string | null
          created_at: string | null
          device_info: Json | null
          id: string
          imei_status: string | null
          imsi_status: string | null
          location_data: Json | null
          network_changes: number | null
          scan_result: Json | null
          scan_status: string
          scan_type: string
          signal_strength: number | null
          started_at: string | null
          threat_details: Json | null
          threats_detected: number | null
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          device_info?: Json | null
          id?: string
          imei_status?: string | null
          imsi_status?: string | null
          location_data?: Json | null
          network_changes?: number | null
          scan_result?: Json | null
          scan_status?: string
          scan_type?: string
          signal_strength?: number | null
          started_at?: string | null
          threat_details?: Json | null
          threats_detected?: number | null
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          device_info?: Json | null
          id?: string
          imei_status?: string | null
          imsi_status?: string | null
          location_data?: Json | null
          network_changes?: number | null
          scan_result?: Json | null
          scan_status?: string
          scan_type?: string
          signal_strength?: number | null
          started_at?: string | null
          threat_details?: Json | null
          threats_detected?: number | null
          user_id?: string
        }
        Relationships: []
      }
      servers: {
        Row: {
          created_at: string
          health_status: string
          id: string
          ip_address: string
          name: string
          port: number
          status: string
          updated_at: string
          weight: number
        }
        Insert: {
          created_at?: string
          health_status?: string
          id?: string
          ip_address: string
          name: string
          port: number
          status?: string
          updated_at?: string
          weight?: number
        }
        Update: {
          created_at?: string
          health_status?: string
          id?: string
          ip_address?: string
          name?: string
          port?: number
          status?: string
          updated_at?: string
          weight?: number
        }
        Relationships: []
      }
      servicios: {
        Row: {
          activo: boolean | null
          categoria: Database["public"]["Enums"]["tipo_servicio"] | null
          created_at: string
          descripcion: string | null
          duracion: number
          id: string
          iva: number | null
          max_capacidad: number | null
          nombre: string
          precio: number
          updated_at: string
          user_id: string
        }
        Insert: {
          activo?: boolean | null
          categoria?: Database["public"]["Enums"]["tipo_servicio"] | null
          created_at?: string
          descripcion?: string | null
          duracion: number
          id?: string
          iva?: number | null
          max_capacidad?: number | null
          nombre: string
          precio: number
          updated_at?: string
          user_id: string
        }
        Update: {
          activo?: boolean | null
          categoria?: Database["public"]["Enums"]["tipo_servicio"] | null
          created_at?: string
          descripcion?: string | null
          duracion?: number
          id?: string
          iva?: number | null
          max_capacidad?: number | null
          nombre?: string
          precio?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      sms_providers: {
        Row: {
          api_key_encrypted: string | null
          created_at: string
          id: string
          is_active: boolean | null
          provider: string
          sender_id: string | null
          user_id: string
        }
        Insert: {
          api_key_encrypted?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          provider: string
          sender_id?: string | null
          user_id: string
        }
        Update: {
          api_key_encrypted?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          provider?: string
          sender_id?: string | null
          user_id?: string
        }
        Relationships: []
      }
      sri_authorization_status: {
        Row: {
          authorization_date: string | null
          authorization_number: string | null
          created_at: string
          error_message: string | null
          id: string
          invoice_id: string
          status: string
          xml_response: string | null
        }
        Insert: {
          authorization_date?: string | null
          authorization_number?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          invoice_id: string
          status: string
          xml_response?: string | null
        }
        Update: {
          authorization_date?: string | null
          authorization_number?: string | null
          created_at?: string
          error_message?: string | null
          id?: string
          invoice_id?: string
          status?: string
          xml_response?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sri_authorization_status_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "electronic_invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription_plans: {
        Row: {
          commission_rate: number | null
          created_at: string
          description: string | null
          features: Json | null
          id: string
          is_active: boolean | null
          max_events_per_month: number | null
          max_tickets_per_event: number | null
          name: string
          price_monthly: number
          price_yearly: number | null
        }
        Insert: {
          commission_rate?: number | null
          created_at?: string
          description?: string | null
          features?: Json | null
          id?: string
          is_active?: boolean | null
          max_events_per_month?: number | null
          max_tickets_per_event?: number | null
          name: string
          price_monthly: number
          price_yearly?: number | null
        }
        Update: {
          commission_rate?: number | null
          created_at?: string
          description?: string | null
          features?: Json | null
          id?: string
          is_active?: boolean | null
          max_events_per_month?: number | null
          max_tickets_per_event?: number | null
          name?: string
          price_monthly?: number
          price_yearly?: number | null
        }
        Relationships: []
      }
      transacciones: {
        Row: {
          categoria: string | null
          clave_acceso: string | null
          codigo_sri: string | null
          created_at: string
          descripcion: string | null
          empresa_id: string | null
          estado_sri: string | null
          fecha_emision: string
          id: string
          iva: number | null
          numero_comprobante: string | null
          subtotal_0: number | null
          subtotal_12: number | null
          tipo: string
          total: number
          updated_at: string
          user_id: string
        }
        Insert: {
          categoria?: string | null
          clave_acceso?: string | null
          codigo_sri?: string | null
          created_at?: string
          descripcion?: string | null
          empresa_id?: string | null
          estado_sri?: string | null
          fecha_emision: string
          id?: string
          iva?: number | null
          numero_comprobante?: string | null
          subtotal_0?: number | null
          subtotal_12?: number | null
          tipo: string
          total: number
          updated_at?: string
          user_id: string
        }
        Update: {
          categoria?: string | null
          clave_acceso?: string | null
          codigo_sri?: string | null
          created_at?: string
          descripcion?: string | null
          empresa_id?: string | null
          estado_sri?: string | null
          fecha_emision?: string
          id?: string
          iva?: number | null
          numero_comprobante?: string | null
          subtotal_0?: number | null
          subtotal_12?: number | null
          tipo?: string
          total?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transacciones_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas"
            referencedColumns: ["id"]
          },
        ]
      }
      user_configurations: {
        Row: {
          category: string
          config_key: string
          config_value: Json
          created_at: string
          id: string
          is_encrypted: boolean | null
          updated_at: string
          user_id: string
        }
        Insert: {
          category: string
          config_key: string
          config_value: Json
          created_at?: string
          id?: string
          is_encrypted?: boolean | null
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          config_key?: string
          config_value?: Json
          created_at?: string
          id?: string
          is_encrypted?: boolean | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          created_at: string | null
          especialidad: string | null
          fecha_registro: string | null
          first_name: string | null
          id: string
          is_active: boolean | null
          last_name: string | null
          numero_licencia: string | null
          role: Database["public"]["Enums"]["user_role"]
          telefono: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          especialidad?: string | null
          fecha_registro?: string | null
          first_name?: string | null
          id?: string
          is_active?: boolean | null
          last_name?: string | null
          numero_licencia?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          telefono?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          especialidad?: string | null
          fecha_registro?: string | null
          first_name?: string | null
          id?: string
          is_active?: boolean | null
          last_name?: string | null
          numero_licencia?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          telefono?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_subscriptions: {
        Row: {
          created_at: string
          current_period_end: string
          current_period_start: string
          events_used_this_month: number | null
          id: string
          plan_id: string
          status: string | null
          tickets_sold_this_month: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_period_end: string
          current_period_start: string
          events_used_this_month?: number | null
          id?: string
          plan_id: string
          status?: string | null
          tickets_sold_this_month?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_period_end?: string
          current_period_start?: string
          events_used_this_month?: number | null
          id?: string
          plan_id?: string
          status?: string | null
          tickets_sold_this_month?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_quotes: {
        Row: {
          created_at: string
          delivery_date: string | null
          event_id: string
          excludes: string[] | null
          id: string
          includes: string[] | null
          notes: string | null
          payment_terms: string | null
          quoted_price: number
          service_description: string
          status: string | null
          updated_at: string
          user_id: string
          valid_until: string | null
          vendor_id: string
        }
        Insert: {
          created_at?: string
          delivery_date?: string | null
          event_id: string
          excludes?: string[] | null
          id?: string
          includes?: string[] | null
          notes?: string | null
          payment_terms?: string | null
          quoted_price: number
          service_description: string
          status?: string | null
          updated_at?: string
          user_id: string
          valid_until?: string | null
          vendor_id: string
        }
        Update: {
          created_at?: string
          delivery_date?: string | null
          event_id?: string
          excludes?: string[] | null
          id?: string
          includes?: string[] | null
          notes?: string | null
          payment_terms?: string | null
          quoted_price?: number
          service_description?: string
          status?: string | null
          updated_at?: string
          user_id?: string
          valid_until?: string | null
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vendor_quotes_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_quotes_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      vendors: {
        Row: {
          address: string | null
          availability_calendar: Json | null
          category: string
          certifications: string[] | null
          contact_person: string | null
          created_at: string
          email: string | null
          id: string
          is_verified: boolean | null
          name: string
          phone: string | null
          portfolio_images: string[] | null
          price_range_max: number | null
          price_range_min: number | null
          rating: number | null
          services_description: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          address?: string | null
          availability_calendar?: Json | null
          category: string
          certifications?: string[] | null
          contact_person?: string | null
          created_at?: string
          email?: string | null
          id?: string
          is_verified?: boolean | null
          name: string
          phone?: string | null
          portfolio_images?: string[] | null
          price_range_max?: number | null
          price_range_min?: number | null
          rating?: number | null
          services_description?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          address?: string | null
          availability_calendar?: Json | null
          category?: string
          certifications?: string[] | null
          contact_person?: string | null
          created_at?: string
          email?: string | null
          id?: string
          is_verified?: boolean | null
          name?: string
          phone?: string | null
          portfolio_images?: string[] | null
          price_range_max?: number | null
          price_range_min?: number | null
          rating?: number | null
          services_description?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      venta_detalles: {
        Row: {
          cantidad: number
          created_at: string
          descuento_unitario: number | null
          id: string
          precio_unitario: number
          producto_id: string
          subtotal: number
          venta_id: string
        }
        Insert: {
          cantidad: number
          created_at?: string
          descuento_unitario?: number | null
          id?: string
          precio_unitario: number
          producto_id: string
          subtotal: number
          venta_id: string
        }
        Update: {
          cantidad?: number
          created_at?: string
          descuento_unitario?: number | null
          id?: string
          precio_unitario?: number
          producto_id?: string
          subtotal?: number
          venta_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "venta_detalles_producto_id_fkey"
            columns: ["producto_id"]
            isOneToOne: false
            referencedRelation: "productos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "venta_detalles_venta_id_fkey"
            columns: ["venta_id"]
            isOneToOne: false
            referencedRelation: "ventas"
            referencedColumns: ["id"]
          },
        ]
      }
      ventas: {
        Row: {
          autorizacion_sri: string | null
          clave_acceso: string | null
          cliente_id: string | null
          created_at: string
          descuento: number
          estado: string
          factura_electronica: boolean | null
          fecha_venta: string
          forma_pago: string
          ice: number
          id: string
          iva: number
          numero_factura: string
          subtotal_0: number
          subtotal_12: number
          total: number
          updated_at: string
          user_id: string
        }
        Insert: {
          autorizacion_sri?: string | null
          clave_acceso?: string | null
          cliente_id?: string | null
          created_at?: string
          descuento?: number
          estado?: string
          factura_electronica?: boolean | null
          fecha_venta?: string
          forma_pago?: string
          ice?: number
          id?: string
          iva?: number
          numero_factura: string
          subtotal_0?: number
          subtotal_12?: number
          total: number
          updated_at?: string
          user_id: string
        }
        Update: {
          autorizacion_sri?: string | null
          clave_acceso?: string | null
          cliente_id?: string | null
          created_at?: string
          descuento?: number
          estado?: string
          factura_electronica?: boolean | null
          fecha_venta?: string
          forma_pago?: string
          ice?: number
          id?: string
          iva?: number
          numero_factura?: string
          subtotal_0?: number
          subtotal_12?: number
          total?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ventas_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
        ]
      }
      ventas_credito: {
        Row: {
          cliente_id: string
          created_at: string
          estado: string | null
          fecha_vencimiento: string | null
          fecha_venta: string
          ice: number | null
          id: string
          iva: number
          numero_factura: string | null
          saldo_pendiente: number | null
          subtotal: number
          total: number
          user_id: string
        }
        Insert: {
          cliente_id: string
          created_at?: string
          estado?: string | null
          fecha_vencimiento?: string | null
          fecha_venta: string
          ice?: number | null
          id?: string
          iva: number
          numero_factura?: string | null
          saldo_pendiente?: number | null
          subtotal: number
          total: number
          user_id: string
        }
        Update: {
          cliente_id?: string
          created_at?: string
          estado?: string | null
          fecha_vencimiento?: string | null
          fecha_venta?: string
          ice?: number | null
          id?: string
          iva?: number
          numero_factura?: string | null
          saldo_pendiente?: number | null
          subtotal?: number
          total?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ventas_credito_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      buscar_productos: {
        Args: {
          p_categoria?: string
          p_codigo?: string
          p_termino?: string
          p_user_id: string
        }
        Returns: {
          categoria: string
          codigo_barras: string
          codigo_interno: string
          estado: string
          id: string
          nombre: string
          precio_venta: number
          stock_actual: number
          stock_minimo: number
        }[]
      }
      calcular_analisis_abc: {
        Args: { p_user_id: string }
        Returns: {
          clasificacion: string
          nombre: string
          porcentaje_acumulado: number
          producto_id: string
          valor_venta: number
        }[]
      }
      calcular_ice_producto: {
        Args: { p_precio_venta: number; p_tipo_producto: string }
        Returns: number
      }
      check_data_retention_compliance: {
        Args: Record<PropertyKey, never>
        Returns: {
          compliance_status: string
          oldest_record_date: string
          records_count: number
          table_name: string
        }[]
      }
      generar_numero_factura: {
        Args: { p_user_id: string }
        Returns: string
      }
      generar_reporte_inventario_fisico: {
        Args: { p_inventario_id: string; p_user_id: string }
        Returns: {
          codigo_interno: string
          diferencia: number
          producto_nombre: string
          stock_fisico: number
          stock_sistema: number
          valor_diferencia: number
        }[]
      }
      get_next_invoice_number: {
        Args: {
          p_document_type?: string
          p_emission_point?: string
          p_establishment?: string
          p_user_id: string
        }
        Returns: string
      }
      get_user_role: {
        Args: { user_uuid?: string }
        Returns: Database["public"]["Enums"]["user_role"]
      }
      has_role: {
        Args: { required_role: Database["public"]["Enums"]["user_role"] }
        Returns: boolean
      }
      initialize_daily_counter: {
        Args: { p_user_id: string }
        Returns: undefined
      }
      log_data_access: {
        Args: {
          p_access_reason?: string
          p_action_type: string
          p_changes_made?: Json
          p_patient_id: number
          p_record_id?: number
          p_table_name: string
        }
        Returns: string
      }
      log_medical_access: {
        Args: {
          p_access_reason?: string
          p_action_type: string
          p_changes_made?: Json
          p_patient_id: number
          p_record_id?: number
          p_table_name: string
        }
        Returns: string
      }
      update_daily_counter: {
        Args: {
          p_counter_type: string
          p_increment?: number
          p_user_id: string
        }
        Returns: undefined
      }
      verificar_disponibilidad: {
        Args: { p_horario_id: string }
        Returns: boolean
      }
    }
    Enums: {
      estado_jornalero: "disponible" | "ocupado" | "inactivo"
      estado_reserva: "pendiente" | "confirmada" | "cancelada"
      estado_trabajo: "pendiente" | "en_progreso" | "completado" | "cancelado"
      insurance_type:
        | "iess"
        | "armada"
        | "policia"
        | "privado"
        | "ecuasanitas"
        | "humana"
        | "salud_sa"
        | "none"
      notification_priority: "baja" | "media" | "alta" | "critica"
      patient_status: "activo" | "inactivo" | "critico" | "observacion"
      patient_type:
        | "habitual_pago"
        | "credito"
        | "tarjeta_habiente"
        | "seguro_iess"
        | "seguro_armada"
        | "seguro_policia"
        | "seguro_privado"
        | "subsidiado"
      tipo_servicio: "consultoria" | "capacitacion" | "evento" | "otro"
      tipo_trabajo:
        | "fumigacion"
        | "cosecha"
        | "poda"
        | "empaque"
        | "siembra"
        | "mantenimiento"
      user_role:
        | "paciente"
        | "medico"
        | "administrador"
        | "capataz"
        | "admin_hacienda"
        | "jornalero"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      estado_jornalero: ["disponible", "ocupado", "inactivo"],
      estado_reserva: ["pendiente", "confirmada", "cancelada"],
      estado_trabajo: ["pendiente", "en_progreso", "completado", "cancelado"],
      insurance_type: [
        "iess",
        "armada",
        "policia",
        "privado",
        "ecuasanitas",
        "humana",
        "salud_sa",
        "none",
      ],
      notification_priority: ["baja", "media", "alta", "critica"],
      patient_status: ["activo", "inactivo", "critico", "observacion"],
      patient_type: [
        "habitual_pago",
        "credito",
        "tarjeta_habiente",
        "seguro_iess",
        "seguro_armada",
        "seguro_policia",
        "seguro_privado",
        "subsidiado",
      ],
      tipo_servicio: ["consultoria", "capacitacion", "evento", "otro"],
      tipo_trabajo: [
        "fumigacion",
        "cosecha",
        "poda",
        "empaque",
        "siembra",
        "mantenimiento",
      ],
      user_role: [
        "paciente",
        "medico",
        "administrador",
        "capataz",
        "admin_hacienda",
        "jornalero",
      ],
    },
  },
} as const
