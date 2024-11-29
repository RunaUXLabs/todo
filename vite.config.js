import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/todo/', // 배포할 GitHub Pages 리포지토리 이름으로 변경, base 값은 항상 슬래시(/)로 시작하고 종료해야 함
});
