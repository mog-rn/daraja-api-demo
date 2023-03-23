// Customer to Business (C2B) API Routes

const router = require('express').Router()

const { c2bRegister, c2bSimulate } = require('../handlers/c2b')

router.post('/register', c2bRegister)

router.post('/simulate', c2bSimulate)
