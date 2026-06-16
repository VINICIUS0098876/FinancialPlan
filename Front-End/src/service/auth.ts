import { postRequest } from "./api";

// 1. Criamos um "molde" (interface) para os dados de cadastro
interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

// 2. Agora o userData segue esse molde, em vez de ser 'any'
export const registerUser = async (userData: RegisterData) => {
  try {
    const response = await postRequest("/user", userData);

    if (!response.ok) {
      throw new Error("Falha no cadastro");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro no AuthService:", error);
    throw error;
  }
};

export const loginUser = async (loginData: LoginData) => {
  try {
    const response = await postRequest("/user/login", loginData);

    if (!response.ok) {
      throw new Error("Falha no login");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro no AuthService:", error);
    throw error;
  }
};