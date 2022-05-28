from pydantic import BaseSettings


class CommonSettings(BaseSettings):
    APP_NAME: str = "FARM Events"
    DEBUG_MODE: bool = True


class ServerSettings(BaseSettings):
    HOST: str = "0.0.0.0"
    PORT: int = 8000


class DatabaseSettings(BaseSettings):
    DB_URL: str = "mongodb+srv://jackomo47:f10r3ll4@cluster0.4bz87.mongodb.net/events?retryWrites=true&w=majority"
    DB_NAME: str = "events"


class Settings(CommonSettings, ServerSettings, DatabaseSettings):
    pass


settings = Settings()
