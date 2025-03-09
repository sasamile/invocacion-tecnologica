import { CampusesColumns, SchoolColumns } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Función para obtener los municipios
const getCampuses = async () => {
  const { data } = await axios.get<CampusesColumns[]>("http://localhost:3000/api/meta/headquarters");
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
