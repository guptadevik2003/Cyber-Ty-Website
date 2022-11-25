const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')

// Custom Modules
const dashboardSchema = require('../schemas/dashboard')

// /api
router.get('/', async (req, res) => {
    res.status(200).json({ success: true, message: `API Route Working!`, timestamp: Date.now() })
})

// /api/resources
router.get('/resources', async (req, res) => {

    const panelServerLink = process.env.PANEL_SERVER_LINK
    const panelServerApiKey = process.env.PANEL_SERVER_API_KEY

    async function fetchData(url) {
        return await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${panelServerApiKey}`
            }
        })
        .then(res => res.json())
        .then(data => { return data })
    }

    const serverTotal = await fetchData(`${panelServerLink}`)
    const serverUsage = await fetchData(`${panelServerLink}/resources`)

    res.json({
        success: true,
        message: {
            total: {
                cpu: serverTotal.attributes.limits.cpu,
                memory: serverTotal.attributes.limits.memory,
                disk: serverTotal.attributes.limits.disk
            },
            usage: {
                current_state: serverUsage.attributes.current_state,
                cpu_absolute: serverUsage.attributes.resources.cpu_absolute,
                memory_bytes: serverUsage.attributes.resources.memory_bytes,
                disk_bytes: serverUsage.attributes.resources.disk_bytes,
                uptime: serverUsage.attributes.resources.uptime
            }
        }
    })

})

// /api/status/server
router.get('/status/server', async (req, res) => {

    const panelServerLink = process.env.PANEL_SERVER_LINK
    const panelServerApiKey = process.env.PANEL_SERVER_API_KEY
    
    let serverDetail
    await fetch(`${panelServerLink}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${panelServerApiKey}`
        }
    })
    .then(response => response.json())
    .then(data => { serverDetail = data })

    let serverUsage
    await fetch(`${panelServerLink}/resources`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${panelServerApiKey}`
        }
    })
    .then(response => response.json())
    .then(data => { serverUsage = data })

    res.json({
        memoryTotalMB: serverDetail.attributes.limits.memory,
        diskTotalMB: serverDetail.attributes.limits.disk,
        cpuTotalPercent: serverDetail.attributes.limits.cpu,
        currentState: serverUsage.attributes.current_state,
        memoryUsageBytes: serverUsage.attributes.resources.memory_bytes,
        diskUsageBytes: serverUsage.attributes.resources.disk_bytes,
        cpuUsagePercent: serverUsage.attributes.resources.cpu_absolute
    })

})

router.get('/status/database', async (req, res) => {

    let dashboardData = await dashboardSchema.findOne({ botUserId: '919212093444616203' })    

    res.json({
        botUserId: dashboardData.botUserId,
        botUserName: dashboardData.botUserName,
        botUserTag: dashboardData.botUserTag,
        botAvatar: dashboardData.botAvatar,
        botUptime: dashboardData.botUptime,
        botUptimeUpdatedAt: dashboardData.botUptimeUpdatedAt,
        botWSPing: dashboardData.botWSPing,
        botGuildCount: dashboardData.botGuildCount,
        botUserCount: dashboardData.botUserCount
    })
    
})

module.exports = router
