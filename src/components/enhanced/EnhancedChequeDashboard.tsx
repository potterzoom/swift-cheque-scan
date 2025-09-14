import { useState } from 'react';
import { Plus, Search, Filter, MoreHorizontal, TrendingUp, Clock, DollarSign, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { useCheques } from '@/hooks/useCheques';
import { EnhancedChequeScanner } from './EnhancedChequeScanner';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const EnhancedChequeDashboard = () => {
  const { 
    cheques, 
    stats, 
    loading, 
    filter, 
    searchTerm, 
    setFilter, 
    setSearchTerm,
    updateCheque,
    deleteCheque,
    batchUpdateCheques
  } = useCheques();

  const [scannerOpen, setScannerOpen] = useState(false);
  const [selectedCheques, setSelectedCheques] = useState<string[]>([]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-EC', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd MMM yyyy", { locale: es });
  };

  const getEstadoBadge = (estado: string) => {
    const variants: Record<string, any> = {
      pendiente: { variant: 'secondary', label: 'Pendiente' },
      procesado: { variant: 'default', label: 'Procesado' },
      cobrado: { variant: 'default', label: 'Cobrado' },
      rechazado: { variant: 'destructive', label: 'Rechazado' }
    };
    
    const config = variants[estado] || variants.pendiente;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const handleSelectCheque = (chequeId: string) => {
    setSelectedCheques(prev => 
      prev.includes(chequeId) 
        ? prev.filter(id => id !== chequeId)
        : [...prev, chequeId]
    );
  };

  const handleSelectAll = () => {
    if (selectedCheques.length === cheques.length) {
      setSelectedCheques([]);
    } else {
      setSelectedCheques(cheques.map(c => c.id));
    }
  };

  const handleBatchUpdate = async (estado: string) => {
    if (selectedCheques.length === 0) return;
    
    await batchUpdateCheques(selectedCheques, { estado: estado as any });
    setSelectedCheques([]);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard de Cheques</h1>
          <p className="text-muted-foreground">
            Gestiona y monitorea tus cheques procesados
          </p>
        </div>
        <Button onClick={() => setScannerOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Escanear Cheque
        </Button>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Cheques</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total_cheques}</div>
              <p className="text-xs text-muted-foreground">
                {stats.promedio_por_dia.toFixed(1)} por día promedio
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monto Total</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(stats.total_monto)}</div>
              <p className="text-xs text-muted-foreground">
                {formatCurrency(stats.monto_pendiente)} pendiente
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.cheques_pendientes}</div>
              <p className="text-xs text-muted-foreground">
                Requieren procesamiento
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Banco Principal</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.banco_mas_comun || 'N/A'}
              </div>
              <p className="text-xs text-muted-foreground">
                Más frecuente
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex flex-1 gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por número, banco, beneficiario..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={filter} onValueChange={(value) => setFilter(value as any)}>
            <SelectTrigger className="w-48">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filtrar por tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los cheques</SelectItem>
              <SelectItem value="cliente">De clientes</SelectItem>
              <SelectItem value="proveedor">A proveedores</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Batch Actions */}
        {selectedCheques.length > 0 && (
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => handleBatchUpdate('cobrado')}
            >
              Marcar como cobrado ({selectedCheques.length})
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => handleBatchUpdate('rechazado')}
            >
              Rechazar ({selectedCheques.length})
            </Button>
          </div>
        )}
      </div>

      {/* Cheques Table */}
      <Card>
        <CardHeader>
          <CardTitle>Cheques Registrados</CardTitle>
          <CardDescription>
            {cheques.length} cheque(s) encontrado(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedCheques.length === cheques.length && cheques.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Número</TableHead>
                  <TableHead>Banco</TableHead>
                  <TableHead>Beneficiario</TableHead>
                  <TableHead>Monto</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cheques.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      <div className="text-muted-foreground">
                        No se encontraron cheques. 
                        <Button 
                          variant="link" 
                          onClick={() => setScannerOpen(true)}
                          className="pl-1"
                        >
                          Escanea tu primer cheque
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  cheques.map((cheque) => (
                    <TableRow key={cheque.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedCheques.includes(cheque.id)}
                          onCheckedChange={() => handleSelectCheque(cheque.id)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {cheque.numero_cheque}
                      </TableCell>
                      <TableCell>{cheque.banco}</TableCell>
                      <TableCell className="max-w-32 truncate">
                        {cheque.beneficiario || 'No especificado'}
                      </TableCell>
                      <TableCell>{formatCurrency(cheque.monto)}</TableCell>
                      <TableCell>{getEstadoBadge(cheque.estado)}</TableCell>
                      <TableCell>{formatDate(cheque.created_at)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => updateCheque(cheque.id, { estado: 'procesado' })}
                            >
                              Marcar como procesado
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => updateCheque(cheque.id, { estado: 'cobrado' })}
                            >
                              Marcar como cobrado
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => updateCheque(cheque.id, { estado: 'rechazado' })}
                            >
                              Rechazar
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => deleteCheque(cheque.id)}
                              className="text-destructive"
                            >
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Scanner Modal */}
      <EnhancedChequeScanner
        isOpen={scannerOpen}
        onClose={() => setScannerOpen(false)}
        onSuccess={(data) => {
          console.log('Cheque processed successfully:', data);
        }}
      />
    </div>
  );
};