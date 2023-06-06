import { BaseUrl } from "../../utills/helper";
import { PROJECT_ERROR, PROJECT_REQUEST, PROJECT_SUCCESS } from "./project.types";

export const GetProject = (query,page,field) => async (dispatch) => {
    dispatch({ type: PROJECT_REQUEST });
    try {
        const response = await fetch(`${BaseUrl}/project/project?search=${query}&page=${page}&sort=${field}:asc`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        console.log(data)
        if (data.projects.length > 0) {
            dispatch({ type: PROJECT_SUCCESS, payload: data });
        } else {
            dispatch({ type: PROJECT_ERROR, payload: data.error });
        }
        return data;
    } catch (e) {
        dispatch({ type: PROJECT_ERROR, payload: e.message });
        console.log(e);
    }
};

export const GetProjectInfo = (query,page,field) => async (dispatch) => {
    try {
        const response = await fetch(`${BaseUrl}/project/projectinfo`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        return data;
    } catch (e) {
        console.log(e);
    }
};

export const GetDashboardChart = () => async () => {
    try {
        const response = await fetch(`${BaseUrl}/project/dashboardchart`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        console.log(data)
        return data;
    } catch (e) {
        console.log(e);
    }
};

export const UpdateProject = (url) => async (dispatch) => {
    dispatch({ type: PROJECT_REQUEST });
    try {
        const response = await fetch(`${BaseUrl}/project${url}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        console.log(data)
        if(data){
            return true
        }else{
            return false
        }
    } catch (e) {
        console.log(e);
    }
};


export const ProjectCreateData = (formdata) => async (dispatch) => {
    dispatch({ type: PROJECT_REQUEST })
    try {
        const response = await fetch(`${BaseUrl}/project/project/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formdata),
        });
        const data = await response.json();
        console.log(data);
        
        return data;
    }
    catch (e) {
        dispatch({ type: PROJECT_ERROR, payload: e.message })
        console.log(e)
    }
}

