import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class NeighborhoodRecipeApi {
    // the token for interactive with the API will be stored here.
    //static token = "";

    constructor() {
        this.token = "";
    }

    async request(endpoint, data = {}, method = "get", tokenInput = null) {
        console.debug("API Call:", endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        if (tokenInput) this.token = tokenInput;
        const headers = { Authorization: `Bearer ${this.token}` };
        const params = (method === "get") ?
            data : {};
        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }



    /////////////////////
    //Register - Login functions
    /////////////////////

    /**
     * Creates a new registration for new user using a post request
     * @param {Obj} newUser a new user's data to be added to the database 
     * @returns a token to be used for future requests. The user is logged in.
     */
    async postNewRegistration(newUser) {
        try {
            let res = await this.request(`auth/register`, newUser, "post");
            return { token: res.token, user: res.user };
        } catch (e) {
            return { error: e };
        }
    }

    /**
     * Applies a user's credentials and supplies a token if they are valid
     * @param {Obj} login a user's existing credentials 
     * @returns a toekn to be used for future requests. The user is logged in.
     */
    async postNewLogin(login) {
        try {
            let res = await this.request(`auth/token`, login, "post");
            return { token: res.token, user: res.user };
        } catch (e) {
            return { error: "Invalid login" }
        }
    }

    async

    /////////////////////
    //User functions
    /////////////////////
    async getListOfUsers() {
        try {
            let res = await this.request(`users`);
            return res.users;
        } catch (e) {
            return { error: e };
        }
    }

    async getOneUser(uuid) {
        try {
            let res = await this.request(`users/${uuid}`);
            return res.user;
        } catch (e) {
            return { error: e }
        }
    }

    async updateUser(update) {
        try {
            let res = await this.request(`users/${update.userUuId}`, update, 'post');
            return res.user;
        } catch (e) {
            return { error: e }
        }
    }

    async lookUpUserWithEmail(email) {
        try {
            let res = await this.request(`users/emailSearch`, { email: email }, 'post');
            return res
        } catch (e) {
            return { error: e }
        }
    }

    async connectWithUser(uuid) {
        try {
            let res = await this.request(`users/connect/${uuid}`, {}, "post");
            return res.message;
        } catch (e) {
            return { error: e }
        }
    }

    async removeConnectWithUser(uuid) {
        try {
            let res = await this.request(`users/connect/${uuid}`, {}, "delete");
            return res.user;
        } catch (e) {
            return { error: e }
        }
    }

    /////////////////////
    //Recipe functions
    /////////////////////
    async getAllRecipes() {
        try {
            let res = await this.request(`recipes/adminall`);
            return res.recipes;
        } catch (e) {
            return { error: e };
        }
    }

    async getRecipes(token = null, search = "") {
        try {
            let res;
            let searchQuery
            if (search != "") {
                searchQuery = `?search=${search}`
            } else {
                searchQuery = ""
            }
            if (token) {
                res = await this.request(`recipes/view${searchQuery}`, {}, "get", token);
            } else {
                res = await this.request(`recipes/view${searchQuery}`);
            }
            return res.recipes;
        } catch (e) {
            return { error: e };
        }
    }

    async getRecipe(uuid, token) {
        try {
            let res = await this.request(`recipes/${uuid}`, {}, "get", token);
            return res.recipe;
        } catch (e) {
            return { error: e };
        }
    }

    async researchRecipe(uuid) {
        try {
            let res = await this.request(`recipes/research${uuid}`);
            if (res.message) return res.message;
            return res;
        } catch (e) {
            return { error: e };
        }
    }

    async createRecipe(data) {
        try {
            let res = await this.request(`recipes`, data, 'post');
            return res.validMessage;
        } catch (e) {
            return { error: e };
        }
    }

    async updateRecipe(data) {
        try {
            let res = await this.request(`recipes`, data, 'patch');
            return res.validMessage;
        } catch (e) {
            return { error: e };
        }
    }

    async deleteRecipe(uuid) {
        try {
            let res = await this.request(`recipes/${uuid}`, {}, 'delete');
            return res.message;
        } catch (e) {
            return { error: e };
        }
    }

    /////////////////////
    //Ingredient functions
    /////////////////////
    async lookupAutoCompletes(lookup) {
        try {
            let res = await this.request(`ingredients?lookup=${lookup}`);
            return res.ingredients;
        } catch (e) {
            return { error: e };
        }
    }
}

// for now, put token ("testuser" / "password" on class)
NeighborhoodRecipeApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default NeighborhoodRecipeApi;