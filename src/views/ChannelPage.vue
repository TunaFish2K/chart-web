<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { api, type ChannelInfo, type Chart } from '../config/api'

const route = useRoute()
const router = useRouter()

const channelInfo = ref<ChannelInfo | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const currentPage = ref(1)
const pageSize = ref(12) // 每页显示12个铺面
const pageSizeOptions = [6, 12, 24, 48] // 可选的每页显示数量

const channel = computed(() => route.params.channel as string)

// 计算总页数
const totalPages = computed(() => {
    if (!channelInfo.value) return 0
    return Math.ceil(channelInfo.value.count / pageSize.value)
})

// 获取当前页的铺面
const currentCharts = computed(() => {
    if (!channelInfo.value) return []

    return channelInfo.value.charts
})

const fetchChannelInfo = async () => {
    try {
        loading.value = true
        const data = await api.getChannelInfo(channel.value, currentPage.value, pageSize.value)
        channelInfo.value = data
    } catch (err) {
        error.value = err instanceof Error ? err.message : '未知错误'
    } finally {
        loading.value = false
    }
}

const navigateToChart = (chartId: string) => {
    router.push(`/${channel.value}/${chartId}`)
}

const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page
    }
}

const goToPreviousPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--
    }
}

const goToNextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++
    }
}

// 处理页面大小变化
const handlePageSizeChange = (newSize: number) => {
    pageSize.value = newSize
    currentPage.value = 1 // 重置到第一页
}

// 监听页码和页面大小变化重新获取数据
watch([currentPage, pageSize, channel], () => {
    fetchChannelInfo()
})

onMounted(() => {
    fetchChannelInfo()
})
</script>

<template>
    <div class="channel-page">
        <div v-if="loading" class="loading">加载中...</div>

        <div v-else-if="error" class="error">
            <h2>加载失败</h2>
            <p>{{ error }}</p>
            <button @click="fetchChannelInfo" class="retry-btn">重试</button>
        </div>

        <div v-else-if="channelInfo" class="channel-content">
            <header class="header">
                <h1>{{ channelInfo.name }}</h1>
                <p class="description">{{ channelInfo.description }}</p>
                <div class="stats">
                    共 {{ channelInfo.count }} 个铺面
                </div>
            </header>

            <section class="charts-section">
                <div class="charts-grid">
                    <div v-for="chart in currentCharts" :key="chart.id" class="chart-card"
                        @click="navigateToChart(chart.id)">
                        <div class="chart-image">
                            <img :src="chart.illustration" :alt="chart.name" />
                        </div>
                        <div class="chart-info">
                            <h3 class="chart-name">{{ chart.name }}</h3>
                            <div class="chart-level">难度: {{ chart.level }}</div>
                            <div class="chart-difficulty">数值难度: {{ chart.difficulty }}</div>
                            <div class="chart-charter">谱师: {{ chart.charter }}</div>
                        </div>
                    </div>
                </div>

                <!-- 分页控件 -->
                <div class="pagination">
                    <div class="page-size-selector">
                        <label for="pageSize">每页显示:</label>
                        <select id="pageSize" v-model="pageSize" @change="handlePageSizeChange(Number(pageSize))"
                            class="page-size-select">
                            <option v-for="size in pageSizeOptions" :key="size" :value="size">{{ size }}</option>
                        </select>
                    </div>

                    <button @click="goToPreviousPage" :disabled="currentPage === 1" class="page-btn">
                        上一页
                    </button>

                    <div class="page-numbers">
                        <button v-for="page in totalPages" :key="page" @click="goToPage(page)"
                            :class="{ active: page === currentPage }" class="page-number">
                            {{ page }}
                        </button>
                    </div>

                    <button @click="goToNextPage" :disabled="currentPage === totalPages" class="page-btn">
                        下一页
                    </button>
                </div>
            </section>
        </div>
    </div>
</template>

<style scoped>
.channel-page {
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
    text-align: center;
    margin-bottom: 3rem;
}

.header h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #333;
}

.description {
    font-size: 1.2rem;
    color: #666;
    line-height: 1.6;
    margin-bottom: 1rem;
}

.stats {
    font-size: 1rem;
    color: #888;
}

.charts-grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    margin-bottom: 2rem;
}

.chart-card {
    background-color: white;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.chart-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.chart-image {
    width: 100%;
    height: 200px;
    overflow: hidden;
}

.chart-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.chart-info {
    padding: 1rem;
}

.chart-name {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #333;
    line-height: 1.4;
}

.chart-level {
    font-size: 0.9rem;
    color: #007bff;
    font-weight: 500;
    margin-bottom: 0.25rem;
}

.chart-difficulty {
    font-size: 0.8rem;
    color: #666;
    margin-bottom: 0.25rem;
}

.chart-charter {
    font-size: 0.8rem;
    color: #888;
}

.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-top: 2rem;
}

.page-size-selector {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    color: #666;
}

.page-size-select {
    padding: 0.5rem;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    background-color: white;
    cursor: pointer;
    transition: all 0.2s ease;
}

.page-size-select:hover {
    border-color: #007bff;
}

.page-btn {
    padding: 0.5rem 1rem;
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.page-btn:hover:not(:disabled) {
    background-color: #e9ecef;
    border-color: #007bff;
}

.page-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.page-numbers {
    display: flex;
    gap: 0.5rem;
}

.page-number {
    padding: 0.5rem 0.75rem;
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.page-number:hover {
    background-color: #e9ecef;
    border-color: #007bff;
}

.page-number.active {
    background-color: #007bff;
    color: white;
    border-color: #007bff;
}
</style>