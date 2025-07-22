# Point Access - Sistema de Ponto

---

## Tecnologias

- **Front-end:** React + TypeScript + Vite + Material UI + Tailwind CSS + Dayjs + Jest  
- **Infraestrutura:** Docker + Vercel (front) 

---

##  Instalação Front-end

#### Usando Docker:

```bash
git clone git@github.com:luizinfected/point-access-frontend.git
cd point-access-frontend

docker build -t point-access-frontend .
docker run -p 4173:4173 point-access-frontend
```

Acesse via: [http://localhost:4173](http://localhost:4173)

####  Usando npm:

```bash
git clone git@github.com:luizinfected/point-access-frontend.git
cd point-access-frontend

npm install
npm run dev
```

---


## Testes

Para rodar os testes no front-end:

```bash
npm run test
```

---
