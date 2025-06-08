# GPT API Backend

**Versión:** 0.1.0

Un backend en Python con FastAPI y SQLAlchemy AsyncIO que:

- Expone un endpoint `POST /api/prompt` para recibir y procesar prompts de forma segura.  
- Usa un driver asíncrono psycopg v3 para conectarse a PostgreSQL.  
- Gestiona sesiones con dependencias de FastAPI y crea tablas al inicio.

## Quickstart

1. Clona el repositorio y activa tu entorno (pyenv/virtualenv).  
2. Define `.env` con:
   ```env
   DATABASE_URL=postgresql+asyncpg://user:pass@host:port/dbname
   ```
3. Instala dependencias:
    ```bash
    pip install -r requirements.txt
    ```

4. Arranca el servidor:
    ```
    uvicorn app.main:app --reload
    ```
    o, si usas Linux o macOS:
    1. Asegúrate de que el script launch.sh tenga permisos de ejecución:
    ```
    chmod +x launch.sh
    ```
    2. Ejecuta el script:
    ```
    ./launch.sh
    ```





