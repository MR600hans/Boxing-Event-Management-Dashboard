# 拳擊賽事管理儀表板 (Boxing Event Management Dashboard)

這是一個使用 React、TypeScript 和 Vite 技術棧打造的現代化拳擊賽事管理儀表板。專案採用 Tailwind CSS 進行樣式設計，並使用 `shadcn/ui` 作為基礎元件庫。

## 專案特色

*   **現代化技術棧**: 使用 Vite + React + TypeScript，提供極致的開發體驗和性能。
*   **響應式設計**: 採用 Tailwind CSS，確保在各種設備上都有一致且美觀的視覺效果。
*   **元件化架構**: 將 UI 拆分為可重用的 React 元件，易於維護和擴展。
*   **清晰的專案結構**: 將所有原始碼集中於 `src` 目錄下，方便管理。

## 專案架構

以下是本專案主要的目錄結構和說明：

```
.
├── src/
│   ├── assets/           # 圖片、字體等靜態資源
│   ├── components/       # 共用的 React 元件
│   │   └── ui/           # shadcn/ui 基礎元件
│   ├── styles/           # 全域 CSS 樣式 (globals.css)
│   ├── App.tsx           # 應用程式主元件
│   └── main.tsx          # 應用程式進入點
├── index.html            # HTML 進入點檔案
├── package.json          # 專案依賴與腳本設定
├── tailwind.config.js    # Tailwind CSS 設定檔
├── tsconfig.json         # TypeScript 設定檔
└── vite.config.ts        # Vite 設定檔
```

## 如何運行

請依照以下步驟來設定並運行本專案。

### 1. 安裝依賴

首先，請在專案根目錄下執行以下指令來安裝所有必要的開發依賴：

```bash
npm install
```

### 2. 啟動開發伺服器

安裝完成後，執行以下指令來啟動 Vite 開發伺服器：

```bash
npm run dev
```

接著，您可以在瀏覽器中開啟 [http://localhost:5173](http://localhost:5173) 來查看應用程式的運行畫面。任何對原始碼的修改都會即時反應在頁面上。

### 3. 建置專案

當您準備好將專案部署到生產環境時，可以執行以下指令來進行建置：

```bash
npm run build
```

這個指令會在專案根目錄下產生一個 `dist` 資料夾，其中包含了所有優化和壓縮後的靜態檔案，您可以將此資料夾部署到任何靜態網站託管服務上。 