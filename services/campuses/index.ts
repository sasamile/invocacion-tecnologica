import { SchoolFormValues } from "@/components/common/school-form";
import axios from "axios";

export const createCampus = async (values: SchoolFormValues) => {
  try {
    const { status } = await axios.post(
      "http://localhost:3000/api/meta/headquarters",
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
    const { status } = await axios.put(
      `http://localhost:3000/api/meta/headquarters/${campusId}`,
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