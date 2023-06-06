import { PROJECT_ERROR, PROJECT_REQUEST, PROJECT_SUCCESS } from "./project.types";

const intialState = {
    data: [],
    loading: false,
    totalPage:1,
    error: false,
    message: "",
};

export const projectReducer = (state = intialState, { type, payload }) => {
    switch (type) {
        case PROJECT_REQUEST: {
            return {
                ...state,
                loading: true,
                message:"...Loading",
                error: false,
            }
        }
        case PROJECT_SUCCESS: {
            return {
                ...state,
                data:payload.projects,
                totalPage:payload.pagination.pageCount,
                loading: false,
                error: false,
                message: payload.message
            }
        }
        case PROJECT_ERROR: {
            return {
                ...state,
                loading: false,
                error: true,
                message: "Inavalid Project Details!"
            }
        }

        default: {
            return state;
        }
    }
}



