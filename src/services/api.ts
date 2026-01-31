const API_BASE_URL = 'http://localhost:5000/api';

// Types
export interface Project {
  id: number;
  title: string;
  description: string;
  category: 'residential' | 'commercial';
  location: string;
  image: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  description: string;
  image: string;
  order: number;
  isCEO: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  features: string[];
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface ContactFormData {
  fullName: string;
  email?: string;
  phone?: string;
  message?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Auth helper
const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem('adminToken');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const getAuthHeadersMultipart = (): HeadersInit => {
  const token = localStorage.getItem('adminToken');
  return {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

// API Functions
export const fetchProjects = async (): Promise<Project[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/projects`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch projects');
    }

    return data.data || data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

export const fetchProject = async (id: number): Promise<Project> => {
  try {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch project');
    }

    return data.data || data;
  } catch (error) {
    console.error('Error fetching project:', error);
    throw error;
  }
};

export const fetchTeamMembers = async (): Promise<TeamMember[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/team`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch team members');
    }

    return data.data || data;
  } catch (error) {
    console.error('Error fetching team members:', error);
    throw error;
  }
};

export const submitContactForm = async (formData: ContactFormData): Promise<ApiResponse<any>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to submit contact form');
    }

    return { success: true, data, message: 'Message sent successfully!' };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send message'
    };
  }
};

// ==================== ADMIN API FUNCTIONS ====================

// Auth
export const adminLogin = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Login failed');
  }
  const loginData = data.data || data;
  // Transform flat response to expected format with nested user object
  return {
    token: loginData.token,
    user: {
      id: loginData.id,
      email: loginData.email,
      name: loginData.name,
    },
  };
};

export const getMe = async (): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    headers: getAuthHeaders(),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to get user');
  }
  return data.data || data;
};

// Messages
export const fetchMessages = async (): Promise<Message[]> => {
  const response = await fetch(`${API_BASE_URL}/messages`, {
    headers: getAuthHeaders(),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch messages');
  }
  return data.data || data;
};

export const fetchMessage = async (id: number): Promise<Message> => {
  const response = await fetch(`${API_BASE_URL}/messages/${id}`, {
    headers: getAuthHeaders(),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch message');
  }
  return data.data || data;
};

export const updateMessageReadStatus = async (id: number, isRead: boolean): Promise<Message> => {
  const response = await fetch(`${API_BASE_URL}/messages/${id}`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify({ isRead }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to update message');
  }
  return data.data || data;
};

export const deleteMessage = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/messages/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || 'Failed to delete message');
  }
};

// Projects (Admin)
export const createProject = async (formData: FormData): Promise<Project> => {
  const response = await fetch(`${API_BASE_URL}/projects`, {
    method: 'POST',
    headers: getAuthHeadersMultipart(),
    body: formData,
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to create project');
  }
  return data.data || data;
};

export const updateProject = async (id: number, formData: FormData): Promise<Project> => {
  const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
    method: 'PUT',
    headers: getAuthHeadersMultipart(),
    body: formData,
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to update project');
  }
  return data.data || data;
};

export const deleteProject = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || 'Failed to delete project');
  }
};

// Team (Admin)
export const createTeamMember = async (formData: FormData): Promise<TeamMember> => {
  const response = await fetch(`${API_BASE_URL}/team`, {
    method: 'POST',
    headers: getAuthHeadersMultipart(),
    body: formData,
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to create team member');
  }
  return data.data || data;
};

export const updateTeamMember = async (id: number, formData: FormData): Promise<TeamMember> => {
  const response = await fetch(`${API_BASE_URL}/team/${id}`, {
    method: 'PUT',
    headers: getAuthHeadersMultipart(),
    body: formData,
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to update team member');
  }
  return data.data || data;
};

export const deleteTeamMember = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/team/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || 'Failed to delete team member');
  }
};

// Services
export const fetchServices = async (): Promise<Service[]> => {
  const response = await fetch(`${API_BASE_URL}/services`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch services');
  }
  return data.data || data;
};

export const createService = async (service: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>): Promise<Service> => {
  const response = await fetch(`${API_BASE_URL}/services`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(service),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to create service');
  }
  return data.data || data;
};

export const updateService = async (id: number, service: Partial<Service>): Promise<Service> => {
  const response = await fetch(`${API_BASE_URL}/services/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(service),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to update service');
  }
  return data.data || data;
};

export const deleteService = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/services/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || 'Failed to delete service');
  }
};
