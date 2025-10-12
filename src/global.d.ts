import { UserAgentData } from "./types";

export { };

declare global {
    interface Navigator {
        userAgentData: UserAgentData;
    }
}