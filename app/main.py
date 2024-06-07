import uvicorn
from fastapi import FastAPI

from api.endpoints import user
from core.database.db import Base, engine

Base.metadata.create_all(engine)

app = FastAPI()

app.include_router(user.router)


# if __name__ == '__main__':
#     uvicorn.run(app, host='127.0.0.1', port=1337)