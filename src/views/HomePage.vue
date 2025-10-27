<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { api, type SiteInfo } from '../config/api'

const router = useRouter()
const siteInfo = ref<SiteInfo | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

const fetchSiteInfo = async () => {
    try {
        const data = await api.getSiteInfo()
        siteInfo.value = data
    } catch (err) {
        error.value = err instanceof Error ? err.message : '未知错误'
    } finally {
        loading.value = false
    }
}

const navigateToChannel = (channel: string) => {
    // 只使用频道名称作为路径，而不是完整 URL
    const channelName = channel.split('/').pop() || channel
    router.push(`/${channelName}`)
}

// 获取频道的显示名称（从URL中提取频道名称）
const getChannelDisplayName = (channel: string) => {
    const channelName = channel.split('/').pop() || channel
    // 将频道名称转换为更友好的格式（例如：test -> Test）
    return channelName.charAt(0).toUpperCase() + channelName.slice(1)
}

onMounted(() => {
    fetchSiteInfo()
})
</script>

<template>
    <div class="home-page">
        <div v-if="loading" class="loading">加载中...</div>

        <div v-else-if="error" class="error">
            <h2>加载失败</h2>
            <p>{{ error }}</p>
            <button @click="fetchSiteInfo" class="retry-btn">重试</button>
        </div>

        <div v-else-if="siteInfo" class="site-info">
            <header class="header">
                <h1>{{ siteInfo.name }}</h1>
                <p class="description">{{ siteInfo.description }}</p>
            </header>

            <section class="channels-section">
                <h2>频道列表</h2>
                <div class="channels-grid">
                    <div v-for="channel in siteInfo.channels" :key="channel" class="channel-card"
                        @click="navigateToChannel(channel)">
                        <div class="channel-name">{{ getChannelDisplayName(channel) }}</div>
                        <div class="channel-arrow">→</div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<style scoped>
.home-page {
    max-width: 800px;
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
}

.channels-section h2 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    color: #333;
}

.channels-grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}

.channel-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.channel-card:hover {
    background-color: #e9ecef;
    border-color: #007bff;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.channel-name {
    font-size: 1.2rem;
    font-weight: 600;
    color: #333;
}

.channel-arrow {
    font-size: 1.5rem;
    color: #007bff;
}
</style>