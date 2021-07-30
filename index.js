#!/usr/bin/env node

const {program} = require('commander');
const fs = require('fs');
const packageJson = require('./package.json');
const util = require("./util");

const template = {
    js: {
        index: fs.readFileSync(__dirname + '/template/js/index', 'utf8'),
        class: fs.readFileSync(__dirname + '/template/js/class', 'utf8'),
        function: fs.readFileSync(__dirname + '/template/js/function', 'utf8'),
    },
    ts: {
        index: fs.readFileSync(__dirname + '/template/ts/index', 'utf8'),
        class: fs.readFileSync(__dirname + '/template/ts/class', 'utf8'),
        function: fs.readFileSync(__dirname + '/template/ts/function', 'utf8'),
    },
}


program
    .version(packageJson.version, '-v, --version')
    .name('hrt')
    .usage('[option]');

program
    .usage('[options] <componentNames>')
    .description('create react component easily')
    .option('-t, --typescript', 'Typescript', false)
    .option('-s, --sass', 'Sass', false)
    .option('-f, --function', 'Function component', false)
    .action(type => {
        if (program.args.length < 1) {
            program.help();
        } else {
            program.args.map(componentName => {
                let directory = `./${componentName}/`;
                let COMPONENT_NAME = util.capitalize(componentName);
                let COMPONENT_STYLE = componentName + (type.sass ? ".scss" : ".css");
                let javascriptExt = type.typescript ? ".ts" : ".js";

                // 폴더 생성
                fs.mkdir(directory, err => {
                    if (err) console.log('\x1b[31m%s\x1b[0m', `${String(componentName + " ").padEnd(20, '·')} already exists`);
                    else {
                        fs.writeFile(directory + 'index' + javascriptExt, util.replace(template[type.typescript ? "ts" : "js"]["index"], COMPONENT_NAME, COMPONENT_STYLE), _ => {})
                        fs.writeFile(directory + COMPONENT_NAME + javascriptExt + 'x', util.replace(template[type.typescript ? "ts" : "js"][type.function ? "function" : "class"], COMPONENT_NAME, COMPONENT_STYLE), _ => {})
                        fs.writeFile(directory + COMPONENT_STYLE, `/* ${COMPONENT_NAME} component stylesheet */`, _ => {})

                        console.log('\x1b[36m%s\x1b[0m', `${String(componentName + " ").padEnd(20, '·')} complete`);
                    }
                })
            })
        }
    });

program.parse(process.argv);
