<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { api, type Chart } from '../config/api'

const route = useRoute()
const router = useRouter()

const chart = ref<Chart | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

const channel = computed(() => route.params.channel as string)
const chartId = computed(() => route.params.id as string)

const fetchChartInfo = async () => {
    try {
        loading.value = true
        const data = await api.getChartInfo(channel.value, chartId.value)
        chart.value = data
    } catch (err) {
        error.value = err instanceof Error ? err.message : '未知错误'
    } finally {
        loading.value = false
    }
}

const downloadFile = (fileType: 'file' | 'illustration' | 'preview') => {
    if (!chart.value) return

    const downloadUrl = api.getFileUrl(channel.value, chartId.value, fileType)

    // 直接打开下载链接，让浏览器处理下载
    window.open(downloadUrl, '_blank')
}

const goBack = () => {
    router.push(`/${channel.value}`)
}

onMounted(() => {
    fetchChartInfo()
})
</script>

<template>
    <div class="chart-page">
        <div v-if="loading" class="loading">加载中...</div>

        <div v-else-if="error" class="error">
            <h2>加载失败</h2>
            <p>{{ error }}</p>
            <button @click="fetchChartInfo" class="retry-btn">重试</button>
        </div>

        <div v-else-if="chart" class="chart-content">
            <header class="header">
                <button @click="goBack" class="back-btn">← 返回频道</button>
                <h1>{{ chart.name }}</h1>
                <div class="level-badge">{{ chart.level }}</div>
            </header>

            <div class="chart-layout">
                <!-- 左侧：曲绘和基本信息 -->
                <div class="left-column">
                    <div class="illustration-section">
                        <img :src="chart.illustration" :alt="chart.name" class="illustration" />
                    </div>

                    <div class="basic-info">
                        <div class="info-item">
                            <span class="label">数值难度:</span>
                            <span class="value">{{ chart.difficulty }}</span>
                        </div>
                        <div class="info-item">
                            <span class="label">谱师:</span>
                            <span class="value">{{ chart.charter }}</span>
                        </div>
                        <div class="info-item">
                            <span class="label">作曲家:</span>
                            <span class="value">{{ chart.composer }}</span>
                        </div>
                        <div class="info-item">
                            <span class="label">画师:</span>
                            <span class="value">{{ chart.illustrator }}</span>
                        </div>
                    </div>
                </div>

                <!-- 右侧：详细信息和下载区域 -->
                <div class="right-column">
                    <section class="description-section">
                        <h3>铺面描述</h3>
                        <p class="description-text">{{ chart.description }}</p>
                    </section>

                    <section class="download-section">
                        <h3>下载</h3>
                        <div class="download-buttons">
                            <button @click="downloadFile('file')" class="download-btn primary">
                                下载铺面文件
                            </button>
                            <button @click="downloadFile('illustration')" class="download-btn">
                                下载曲绘
                            </button>
                            <button @click="downloadFile('preview')" class="download-btn">
                                下载预览
                            </button>
                        </div>
                    </section>

                    <section class="technical-info">
                        <h3>技术信息</h3>
                        <div class="tech-grid">
                            <div class="tech-item">
                                <span class="tech-label">铺面ID:</span>
                                <span class="tech-value">{{ chart.id }}</span>
                            </div>
                            <div class="tech-item">
                                <span class="tech-label">频道:</span>
                                <span class="tech-value">{{ channel }}</span>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.chart-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
}

.loading,
.error {
    text-align: center;
    padding: 3rem;
}

.error {
    color: #dc3545;
}

.retry-btn {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #dee2e6;
}

.back-btn {
    padding: 0.5rem 1rem;
    background-color: #6c757d;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    text-decoration: none;
    transition: background-color 0.2s ease;
}

.back-btn:hover {
    background-color: #5a6268;
}

.header h1 {
    font-size: 2.2rem;
    margin: 0;
    color: #333;
    flex: 1;
}

.level-badge {
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: white;
    border-radius: 20px;
    font-weight: 600;
    font-size: 1.1rem;
}

.chart-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
}

.left-column {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.illustration-section {
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.illustration {
    width: 100%;
    height: auto;
    display: block;
}

.basic-info {
    background-color: #f8f9fa;
    padding: 1.5rem;
    border-radius: 8px;
    border: 1px solid #dee2e6;
}

.info-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 0;
    border-bottom: 1px solid #e9ecef;
}

.info-item:last-child {
    border-bottom: none;
}

.label {
    font-weight: 600;
    color: #495057;
}

.value {
    color: #333;
    font-weight: 500;
}

.right-column {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.description-section,
.download-section,
.technical-info {
    background-color: white;
    padding: 1.5rem;
    border-radius: 8px;
    border: 1px solid #dee2e6;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.description-section h3,
.download-section h3,
.technical-info h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    color: #333;
    font-size: 1.3rem;
}

.description-text {
    line-height: 1.6;
    color: #495057;
    margin: 0;
}

.download-buttons {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.download-btn {
    padding: 1rem 1.5rem;
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 500;
    transition: all 0.2s ease;
    text-align: center;
}

.download-btn:hover {
    background-color: #e9ecef;
    border-color: #007bff;
    transform: translateY(-1px);
}

.download-btn.primary {
    background-color: #007bff;
    color: white;
    border-color: #007bff;
}

.download-btn.primary:hover {
    background-color: #0056b3;
    border-color: #0056b3;
}

.tech-grid {
    display: grid;
    gap: 1rem;
}

.tech-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem;
    background-color: #f8f9fa;
    border-radius: 4px;
}

.tech-label {
    font-weight: 600;
    color: #495057;
}

.tech-value {
    color: #6c757d;
    font-family: monospace;
    font-size: 0.9rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .chart-layout {
        grid-template-columns: 1fr;
        gap: 2rem;
    }

    .header {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
    }

    .header h1 {
        font-size: 1.8rem;
    }

    .download-buttons {
        flex-direction: column;
    }
}
</style>