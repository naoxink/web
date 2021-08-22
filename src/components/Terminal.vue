<template>
    <div id="terminal">
        <div id="history-overflow">
            <div id="history">
                <pre class="line" v-for="(line, i) in history" :key="i" v-html="line"></pre>
            </div>
        </div>
        <div id="prompt-container" :class="{ 'active': promptFocused }">
            <input type="text" id="prompt" v-model="promptLine" @focus="promptFocused = true" @blur="promptFocused = false" @keyup.enter="execCommand" placeholder="'?' to list available commands">
        </div>
    </div>
</template>

<script>
    import commands from '@/store/commands.js'

    export default {
        name: 'Terminal',
        props: [  ],
        data(){
            return {
                prompt: 'n~$',
                promptLine: '',
                promptFocused: false,
                history: [],
                commands
            }
        },
        watch: {
            history() {
                setTimeout(this.scrollBottom, 1)
            }
        },
        methods: {
            addLine(txt, tabbed = 0){
                if([].constructor === txt.constructor){
                    return txt.forEach(line => this.addLine(...line))
                }
                if(tabbed) txt = " ".repeat(4 * tabbed) + txt
                this.history.push(txt)
            },
            execCommand(cmd){
                if(typeof cmd !== 'string') cmd = this.promptLine
                this.addLine(`${this.prompt} ${cmd}`)
                if(!cmd) return false
                if(typeof this.commands[cmd] === 'function'){
                    this.commands[cmd](this)
                }else{
                    this.history.push(`"${cmd}" command not found.`)
                }
                this.promptLine = ''
            },
            scrollBottom(){
                const $history = document.querySelector('#history')
                $history.scrollTop = $history.scrollHeight
            },
            getCommandList(){
                return Object.keys(this.commands)
            }
        },
        mounted(){
            const $prompt = document.querySelector('#prompt')
            $prompt.focus()
            this.commands['?'] = _ => {
                _.addLine('Available commands:')
                this.getCommandList().forEach(cmd => {
                    if(cmd !== '?') _.addLine(cmd, 1)
                })
            }
        }
    }
</script>

<style>
    #terminal {
        width: 900px;
        margin:  0 auto;
        margin-top: 3%;
        background-color: #333;
        height: 400px;
        border-radius: 5px;
        padding: 5px;
        text-align: left;
        position: relative;
    }
    #terminal #history-overflow {
        height: 365px;
        width: 870px;
        overflow: hidden;
    }
    #terminal #history {
        height: 100%;
        width: 900px;
        overflow-x: hidden;
        overflow-y: auto;
    }
    #terminal #history a {
        color: yellowgreen;
    }
    #terminal #history ul {
        list-style-type: square;
        margin: 0;
    }
    #terminal #prompt {
        font-family: monospace;
        color: #FFF;
        display: block;
        background-color: transparent;
        font-size: 14px;
        border: 0;
        height: 26px;
        width: 850px;
        float: right;
    }
    #terminal #prompt:focus,
    #terminal #prompt:active {
        outline: none !important;
    }
    #terminal #prompt-container {
        position: relative;
        border-top: 1px solid black;
        background-color: #333;
        overflow: hidden;
        border-radius: 5px;
        margin: 5px;
    }
    #terminal #prompt-container.active {
        background-color: #555;
    }
    #terminal #prompt-container:before {
        content:  'n~$ ';
        position: absolute;
        left: 5px;
        top: 6px;
        font-size: 14px;
        font-weight: bold;
        color: #FFF;
    }
    .line {
        color: #FFF;
        text-align: left;
        margin: 5px;
        margin-left: 10px;
    }
</style>