// Assigning Elements
var nextUpdateInElement
var botImageElement
var botNameElement
var startStopButtonElement
var uptimeStatusElement
var botPingElement
var guildCountElement
var userCountElement
var CPUmeterElement
var CPUpercentElement
var RAMmeterElement
var RAMpercentElement
// Assigning Elements

// Loading Elements on Body Load
async function bodyLoaded() {

    nextUpdateInElement = document.getElementById('nextUpdateIn')
    botImageElement = document.getElementById('botImage')
    botNameElement = document.getElementById('botName')
    startStopButtonElement = document.getElementById('startStopButton')
    uptimeStatusElement = document.getElementById('uptimeStatus')
    botPingElement = document.getElementById('botPing')
    guildCountElement = document.getElementById('guildCount')
    userCountElement = document.getElementById('userCount')
    CPUmeterElement = document.getElementById('CPUmeter')
    CPUpercentElement = document.getElementById('CPUpercent')
    RAMmeterElement = document.getElementById('RAMmeter')
    RAMpercentElement = document.getElementById('RAMpercent')

    StartStopClick()

}

// Function to convert Sec to MilliSec
function secToMS(sec) {
    return sec * 1000
}

// Start / Stop Button
var startStopClicked = 'no'
async function StartStopClick() {
    if (startStopClicked === 'no') {
        startDashboard()
        startStopClicked = 'yes'
        startStopButtonElement.innerHTML = 'Stop'
        return;
    }
    if (startStopClicked === 'yes') {
        stopDashboard()
        startStopClicked = 'no'
        startStopButtonElement.innerHTML = 'Start'
        return;
    }
}

// Watchbot Button
async function watchBotClick() {
    window.open('https://status.watchbot.app/bot/919212093444616203', '_self')
}

// Main Function Interval Killer
let intervalTimer = 30
let nextUpdateInTimer = intervalTimer
let dashboardInterval
let nextUpdateInterval
async function stopDashboard() {
    clearInterval(dashboardInterval)
    clearInterval(nextUpdateInterval)
}

// Main Function
async function startDashboard() {

    await valueSetter()

    nextUpdateInElement.innerHTML = nextUpdateInTimer
    nextUpdateInTimer -= 1

    if (panelServerGlobal.currentState === 'offline' || panelServerGlobal.currentState === 'error') {
        uptimeStatusElement.innerHTML = panelServerGlobal.currentState.toUpperCase()
    } else {
        const timeNow = Date.now()
        const timeThen = databaseGlobal.botUptimeUpdatedAt
        const timeDifference = timeNow - timeThen
        const uptimeThen = databaseGlobal.botUptime
        const uptimeNow = uptimeThen + timeDifference

        const uptimeF = msToTime(uptimeNow)

        uptimeStatusElement.innerHTML = `${uptimeF.days}D ${uptimeF.hours}H ${uptimeF.minutes}M ${uptimeF.seconds}S`
    }


        
    dashboardInterval = setInterval( async () => {

        nextUpdateInTimer = intervalTimer

        valueSetter()



    }, intervalTimer * 1000);

    nextUpdateInterval = setInterval(() => {
        nextUpdateInElement.innerHTML = nextUpdateInTimer
        nextUpdateInTimer -= 1

        if (panelServerGlobal.currentState === 'offline' || panelServerGlobal.currentState === 'error') {
            uptimeStatusElement.innerHTML = panelServerGlobal.currentState.toUpperCase()
        } else {
            const timeNow = Date.now()
            const timeThen = databaseGlobal.botUptimeUpdatedAt
            const timeDifference = timeNow - timeThen
            const uptimeThen = databaseGlobal.botUptime
            const uptimeNow = uptimeThen + timeDifference
    
            const uptimeF = msToTime(uptimeNow)
    
            uptimeStatusElement.innerHTML = `${uptimeF.days}D ${uptimeF.hours}H ${uptimeF.minutes}M ${uptimeF.seconds}S`
        }

    }, 1000);

}

// Fetch ServerPanel
async function fetchServerPanel() {
    let result

    const dummyData = {
        memoryTotalMB: 500,
        diskTotalMB: 500,
        cpuTotalPercent: 65,
        currentState: 'error',
        memoryUsageBytes: 0,
        diskUsageBytes: 0,
        cpuUsagePercent: 0
    }

    await fetch(`/api/status/server`, { method: 'GET' })
    .then(response => response.json())
    .then(data => { result = data })
    .catch(err => {
        console.log(err)
        result = dummyData
    })

    return result
}

// Fetch Database
async function fetchDatabase() {
    let result

    const dummyData = {
        botUserId: '919212093444616203',
        botUserName: 'Cyber Ty',
        botUserTag: 'Cyber Ty#3205',
        botAvatar: 'https://cdn.discordapp.com/avatars/919212093444616203/442dc9d9e3a1a5696c843ceebc698f20.webp',
        botUptime: 0,
        botUptimeUpdatedAt: 1636148700000,
        botWSPing: 0,
        botGuildCount: 0,
        botUserCount: 0
    }

    await fetch(`/api/status/database`, { method: 'GET' })
    .then(response => response.json())
    .then(data => { result = data })
    .catch(err => {
        console.log(err)
        result = dummyData
    })

    return result
}

// MS to Time
function msToTime(duration) {
    var milliseconds = Math.floor((duration % 1000) / 100)
    var seconds = Math.floor((duration / 1000) % 60)
    var minutes = Math.floor((duration / (1000 * 60)) % 60)
    var hours = Math.floor((duration / (1000 * 60 * 60)) % 24)
    var days = Math.floor(duration / (1000 * 60 * 60 * 24))

    hours = (hours < 10) ? "0" + hours : hours
    minutes = (minutes < 10) ? "0" + minutes : minutes
    seconds = (seconds < 10) ? "0" + seconds : seconds

    const timeJSON = {
        milliseconds: milliseconds,
        seconds: seconds,
        minutes: minutes,
        hours: hours,
        days: days
    }
    return timeJSON
}

let databaseGlobal
let panelServerGlobal
// Element Value setter
async function valueSetter() {

    const serverPanel = await fetchServerPanel()
    const database = await fetchDatabase()

    panelServerGlobal = serverPanel
    databaseGlobal = database

    botImageElement.src = database.botAvatar

    botNameElement.innerHTML = database.botUserTag

    botPingElement.innerHTML = `${database.botWSPing}ms`

    guildCountElement.innerHTML = database.botGuildCount

    userCountElement.innerHTML = database.botUserCount

    CPUmeterElement.children.item(1).style['stroke-dashoffset'] = `calc(375 - (375 / 100 * ${serverPanel.cpuUsagePercent}))`
    CPUpercentElement.innerHTML = serverPanel.cpuUsagePercent.toFixed(2)

    const MEMusageMB = serverPanel.memoryUsageBytes / 1024 / 1024
    const MEMusagePercent = MEMusageMB / serverPanel.memoryTotalMB * 100
    RAMmeterElement.children.item(1).style['stroke-dashoffset'] = `calc(375 - (375 / 100 * ${MEMusagePercent}))`
    RAMpercentElement.innerHTML = MEMusagePercent.toFixed(2)
}
