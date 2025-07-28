import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.MOV'],
  resolve: {
    alias: [
      {
        // Strip version suffix from @radix-ui imports, e.g. "@radix-ui/react-tooltip@1.1.8" → "@radix-ui/react-tooltip"
        find: /^@radix-ui\/react-(.*)@\d+\.\d+\.\d+$/,
        replacement: "@radix-ui/react-$1",
      },
      {
        // Strip explicit version from recharts imports, e.g. "recharts@2.15.2" → "recharts"
        find: /^recharts@\d+\.\d+\.\d+$/,
        replacement: "recharts",
      },
      {
        // Strip explicit version from class-variance-authority imports, e.g. "class-variance-authority@0.7.1" → "class-variance-authority"
        find: /^class-variance-authority@\d+\.\d+\.\d+$/,
        replacement: "class-variance-authority",
      },
      {
        find: "@",
        replacement: path.resolve(__dirname, "src"),
      },
    ],
  },
}); 