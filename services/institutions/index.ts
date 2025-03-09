import api from "@/api";
import { SchoolFormValues } from "@/components/common/school-form";

export const createInstitute = async (values: SchoolFormValues) => {
  try {
    const { status } = await api.post(
      "/api/meta/institutions",
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

export const updateInstitute = async (values: SchoolFormValues, instituteId: string) => {
  try {

    const payload = {
      codeDane: values.code,
      name: values.name,
      zona: values.zona,
      state: values.state,
      address: values.address,
      phone: values.phone,
      rector: values.rector
    }
    const { status } = await api.patch(
      `/api/meta/institutions/${instituteId}`,
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
