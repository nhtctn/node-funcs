const ajaxCall = (url) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: url,
      type: 'GET',
      success: function (response) {
        resolve(response) // Resolve the promise with the data
      },
      error: function (xhr, status, error) {
        reject(error) // Reject the promise with the error
      },
    })
  })
}

module.exports = ajaxCall
