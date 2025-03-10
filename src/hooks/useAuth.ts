import { authAction } from "@/api/auth.api";
import { LoginBody, RegisterBody, User } from "@/types/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

const useAuth = {
  useLogin() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async (body: LoginBody): Promise<User> => {
        return await authAction.login(body);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["me"],
        });
      },
    });
  },
  useLogout() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async () => {
        await authAction.logout();
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["me"],
        });
      },
    });
  },
  useGetMe() {
    return useQuery({
      queryKey: ["me"],
      queryFn: async (): Promise<User> => {
        return await authAction.me();
      },
    });
  },
  useRegister() {
    return useMutation({
      mutationFn: async (body: RegisterBody) => {
        return await authAction.register(body);
      },
    });
  },
};

export default useAuth;
