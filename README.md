# 訓練判讀台

不需要 Claude 的訓練判讀工具:從 Intervals.icu 讀活動,自動套用 SST / Over-Under / Z2 / 戶外規則判讀,依每週結果自動排下週課表,並可送到 Intervals.icu 行事曆(Zwift 會同步)。

## 架設(一次)
1. 把這個資料夾的檔案放進 GitHub repo。
2. Repo → Settings → Pages → Source 選 `Deploy from a branch`,Branch 選 `main`、資料夾 `/ (root)`,儲存。
3. 約 1 分鐘後網址是 `https://<你的帳號>.github.io/<repo 名稱>/`。
4. iPhone 用 Safari 打開 → 分享 → 加入主畫面。

## 每台裝置第一次打開
- **Intervals.icu API 金鑰**、**運動員 ID**:Intervals.icu → Settings → Developer Settings。
- **GitHub 權杖**:GitHub → Settings → Developer settings → Personal access tokens (classic),只勾 `gist`。
- 按「儲存並同步」。第一台裝置會建立私人 Gist 存檔,其他裝置會自動找到同一份。

金鑰和權杖只存在各裝置的瀏覽器,不會放進這個 repo。

## 如果出現「瀏覽器擋住了和 Intervals.icu 的連線」
1. 到 Cloudflare 免費帳號 → Workers → 建立 Worker,貼上 `worker.js`,把 `ALLOWED_ORIGIN` 改成你的 Pages 網址(不含路徑),部署。
2. 把 Worker 網址(例如 `https://coach-proxy.xxx.workers.dev`)填到設定的「API 位址」。

## 存了哪些資料
- 雲端(私人 Gist):RPE、溫濕度、補水、版本、標籤、晨間狀態、恢復週/忙碌週、設定、FTP 紀錄。
- 只在本機:從 Intervals.icu 抓下來的活動與功率曲線(隨時可以重抓)。
