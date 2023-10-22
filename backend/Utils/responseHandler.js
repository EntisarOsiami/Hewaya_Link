function sendResponse(res, data, message, success = true) {
    res.status(success ? 200 : 400).json({
      success,
      data,
      message,
    });
  }
  
  export default sendResponse;
  