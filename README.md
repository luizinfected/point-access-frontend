# Ilumeo - Sistema de Ponto

---

## Tecnologias

- **Front-end:** React + TypeScript + Vite + Material UI + Tailwind CSS + Dayjs + Jest  
- **Infraestrutura:** Docker + Vercel (front) 

---

##  Instalação Front-end

#### Usando Docker:

```bash
git clone git@github.com:luizinfected/ilumeo-frontend.git
cd ilumeo-frontend

docker build -t ilumeo-frontend .
docker run -p 4173:4173 ilumeo-frontend
```

Acesse via: [http://localhost:4173](http://localhost:4173)

####  Usando npm:

```bash
git clone git@github.com:luizinfected/ilumeo-frontend.git
cd ilumeo-frontend

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

## Extras

- Um usuário de demonstração já está criado na base com dados de exemplo.
- Código do usuário: usuario123

---

## Produção

- **Front-end:** https://ilumeo-frontend-liard.vercel.app  
- **Back-end:** https://ilumeo-backend-ggxn.onrender.com