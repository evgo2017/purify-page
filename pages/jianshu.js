// ==UserScript==
// @name         极致净化简书文章页
// @namespace    https://evgo2017.com/purify-page
// @version      0.12.3
// @description  完美阅读体验，去除广告、推荐等一系列和阅读无关的内容
// @author       evgo2017
// @license      GNU GPLv2
// @match        https://www.jianshu.com/p/*
// @icon         https://cdn2.jianshu.io/assets/favicons/favicon-e743bfb1821442341c3ab15bdbe804f7ad97676bd07a770ccc9483473aa76f06.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const maxRetryCount = 10; // 最大重试次数

    switch (window.location.hostname) {
      case 'www.jianshu.com': {
        console.log('匹配到 简书 页面')
        remove('顶部导航栏', `header`)
        remove('边栏', `aside`)
        remove('左侧分享', `._3Pnjry`)
        remove('更多精彩内容，就在简书APP', `#__next > div._21bLU4._3kbg6I > div > div._gp-ck > section:nth-child(1) > div._13lIbp > div._16AzcO`)
        remove('更多精彩内容，就在简书APP', `#__next > div._21bLU4._3kbg6I > div > div._gp-ck > section:nth-child(1) > div._13lIbp > div._6S_NkV`)
        remove('更多精彩内容，就在简书APP', `#__next > div._21bLU4._3kbg6I > div > div._gp-ck > section:nth-child(1) > div._19DgIp`)
        remove('下方推荐', `._21bLU4._3kbg6I > div > div._gp-ck > section:nth-child(2)`)
        remove('下方广告', `#__next > div._21bLU4._3kbg6I > div > div._gp-ck > div.adad_container`)
        remove('下方广告', `#sub-frame-error`)
        remove('下方推荐', `#__next > div._21bLU4._3kbg6I > div > div._gp-ck > section:nth-child(5)`)
        remove('底部', `footer`)
        remove('底部被以下专题收入，发现更多相似内容', `#__next > div._21bLU4._3kbg6I > div > div._gp-ck > div:nth-child(4)`)
        remove('底部相关阅读', `#__next > div._21bLU4._3kbg6I > div > div._gp-ck > div:nth-child(5)`)
        remove('底部友情链接', `#__next > div._21bLU4._3kbg6I > div > div._gp-ck > div:nth-child(6)`)
        break;
      }
    }

    // Helper
    function remove(label, selector, option, count = 1) {
       const dom = document.querySelector(selector)
       if (dom) {
          option = Object.assign({ isClick: false, isRemove: false, isRepeat: false }, option)
          if (option.isClick) {
            dom.click()
          } else if (option.isRemove) {
            dom.remove()
          } else {
            dom.style.display = 'none'
          }
          if (option.isRepeat && count <= maxRetryCount) {
           setTimeout(() => { remove(label, selector, option, count + 1) }, 1000)
          }
          console.log(`${label}，%c已移除%c。（第 ${count} 次处理）`, "color: red; font-weight: bold", "color: black")
       } else {
         if (count <= maxRetryCount) {
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