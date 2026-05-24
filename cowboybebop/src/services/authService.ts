import { ApplicationProps } from "@/entities/applicationProps";
import { ResultState } from "@/entities/types/baseResult";
import { UserProps } from "@/entities/types/user";

class AuthService {
    async authenticate(apiKey: string, userId: string): Promise<ResultState<UserProps>> {
    
        console.log("Authenticating user with API key:", apiKey, "and user ID:", userId);

        if(!apiKey || !userId){
            return {
                statusCode: 400,
                error: "API key and user ID are required",
                isSuccess: false,
                data: null
            };
        }

        const isApiKeyValid = ApplicationProps.apiKeys.includes(apiKey);
        const isUserIdValid = ApplicationProps.userIds.includes(userId);

        // Simulate authentication logic (replace with real implementation)
        if(isApiKeyValid && isUserIdValid){
            console.log("Authentication successful for user ID:", userId);
            return {
                statusCode: 200,
                success: "Authentication successful",
                isSuccess: true,
                data: {
                    id: userId,
                    apiKey: apiKey
                }
            };
        } else {
            if(!isApiKeyValid) console.warn("Invalid API key provided:", apiKey);
            else if(!isUserIdValid) console.warn("Invalid user ID provided:", userId);

            return {
                statusCode: 401,
                error: "Invalid Authentication credentials",
                isSuccess: false,
                data: null
            };
        }
    }
}

const authService = new AuthService();

export default authService;