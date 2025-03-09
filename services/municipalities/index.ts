import axios from "axios";

export async function getMunicipalities() {
  const { data } = await axios.get("http://localhost:3000/api/meta/municipalities");
  return data;
}
