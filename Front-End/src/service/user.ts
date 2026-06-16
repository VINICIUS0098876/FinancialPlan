// src/service/user.ts
import { getRequest, putRequest, deleteRequest } from "./api";

export const getUserById = async (id_user: string) => {
  try {
    const response = await getRequest(`/user/${id_user}`);
    if (!response.ok) throw new Error("Erro ao buscar usuário");
    return await response.json();
  } catch (error) {
    console.error("Erro no UserService:", error);
    throw error;
  }
};

// Aqui nós trocamos o 'any' pelo formato exato que o seu Controller exige!
export const updateUser = async (id_user: string, userData: { name: string; email: string; password: string }) => {
  try {
    const response = await putRequest(`/user/${id_user}`, userData);
    if (!response.ok) throw new Error("Erro ao atualizar usuário");
    return await response.json();
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    throw error;
  }
};

export const deleteUser = async (id_user: string) => {
  try {
    const response = await deleteRequest(`/user/${id_user}`);
    if (!response.ok) throw new Error("Erro ao excluir usuário");
    return await response.json();
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    throw error;
  }
};