# Sistema de Gestión de Cheques Ecuatorianos

Sistema especializado para el procesamiento, validación y gestión de cheques ecuatorianos con tecnología OCR avanzada.

## Características Principales

### 🔍 Escaneo OCR Inteligente
- **Captura por cámara**: Acceso directo a la cámara del dispositivo para fotografiar cheques
- **Procesamiento automático**: Extracción inteligente de datos de cheques ecuatorianos
- **Validación en tiempo real**: Verificación automática de formatos y datos bancarios

### 📊 Dashboard Integral
- **Vista resumen**: Estadísticas generales de cheques procesados
- **Sistema de alertas**: Notificaciones para cheques pendientes y vencimientos
- **Lista detallada**: Gestión completa de todos los cheques con filtros avanzados

### 🏦 Gestión Bancaria Ecuatoriana
- **Bancos soportados**:
  - Banco Pichincha
  - Banco del Guayaquil
  - Banco del Pacífico
  - Banco Internacional
  - Produbanco
  - Banco Bolivariano
  - Banco de Machala
  - Banco ProCredit
  - Banco de Loja
  - Banco Solidario

### 📋 Tipos de Cheques
- **Cliente**: Cheques recibidos de clientes
- **Proveedor**: Cheques emitidos a proveedores

### ⚡ Estados de Procesamiento
- **Pendiente**: Cheques en espera de procesamiento
- **Procesado**: Cheques validados y confirmados
- **Rechazado**: Cheques con errores o datos inválidos
- **Cobrado**: Cheques efectivamente cobrados

## Procesos y Gestiones

### 1. Proceso de Escaneo
1. **Captura**: Abrir modal de cámara desde el dashboard
2. **Fotografía**: Tomar foto del cheque con guías visuales
3. **Procesamiento**: Análisis automático con pasos de progreso:
   - Análisis de imagen
   - Extracción de texto
   - Validación de datos
   - Verificación bancaria
4. **Resultado**: Datos extraídos automáticamente al formulario

### 2. Gestión de Datos
- **Extracción automática**:
  - Número de cheque
  - Banco emisor
  - Número de cuenta
  - Monto
  - Fecha de emisión
  - Datos del emisor
  - Datos del beneficiario
  - RUC/Cédula

### 3. Validaciones Implementadas
- **Formato de cheques**: Verificación de estructura estándar ecuatoriana
- **Datos bancarios**: Validación de códigos y formatos bancarios
- **RUC/Cédula**: Verificación de documentos de identidad ecuatorianos
- **Fechas**: Validación de fechas de emisión y vencimiento

### 4. Sistema de Filtros y Búsqueda
- **Búsqueda por texto**: Buscar por número, emisor, beneficiario
- **Filtro por tipo**: Cliente o Proveedor
- **Filtro por estado**: Pendiente, Procesado, Rechazado, Cobrado
- **Ordenamiento**: Por fecha, monto, estado

### 5. Alertas y Notificaciones
- Cheques próximos a vencer
- Cheques pendientes de procesamiento
- Errores en validaciones
- Fondos insuficientes (cuando aplique)

## Tecnologías Utilizadas

### Frontend
- **React 18**: Framework de interfaz de usuario
- **TypeScript**: Tipado estático para mayor seguridad
- **Tailwind CSS**: Framework de estilos utilitarios
- **Vite**: Herramienta de construcción rápida

### Componentes UI
- **Shadcn/ui**: Sistema de componentes moderno
- **Radix UI**: Componentes accesibles y primitivos
- **Lucide React**: Iconografía moderna

### Gestión de Estado
- **Zustand**: Gestión de estado ligera y eficiente
- **React Hook Form**: Manejo de formularios
- **Zod**: Validación de esquemas

### Capacidades Móviles
- **Capacitor**: Acceso nativo a cámara y funcionalidades del dispositivo
- **PWA Ready**: Instalable como aplicación móvil

## Project info

**URL**: https://lovable.dev/projects/29e367aa-c6a4-4af5-a743-a4a0f70e6507

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/29e367aa-c6a4-4af5-a743-a4a0f70e6507) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/29e367aa-c6a4-4af5-a743-a4a0f70e6507) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
