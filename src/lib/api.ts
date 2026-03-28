const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('jap_token');
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Xatolik yuz berdi' }));
    throw new Error(error.message || `HTTP ${res.status}`);
  }

  return res.json();
}

export const api = {
  // Auth
  register: (data: { email: string; password: string; firstName: string; lastName: string }) =>
    request('/auth/register', { method: 'POST', body: JSON.stringify(data) }),

  login: (data: { email: string; password: string }) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify(data) }),

  me: () => request('/auth/me'),

  updateProfile: (data: { firstName?: string; lastName?: string; phone?: string }) =>
    request('/auth/profile', { method: 'PUT', body: JSON.stringify(data) }),

  // Topics
  getTopics: () => request('/topics'),

  getTopic: (id: string) => request(`/topics/${id}`),

  createTopic: (data: { name: string; symbol: string; number: string; color: string }) =>
    request('/topics', { method: 'POST', body: JSON.stringify(data) }),

  updateTopic: (id: string, data: Record<string, unknown>) =>
    request(`/topics/${id}`, { method: 'PUT', body: JSON.stringify(data) }),

  deleteTopic: (id: string) =>
    request(`/topics/${id}`, { method: 'DELETE' }),

  // Questions
  getQuestions: (topicId: string) => request(`/questions/topic/${topicId}`),

  createQuestion: (data: {
    topicId: string; text: string;
    optionA: string; optionB: string; optionC: string; optionD: string;
    correct: number;
  }) => request('/questions', { method: 'POST', body: JSON.stringify(data) }),

  updateQuestion: (id: string, data: Record<string, unknown>) =>
    request(`/questions/${id}`, { method: 'PUT', body: JSON.stringify(data) }),

  deleteQuestion: (id: string) =>
    request(`/questions/${id}`, { method: 'DELETE' }),

  // Results
  submitResult: (data: { topicId: string; answers: Record<string, number>; timeSpent: number }) =>
    request('/results/submit', { method: 'POST', body: JSON.stringify(data) }),

  getMyResults: () => request('/results/my'),

  getAllResults: () => request('/results/all'),

  // Notifications
  getNotifications: () => request('/notifications'),

  getUnreadCount: () => request<{ count: number }>('/notifications/unread-count'),

  markNotificationRead: (id: string) =>
    request(`/notifications/${id}/read`, { method: 'PATCH' }),

  markAllNotificationsRead: () =>
    request('/notifications/read-all', { method: 'PATCH' }),

  // Contacts
  submitContact: (data: { fullName: string; phone: string; message?: string }) =>
    request('/contacts', { method: 'POST', body: JSON.stringify(data) }),

  getContacts: () => request('/contacts'),

  markContactHandled: (id: string) =>
    request(`/contacts/${id}/handled`, { method: 'PATCH' }),

  // Teachers (admin only)
  getTeachers: () => request('/teachers'),

  createTeacher: (data: { email: string; password: string; firstName: string; lastName: string; phone?: string }) =>
    request('/teachers', { method: 'POST', body: JSON.stringify(data) }),

  deleteTeacher: (id: string) =>
    request(`/teachers/${id}`, { method: 'DELETE' }),

  getAllStudents: () => request('/teachers/students'),

  // Groups
  getGroups: () => request('/groups'),

  getMyGroups: () => request('/groups/my'),

  getGroup: (id: string) => request(`/groups/${id}`),

  getGroupResults: (id: string) => request(`/groups/${id}/results`),

  createGroup: (data: { name: string; color?: string }) =>
    request('/groups', { method: 'POST', body: JSON.stringify(data) }),

  updateGroup: (id: string, data: Record<string, unknown>) =>
    request(`/groups/${id}`, { method: 'PUT', body: JSON.stringify(data) }),

  deleteGroup: (id: string) =>
    request(`/groups/${id}`, { method: 'DELETE' }),

  assignTeacherToGroup: (groupId: string, teacherId: string) =>
    request(`/groups/${groupId}/teachers`, { method: 'POST', body: JSON.stringify({ userId: teacherId }) }),

  removeTeacherFromGroup: (groupId: string, teacherId: string) =>
    request(`/groups/${groupId}/teachers/${teacherId}`, { method: 'DELETE' }),

  addMemberToGroup: (groupId: string, userId: string) =>
    request(`/groups/${groupId}/members`, { method: 'POST', body: JSON.stringify({ userId }) }),

  removeMemberFromGroup: (groupId: string, userId: string) =>
    request(`/groups/${groupId}/members/${userId}`, { method: 'DELETE' }),

  assignTopicToGroup: (groupId: string, topicId: string) =>
    request(`/groups/${groupId}/topics`, { method: 'POST', body: JSON.stringify({ userId: topicId }) }),

  removeTopicFromGroup: (groupId: string, topicId: string) =>
    request(`/groups/${groupId}/topics/${topicId}`, { method: 'DELETE' }),
};
