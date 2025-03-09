import api from "@/api";
import { DataProps } from "@/types";
import { useQuery } from "@tanstack/react-query";

// Función para obtener los municipios
const getStats = async () => {
  const { data } = await api.get<DataProps>("/api/meta");
  return data;
};

// Hook personalizado
export function useStats() {
  return useQuery({
    queryKey: ["stats"], // Clave única para el query
    queryFn: getStats,   // Función de consulta
    // staleTime: 1000 * 60 * 5,     // Cachea por 5 minutos
  });
}
