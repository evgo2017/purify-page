// ==UserScript==
// @name         极致净化少数派文章页
// @namespace    https://evgo2017.com/purify-page
// @version      0.11
// @description  完美阅读体验，去除广告、推荐等一系列和阅读无关的内容
// @author       evgo2017
// @license      GNU GPLv2
// @match        https://sspai.com/post/*
// @icon         https://cdn-static.sspai.com/favicon/sspai.ico
// @grant        none
// ==/UserScript==
 
(function() {
    'use strict';
 
    const maxRetryCount = 5; // 最大重试次数
 
    // 移除区域
    remove("分享按钮", `.article-actionBar`, { repeat: true })
    remove("广告", `.advertisement-box`)
    remove("底部推荐阅读", `.related-read-box`, { repeat: true })
 
    // Helper
    function remove(label, selector, userOption = {}, count = 1) {
       const option = Object.assign({ repeat: false, getDom: (dom) => dom, }, userOption)
       const dom = option.getDom($(selector))
       if (dom) {
          dom.remove()
          console.log(`${label}，%c已移除%c。（第 ${count} 次处理）`, "color: red; font-weight: bold", "color: black")
          if (option.repeat) {
            setTimeout(() => { remove(label, selector, option, count + 1) }, 1000)
          }
       } else {
         if (count < maxRetryCount) {
           console.log(`${label}，未找到。（第 ${count} 次处理）`)
           setTimeout(() => { remove(label, selector, option, count + 1) }, 1000)
         } else {
           console.log(`${label}，%c停止查找%c。（第 ${count} 次处理）`, "color: orange; font-weight: bold", "color: black")
         }
       }
    }
    function $ (selector) {
        return document.querySelector(selector)
    }
})();