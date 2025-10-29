import { auth } from "./server";
import { SUPPORTED_OAUTH_PROVIDERS } from "./constant";

export type Session = ReturnType<typeof auth.api.getSession>;
export type IconType = React.FC<React.SVGProps<SVGSVGElement>>;
export type SupportedOauthProviders =
  (typeof SUPPORTED_OAUTH_PROVIDERS)[number];
