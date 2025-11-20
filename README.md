# SkyConnect Explorer

Aplicación web desarrollada en Next.js para explorar información detallada de aeropuertos alrededor del mundo. Consume la API de Aviationstack para obtener datos en tiempo real.

## 📋 Requisitos Previos

- Node.js 18+ 
- npm o yarn
- API Key de Aviationstack (gratuita en [aviationstack.com](https://aviationstack.com/))

## 🛠️ Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/damarislh10/SkyConnect-Explorer-APP.git
cd skyconnect-explorer-app
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno:
```bash
cp .env.development
```

Edita `.env.development` y agrega la API key:
```
NEXT_PUBLIC_AVIATIONSTACK_API_KEY=tu_api_key_aqui
```

4. Ejecuta el servidor de desarrollo:
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter
- `npm test` - Ejecuta los tests
- `npm run test:watch` - Ejecuta tests en modo watch
- `npm run test:coverage` - Genera reporte de cobertura

##  Testing

Los tests están organizados junto a los componentes:

```bash
npm test

npm run test:watch

npm run test:coverage
```

##  Estilos

El proyecto usa:
- **Tailwind CSS** para utilidades
- **SCSS Modules** para estilos de componentes
- **Variables CSS** para temas

##  Tecnologías Utilizadas

- **Next.js 16** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Zustand** - Gestión de estado
- **React Leaflet** - Mapas interactivos
- **SCSS** - Preprocesador CSS
- **Tailwind CSS** - Framework CSS utility-first
- **Jest** - Framework de testing
- **React Testing Library** - Testing de componentes

##  Variables de Entorno

| Variable | Descripción | Requerido |
|----------|-------------|-----------|
| `NEXT_PUBLIC_AVIATIONSTACK_API_KEY` | API Key de Aviationstack | Sí |

