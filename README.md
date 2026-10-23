# Qiyen — Build My Own Future.

個人網站：基於 Next.js 靜態導出（Static Export），由 Nginx 提供高並發與安全標頭服務，搭配 Docker Compose 輕量部署於 NAS（Synology DS918+ 等）或任何伺服器。

極簡純靜態架構，無常駐資料庫與後端程序負擔，記憶體開銷小於 10MB。

```
.
├── site/                 Next.js 原始碼（本地開發與建置）
├── frontend/             ← 匯出後的純靜態網站（由 Nginx 掛載，執行 `npm run export` 產生）
├── nginx/default.conf    Nginx 高效設定（靜態服務、快取最佳化、完整安全標頭）
├── docker-compose.yml    NAS Docker Compose 設定檔（單一 Nginx 容器）
└── .env.example          環境變數範例（可自訂 Port）
```

## 本地開發與預覽

進入 `site` 目錄：

```bash
cd site
npm install
npm run dev          # 開發模式：http://localhost:9177
```

全靜態產出與預覽（與 Nginx 伺服器表現一致）：

```bash
npm run export       # next build → 自動匯出至 ../frontend
npm run preview      # 預覽伺服器：http://localhost:9177
```

代碼品質檢查：
* 型別檢查：`npm run typecheck`
* 代碼檢查：`npm run lint`

## NAS 部署流程（Synology DS918+）

1. 在本機執行 `npm run export` 產出最新靜態檔至 `frontend/`。
2. 將以下檔案與目錄複製至 NAS（例如放在 `/volume1/docker/qiyen-site`）：
   * `docker-compose.yml`
   * `nginx/`
   * `frontend/`
   * `.env.example`
3. 在 NAS 該目錄下執行：
   ```bash
   cp .env.example .env
   docker compose up -d
   ```
4. 開啟瀏覽器訪問 `http://<NAS-IP>:9177`。

後續更新內容時：只需將本機 `frontend/` 的檔案覆蓋至 NAS，Nginx 立即生效，**無需重啟容器**。

## 內容維護指南

| 項目                    | 檔案路徑                                          |
| ----------------------- | ------------------------------------------------- |
| 個人資訊、SEO、社交連結 | `site/src/data/site.ts`                           |
| 專案列表與技術棧        | `site/src/data/projects.ts`                       |
| 學習地圖與技術圖鑑      | `site/src/data/tech.ts`                           |
| 設計風格與配色 Tokens   | `site/src/app/globals.css` (`@theme`)             |
| 網站網址（OG / Sitemap）| `site/src/data/site.ts` 內的 `site.url`          |
