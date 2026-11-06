import axios from "axios";
const tokenGenUrl = String(process.env.SF_TOKEN_URL || "https://testabc.com").trim();

export const newSfTokenGen = async () => {
    try {
        const response = await axios.post(tokenGenUrl);
        if (response.status === 200) {
            const token_type = response.data?.token_type;
            const access_token = response.data?.access_token;
            const newToken = `${token_type} ${access_token}`;
            return newToken;
        }
        else {
            throw new Error(response);
        }
    } catch (error) {
        console.error(error.message);
    }
}
