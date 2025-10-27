// API 配置
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

// 接口类型定义
export interface SiteInfo {
  name: string
  description: string
  channels: string[]
}

export interface ChannelInfo {
  name: string
  description: string
  count: number
  charts: Chart[]
}

export interface Chart {
  id: string
  name: string
  level: string
  difficulty: number
  charter: string
  composer: string
  illustrator: string
  description: string
  illustration: string
  preview: string
  file: string
}

// API 调用函数
export const api = {
  // 获取站点信息
  async getSiteInfo(): Promise<SiteInfo> {
    const response = await fetch(`${API_BASE_URL}/`)
    if (!response.ok) {
      throw new Error('获取站点信息失败')
    }
    return response.json()
  },

  // 获取频道信息
  async getChannelInfo(
    channel: string,
    page: number = 1,
    pageSize: number = 12,
  ): Promise<ChannelInfo> {
    const response = await fetch(`${API_BASE_URL}/${channel}?page=${page}&pageNum=${pageSize}`)
    if (!response.ok) {
      throw new Error('获取频道信息失败')
    }
    return response.json()
  },

  // 获取铺面详情
  async getChartInfo(channel: string, chartId: string): Promise<Chart> {
    const response = await fetch(`${API_BASE_URL}/${channel}/${chartId}`)
    if (!response.ok) {
      throw new Error('获取铺面信息失败')
    }
    return response.json()
  },

  // 获取文件下载链接
  getFileUrl(
    channel: string,
    chartId: string,
    fileType: 'file' | 'illustration' | 'preview',
  ): string {
    return `${API_BASE_URL}/${channel}/${chartId}/${fileType}`
  },
}
