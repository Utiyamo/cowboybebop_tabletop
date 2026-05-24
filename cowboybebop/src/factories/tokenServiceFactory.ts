import { ApplicationProps } from "@/entities/applicationProps";
import { TokenService } from "@/services/tokenService";

export const tokenServiceFactory = await TokenService.create(ApplicationProps.secretKey, 60);