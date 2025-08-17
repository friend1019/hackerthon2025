# Node.js 기반 React 앱용 Dockerfile
FROM node:18

# 작업 디렉토리 생성
WORKDIR /app

# package.json, package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 소스 전체 복사
COPY . .

# 개발 서버 포트 오픈
EXPOSE 3000

# 개발 서버 실행
CMD ["npm", "start"]
