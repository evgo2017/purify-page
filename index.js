// ==UserScript==
// @name         极致净化页面
// @namespace    https://evgo2017.com/purify-page
// @version      0.1.0
// @description  完美阅读体验，去除广告、推荐等一系列和阅读无关的内容。CSDN、掘金、简书、博客园、知乎专栏、知乎问题、知乎问题、百度贴吧、百度经验、百度百科、百度知道集合。
// @author       evgo2017
// @match        https://juejin.cn/post/*
// @match        https://www.jianshu.com/p/*
// @match        https://www.cnblogs.com/*/p/*
// @match        https://www.cnblogs.com/*/articles/*
// @match        https://www.cnblogs.com/*/archive/*
// @match        https://zhuanlan.zhihu.com/p/*
// @match        https://www.zhihu.com/question/*
// @match        https://jingyan.baidu.com/article/*
// @match        https://baike.baidu.com/*
// @match        https://zhidao.baidu.com/question/*
// @match        https://tieba.baidu.com/p/*
// @match        https://v2ex.com/t/*
// @match        https://post.smzdm.com/p/*
// @match        https://blog.csdn.net/*/article/details/*
// @match        https://*.blog.csdn.net/article/details/*
// @license      GNU GPLv2
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const maxRetryCount = 10; // 最大重试次数

    switch (window.location.hostname) {
      case 'juejin.cn': {
        console.log('匹配到 掘金 页面')
        remove("顶部导航条", `#juejin > div.view-container > div.main-header-box`)
        remove("右侧作者信息", `.author-block`)
        remove("下方相关推荐", `.recommended-area`)
        remove("回到顶部", `.suspension-panel`)
        remove("登录掘金领取礼包", `.bottom-login-guide`)
        remove("相关推荐", `#sidebar-container > div:nth-child(2) > div:nth-child(2)`)
        remove("精选内容", `#sidebar-container > div:nth-child(2) > div:nth-child(3)`)
        remove("找对属于你的技术圈子", `#sidebar-container > div.sidebar-block.wechat-sidebar-block.pure.wechat-ad`)
        break;
      }
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
        break;
      }
      case 'www.cnblogs.com': {
        console.log('匹配到 博客园 页面')
        remove('底部推荐', `#cnblogs_ch`)
        remove('底部广告', `#blog_c1`)
        remove('相关博文', `#under_post_card1`)
        remove('阅读排行', `#under_post_card2`)
        break;
      }
      case 'zhuanlan.zhihu.com': {
        console.log('匹配到 知乎专栏 页面')
        remove('顶部导航', `.ColumnPageHeader-Wrapper`)
        remove('登录弹窗', `.Modal-closeButton`, { isClick: true })
        remove('登录即可查看超5亿专业优质内容', `.css-woosw9`)
        remove('底部推荐阅读', `.Recommendations-Main`)
        break;
      }
      case 'www.zhihu.com': {
        console.log('匹配到 知乎问题 页面')
        remove('上方话题推荐', `header`)
        remove('登录弹窗', `.Modal-closeButton`, { isClick: true })
        remove('右侧边栏', `.Question-sideColumn`)
        remove('登录即可查看超5亿专业优质内容', `.css-woosw9`)
        // 最大化阅读区域
        $('.Question-mainColumn').style.minWidth = '1000px'
        const style = document.createElement('style')
        style.innerHTML = `.AnswerItem-authorInfo{ max-width: 100% }`
        $('head').appendChild(style)
        break
      }
      case 'v2ex.com': {
        console.log('匹配到 V2EX 页面')
        remove("右侧广告", `#Rightbar > div:nth-child(6)`)
        remove("下方广告", `#Main > div:nth-child(7)`)
        break
      }
      case 'post.smzdm.com': {
        console.log('匹配到 什么值得买 页面')
        remove('右侧导航', `#feed-side`)
        remove('相关文章推荐', `.J_trigger_ani`)
        // 最大化阅读区域
        $('#feed-main').style.minWidth = '100%'
        break
      }
      case 'jingyan.baidu.com': {
        console.log('匹配到 百度经验 页面')
        remove("顶部导航", `header`)
        remove("顶部导航", `nav`)
        remove("右侧导航", `#aside`, { isRemove: true })
        remove("右侧广告", `#task-panel-wrap`)
        remove("右侧辅助模式", `#wgt-barrier-free`)
        remove("右侧分享", `#wgt-exp-share`)
        remove('展开阅读全部', `.read-whole-mask > div.read-whole > span`, { isClick: true })
        remove('展开阅读全部', `.read-whole-mask > .read-whole`)
        remove('展开阅读全部', `.read-whole-mask > .exp-mask`)
        remove("推荐文章 ", `.main-content-bottom`)
        remove("底部导航 ", `footer`)
        break
      }
      case 'baike.baidu.com': {
        console.log('匹配到 百度百科 页面')
        remove("右侧广告", `#J-union-wrapper`)
        remove("下方相关搜索", `#J-related-search`)
        break
      }
      case 'zhidao.baidu.com': {
        console.log('匹配到 百度知道 页面')
        remove("热议", `.question-number-text-chain`)
        remove("右侧推荐", `#qb-side`)
        remove("申请认证", `.jump-goto-star`)
        remove("赚礼品换积分", `.task-list-button`)
        remove("辅助模式", `.aria-div`)
        remove("其它类似问题", `#wgt-related`)
        remove("为你推荐", `.wgt-union-bottom`)
        break
      }
      case 'tieba.baidu.com': {
        console.log('匹配到 百度贴吧 页面')
        remove('登录弹窗', `#tiebaCustomPassLogin > div.tieba-login-wrapper > span`, { isClick: true, isRepeat: true })
        remove("右侧贴吧热议榜", `.topic_list_box`)
        break
      }
      default: {
        if (window.location.hostname.includes('blog.csdn.net')) {
            console.log('匹配到 CSDN 页面')
            remove('顶部导航', `#toolbarBox`)
            remove('边栏', `.blog_container_aside`, { isRemove: true })
            remove('右方广告', `#recommendAdBox`)
            remove('右方分类专栏', `#recommend-right .kind_person`, { isRemove: true })
            remove('右方最新文章', `#asideArchive`)
            remove('下方推荐文章', `.recommend-box`, { isRemove: true, isRepeat: true })
            remove('新手引导、客服、举报、返回顶部', `.csdn-side-toolbar`, { isRemove: true })
            remove('觉得还不错？一键收藏', `.tool-active-list`, { isRemove: true })
            // 最大化阅读区域
            $(`#mainBox`).style.width = 'calc(100% - 320px)'
            const mainArea = $(`main`)
            mainArea.style.float = 'none'
            mainArea.style.width = '100%'
            // 加载更多代码
            Array.from(document.querySelectorAll(`.look-more-preCode`)).forEach(i => i.click())
            // 加载更多评论
            lookMoreComment()
            function lookMoreComment() {
              const dom =$('#lookGoodComment')
              if (dom != null && dom.style.display != 'none') {
                $('.look-more-comment').click()
                setTimeout(() => { lookMoreComment() }, 1000)
              } else {
                Array.from(document.querySelectorAll(`.second-look-more`)).forEach(i => i.click())
              }
            }
            // // 移动评论到下方
            $('#pcCommentBox').append($('.comment-list-container'))
        }
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