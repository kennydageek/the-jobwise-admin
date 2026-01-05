function errorHandler(e) {
  let defaultData = 'Unable to complete request';

  const statuses = (data) => ({
    400: { data: e.response?.data?.message || defaultData, action: () => {} },
    401: {
      data: document.location.pathname.includes('/login')
        ? data
        : 'You are not logged in',
      action: () => {
        localStorage.removeItem('authToken'); // Clear auth token
        window.location.href = '/login'; // Redirect to login page
      },
    },
    403: {
      data,
      action: () => {
        localStorage.removeItem('authToken'); // Clear auth token
        window.location.href = '/login'; //
      },
    },
    404: {
      data: e.response?.data?.message || 'Resource not found',
      action: () => {},
    },
    500: { data: 'Oops! An error occurred', action: () => {} },
  });

  const mode = e.response && statuses(e.response.data)[e.response.status];
  if (mode) {
    mode.action();
  }

  return {
    status: e.response ? e.response.status : 0,
    data: mode?.data || defaultData,
  };
}

function isUserLoggedIn() {
  return !!localStorage.getItem('access_token');
}

// Assuming you have a toast system

function resolveRequestError(err, throwAll = true) {
  const { status, data } = errorHandler(err);
  console.log(status, data);

  // If validation errors exist, throw them for form handling
  if (data.data) throw data.data;

  let text = data.message || (data.error && data.error[0]?.message) || data;

  if (status === 0) console.error('Network error:', text);

  if (throwAll) throw data;
}

export { isUserLoggedIn, resolveRequestError };
