// API client for BiteVote backend

const API_BASE = import.meta.env.VITE_API_BASE || '';

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const res = await fetch(url, config);
    if (!res.ok) {
      let errorMsg = `HTTP Error ${res.status}`;
      try {
        const errorData = await res.json();
        errorMsg = errorData.detail || errorMsg;
      } catch (e) {
        // Fallback to text
      }
      throw new Error(errorMsg);
    }
    return await res.json();
  } catch (err) {
    console.error(`API Error on ${endpoint}:`, err);
    throw err;
  }
}

export const api = {
  getHealth: () => request('/api/health'),
  getRestaurants: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/api/restaurants${query ? `?${query}` : ''}`);
  },
  createRoom: (data) => request('/api/rooms', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  getRoom: (code) => request(`/api/rooms/${code.toUpperCase().trim()}`),
  joinRoom: (code, data) => request(`/api/rooms/${code.toUpperCase().trim()}/join`, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  updatePreferences: (code, participantId, prefs) => 
    request(`/api/rooms/${code.toUpperCase().trim()}/preferences?participant_id=${participantId}`, {
      method: 'POST',
      body: JSON.stringify(prefs),
    }),
  updateRoomStatus: (code, status) => 
    request(`/api/rooms/${code.toUpperCase().trim()}/status?status=${status}`, {
      method: 'POST',
    }),
  submitVotes: (code, data) => 
    request(`/api/rooms/${code.toUpperCase().trim()}/vote`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  decideRoom: (code, data = null) => 
    request(`/api/rooms/${code.toUpperCase().trim()}/decide`, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    }),
  resetRoom: (code) => 
    request(`/api/rooms/${code.toUpperCase().trim()}/reset`, {
      method: 'POST',
    }),
};
