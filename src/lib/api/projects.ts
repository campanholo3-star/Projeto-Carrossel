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
