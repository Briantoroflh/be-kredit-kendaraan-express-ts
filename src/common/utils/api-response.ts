interface apiResponse {
    success: boolean
    message?: String
    data?: Object
    errors?: Object
}

const successResponse = (message?: string, data?: object): apiResponse => {
    const response: apiResponse = {
        success: true,
        message: message
    }

    if(data) {
        response.data = data
    }

    return response
}

const errorsResponse = (message?: string, errors?: object): apiResponse => {
    const response: apiResponse = {
        success: false,
        message: message
    }

    if(errors) {
        response.errors = errors
    }

    return response;
}

export {successResponse, errorsResponse}