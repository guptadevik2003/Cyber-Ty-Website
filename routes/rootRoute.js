const express = require('express')
const router = express.Router()

// /invite
router.get('/invite', async (req, res) => {
    res.redirect(`https://discord.com/api/oauth2/authorize?client_id=919212093444616203&permissions=1241211333751&scope=bot%20applications.commands`)
})

// /supportserver
router.get('/supportserver', async (req, res) => {
    res.redirect(`https://discord.gg/XUwgs6vp36`)
})

// /topgg
router.get('/topgg', async (req, res) => {
    res.redirect(`https://top.gg/bot/919212093444616203`)
})

// /arc-sw.js
router.get('/arc-sw.js', async (req, res) => {
    res.sendFile(`${process.cwd()}/views/arc-sw.js`)
})

// /terms-of-service
router.get('/terms-of-service', async (req, res) => {
    res.render('terms-of-service.ejs')
})
router.get('/tos', async (req, res) => {
    res.redirect('/terms-of-service')
})
router.get('/terms', async (req, res) => {
    res.redirect('/terms-of-service')
})

// /privacy-policy
router.get('/privacy-policy', async (req, res) => {
    res.render('privacy-policy.ejs')
})
router.get('/privacy', async (req, res) => {
    res.redirect('/privacy-policy')
})

// /
router.get('/', async (req, res) => {
    res.render('home.ejs')
})
router.get('/home', async (req, res) => {
    res.redirect('/')
})
router.get('/index', async (req, res) => {
    res.redirect('/')
})

// /assets
router.get('/assets', async (req, res) => {
    res.render('assets-page.ejs')
})

// /status
router.get('/status', async (req, res) => {
    res.render('status.ejs')
})

// /commands
router.get('/commands', async (req, res) => {
    res.render('commands.ejs')
})

// /device-width
router.get('/device-width', async (req, res) => {
    res.render('device-width.ejs')
})

module.exports = router
