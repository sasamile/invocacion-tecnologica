import api from "@/api";
import { SchoolFormValues } from "@/components/common/school-form";

export const createCampus = async (values: SchoolFormValues) => {
  try {
    const { status } = await api.post(
      "/api/meta/headquarters",
      values
    );

    if (status !== 201) {
      return { success: false };
    }

    return { success: true };
  } catch (error) {
    return { success: false };
  }
};

export const updateCampus = async (values: SchoolFormValues, campusId: string) => {
  try {

    const payload = {
      codeDane: values.code,
      name: values.name,
      zona: values.zona,
      state: values.state,
      address: values.address,
      phone: values.phone,
      rector: values.rector,
      institutionsId: values.instituteCode,
      
    }
    const { status } = await api.put(
      `/api/meta/headquarters/${campusId}`,
      payload
    );

    if (status !== 200) {
      return { success: false };
    }

    return { success: true };
  } catch (error) {
    return { success: false };
  }
};