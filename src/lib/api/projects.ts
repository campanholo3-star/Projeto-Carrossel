import { Project } from '@/types'
import { ApiResponse } from '@/lib/validation/apiResponse'

export interface ListProjectsData {
  projects: Project[]
  total: number
  page: number
  limit: number
}

export async function listProjects(page = 1, limit = 10): Promise<ApiResponse<ListProjectsData>> {
  const res = await fetch(`/api/v1/projects?page=${page}&limit=${limit}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return res.json()
}

export async function deleteProject(id: string): Promise<ApiResponse<{ deleted: boolean }>> {
  const res = await fetch(`/api/v1/projects/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return res.json()
}

export async function importProject(jsonString: string): Promise<ApiResponse<{ id: string, title: string }>> {
  const res = await fetch(`/api/v1/import`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: jsonString,
  })
  return res.json()
}

export async function getProject(id: string): Promise<ApiResponse<Project>> {
  const res = await fetch(`/api/v1/projects/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return res.json()
}

export async function updateProject(id: string, payload: Partial<Project>): Promise<ApiResponse<Project>> {
  const res = await fetch(`/api/v1/projects/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  return res.json()
}
