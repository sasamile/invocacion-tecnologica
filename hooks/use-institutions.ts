import { SchoolColumns } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// Función para obtener los municipios
const getInstitutions = async () => {
  const { data } = await axios.get<SchoolColumns[]>("http://localhost:3000/api/meta/institutions");
  return data;
};

// Hook personalizado
export function useInstitutions() {
  return useQuery({
    queryKey: ["institutions"], // Clave única para el query
    queryFn: getInstitutions,   // Función de consulta
    // staleTime: 1000 * 60 * 5,     // Cachea por 5 minutos
  });
}
