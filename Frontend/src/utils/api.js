const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

/**
 * Helper to build headers with auth
 */
const getHeaders = async (getToken) => {
  const headers = { "Content-Type": "application/json" };
  if (getToken) {
    const token = await getToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }
  return headers;
};

/**
 * Sync Clerk user to backend MongoDB
 */
export const syncUser = async (user, getToken) => {
  if (!user) return null;
  const res = await fetch(`${API_URL}/users/sync`, {
    method: "POST",
    headers: await getHeaders(getToken),
    body: JSON.stringify({
      clerkId: user.id,
      email: user.primaryEmailAddress?.emailAddress,
      firstName: user.firstName,
      lastName: user.lastName,
      avatarUrl: user.imageUrl,
    }),
  });
  return res.json();
};

/**
 * Create a new collaborative room
 */
export const createRoom = async (roomData, getToken) => {
  const res = await fetch(`${API_URL}/rooms`, {
    method: "POST",
    headers: await getHeaders(getToken),
    body: JSON.stringify(roomData),
  });
  return res.json();
};

/**
 * Fetch a room by ID to validate before joining
 */
export const getRoom = async (roomId, getToken) => {
  const res = await fetch(`${API_URL}/rooms/${roomId}`, {
    headers: await getHeaders(getToken),
  });
  return res.json();
};

/**
 * Fetch all rooms shared with a specific user
 */
export const getSharedRooms = async (clerkId, getToken) => {
  if (!clerkId) return { data: [] };
  const res = await fetch(`${API_URL}/rooms/shared/${clerkId}`, {
    headers: await getHeaders(getToken),
  });
  return res.json();
};

/**
 * Fetch real-time live room & collaborator statistics
 */
export const fetchLiveRoomStats = async () => {
  const res = await fetch(`${API_URL}/rooms/stats/live`);
  return res.json();
};

/**
 * Team API Endpoints
 */
export const fetchTeams = async (getToken) => {
  const res = await fetch(`${API_URL}/teams`, {
    headers: await getHeaders(getToken),
  });
  return res.json();
};

export const createBackendTeam = async (teamData, getToken) => {
  const res = await fetch(`${API_URL}/teams`, {
    method: "POST",
    headers: await getHeaders(getToken),
    body: JSON.stringify(teamData),
  });
  return res.json();
};

export const addBackendTeamRoom = async (teamId, roomData, getToken) => {
  const res = await fetch(`${API_URL}/teams/${teamId}/rooms`, {
    method: "POST",
    headers: await getHeaders(getToken),
    body: JSON.stringify(roomData),
  });
  return res.json();
};

export const joinBackendTeam = async (teamId, userData, getToken) => {
  const res = await fetch(`${API_URL}/teams/${teamId}/join`, {
    method: "POST",
    headers: await getHeaders(getToken),
    body: JSON.stringify(userData),
  });
  return res.json();
};

export const deleteBackendTeam = async (teamId, getToken) => {
  const res = await fetch(`${API_URL}/teams/${teamId}`, {
    method: "DELETE",
    headers: await getHeaders(getToken),
  });
  return res.json();
};

/**
 * Razorpay Payment API Endpoints
 */
export const createPaymentOrder = async (plan, getToken) => {
  const res = await fetch(`${API_URL}/payment/create-order`, {
    method: "POST",
    headers: await getHeaders(getToken),
    body: JSON.stringify({ plan }),
  });
  return res.json();
};

export const verifyPaymentSignature = async (paymentData, getToken) => {
  const res = await fetch(`${API_URL}/payment/verify`, {
    method: "POST",
    headers: await getHeaders(getToken),
    body: JSON.stringify(paymentData),
  });
  return res.json();
};

export const getSubscriptionStatus = async (getToken) => {
  const res = await fetch(`${API_URL}/payment/status`, {
    headers: await getHeaders(getToken),
  });
  return res.json();
};

