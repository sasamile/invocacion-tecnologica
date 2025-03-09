import api from "@/api";

export async function getMunicipalities() {
  const { data } = await api.get("/api/meta/municipalities");
  return data;
}
