# 時光留聲機

家屬陪伴長輩說故事，把生命故事錄下來的網頁小工具。

- 線上使用：https://mattsue1003.github.io/life-story-phonograph/
- 7 段人生主題題庫、追問小卡、陪伴小提醒、錄音前徵求同意
- 唱片櫃：播放、編輯、配老照片、下載音檔
- 一鍵列印「生命故事書」，備份檔可搬到別台裝置
- 不需帳號、沒有後端：錄音只存在使用者自己的瀏覽器（IndexedDB）

單一 `index.html`，不需建置。

## 分享格式
分享時會在手機上轉檔，讓 iPhone、Android 和 LINE 都能播：
- 優先做成 MP4 影片（H.264＋AAC，畫面是唱片封面），LINE 聊天室裡可直接播放
- 瀏覽器不支援 WebCodecs 時改成 MP3

第三方程式庫放在 `vendor/`：[mp4-muxer](https://github.com/Vanilagy/mp4-muxer)（MIT）、[lamejs](https://github.com/zhuker/lamejs)（LGPL-3.0，未修改）。
