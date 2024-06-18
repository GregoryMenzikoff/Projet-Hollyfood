import React, { useEffect, useContext } from "react";
import apiFetch from "../Utils/apiFetch";

const userService = {
    getAllUsers: async () => {
        try {
            const data = await apiFetch('admin/users', {}, 'GET');
            console.log(data)
            return data;
        } catch (error) {
            console.error("Error fetching all users:", error);
            throw error;
        }
    },

    getUser: async (userId) => {
        try {
            const data = await apiFetch(`admin/user/${userId}`, {}, 'GET');
            return data;
        } catch (error) {
            console.error(`Error fetching user with id ${userId}:`, error);
            throw error;
        }
    }
};

export default userService;
