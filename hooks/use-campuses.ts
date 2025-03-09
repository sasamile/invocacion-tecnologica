import api from "@/api";
import { CampusesColumns } from "@/types";
import { useQuery } from "@tanstack/react-query";

// Función para obtener los municipios
const getCampuses = async () => {
  const { data } = await api.get<CampusesColumns[]>("/api/meta/headquarters");
  return data;
};

// Hook personalizado
export function useCampuses() {
  return useQuery({
    queryKey: ["campuses"], // Clave única para el query
    queryFn: getCampuses,   // Función de consulta
    // staleTime: 1000 * 60 * 5,     // Cachea por 5 minutos
  });
}
