const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')

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

module.exports = router
