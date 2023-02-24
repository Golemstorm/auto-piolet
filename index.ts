#! /usr/bin/env node

import g from 'logitech-g29'
import { GlobalKeyboardListener } from 'node-global-key-listener'
import consola from 'consola'

const v = new GlobalKeyboardListener()

enum Keyboard {
  SPACE = 'SPACE'
}

let isRunning = false
let isLock = false

const toggle = () => {
  if (isLock) { return }

  isLock = true
  isRunning = !isRunning
  setTimeout(() => { isLock = false }, 1000)
}

v.addListener(({ name }) => {
  if (name === Keyboard.SPACE) { toggle() }
})
const options = {
  autocenter: true,
  range: 270
}

g.connect(options, function(err) {
  g.forceFriction(0.5)
  console.log('Ready')
})


function sleep(ms){
  return new Promise(resolve=>setTimeout(resolve,ms))
}
setInterval(async () => {
  if (!isRunning) {
     g.leds('')  
     g.forceConstant(0.5)
     g.forceOff()
    return
  }
 
  consola.info('Running...')
   g.leds('1')
   await sleep(50)
   g.leds('111')
   await sleep(50)
   g.leds('00001')
   await sleep(50)
   g.forceConstant(0)
   await sleep(300)
   g.forceConstant(1)
}, 600)
