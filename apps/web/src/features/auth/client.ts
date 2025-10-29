"use client";

import { useRouter } from "next/navigation";
import { createAuthClient, ErrorContext } from "better-auth/react";
import { SupportedOauthProviders } from "./type";
import { ERROR_CALLBACK_URL, SUCCESS_CALLBACK_URL } from "./constant";

const authClient = createAuthClient({});

type CustomFetchOptions = {
  onSuccess?: () => void;
  onError?: (error: ErrorContext) => void;
};

type SignInSocialParams = {
  provider: SupportedOauthProviders;
  callbackURL?: string;
  errorCallbackURL?: string;
};

type SignOutParams = {
  router: ReturnType<typeof useRouter>;
  redirectTo?: string;
  customOptions?: CustomFetchOptions;
};

const authService = {
  signIn: {
    social: async ({
      provider,
      callbackURL = SUCCESS_CALLBACK_URL,
      errorCallbackURL = ERROR_CALLBACK_URL,
    }: SignInSocialParams): Promise<void> => {
      try {
        await authClient.signIn.social({
          provider,
          callbackURL,
          errorCallbackURL,
        });
      } catch (error) {
        console.error("Sign-in error:", error);
        throw error;
      }
    },
  },
  signOut: async ({
    router,
    redirectTo = "/",
    customOptions,
  }: SignOutParams): Promise<void> => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            customOptions?.onSuccess?.();
            router.push(redirectTo);
          },
          onError: (error) => {
            console.error("Sign-out error:", error);
            customOptions?.onError?.(error);
          },
        },
      });
    } catch (error) {
      console.error("Sign-out error:", error);
      throw error;
    }
  },
  getSession: async (
    customOptions?: CustomFetchOptions
  ): Promise<Awaited<ReturnType<typeof authClient.getSession>>> => {
    try {
      return await authClient.getSession({
        fetchOptions: customOptions,
      });
    } catch (error) {
      console.error("Get session error:", error);
      throw error;
    }
  },
};

export const useAuth = () => {
  const router = useRouter();

  return {
    signIn: {
      social: (params: SignInSocialParams) => authService.signIn.social(params),
    },
    signOut: (redirectTo?: string, customOptions?: CustomFetchOptions) =>
      authService.signOut({ router, redirectTo, customOptions }),
    getSession: (customOptions?: CustomFetchOptions) =>
      authService.getSession(customOptions),
  };
};
