import { DataProps, MunicipalityData } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Función para obtener los municipios
const getStats = async () => {
  const { data } = await axios.get<DataProps>("http://localhost:3000/api/meta");
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
