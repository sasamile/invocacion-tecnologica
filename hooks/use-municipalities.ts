import api from "@/api";
import { MunicipalityData } from "@/types";
import { useQuery } from "@tanstack/react-query";

// Función para obtener los municipios
const getMunicipalities = async () => {
  const { data } = await api.get<MunicipalityData[]>("/api/meta/municipalities");
  return data;
};

// Hook personalizado
export function useMunicipalities() {
  return useQuery({
    queryKey: ["municipalities"], // Clave única para el query
    queryFn: getMunicipalities,   // Función de consulta
    // staleTime: 1000 * 60 * 5,     // Cachea por 5 minutos
  });
}
