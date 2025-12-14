const handleResponse = (res, statusCode, message, data = null) => {
    return res.status(statusCode).json({
        success: true,
        message: message,
        data: data
    });
};

export default handleResponse;