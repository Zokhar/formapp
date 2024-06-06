from sqlalchemy import (
    Column,
    String,
    Integer,
    Date,
    ForeignKey
)

from app.core.database.db import Base


class PassportModel(Base):
    """Паспорт"""
    __tablename__ = "passports"

    id = Column(Integer, primary_key=True, autoincrement=True)
    number = Column(String(50), nullable=False)
    series = Column(String(50), nullable=False)
    issued_by = Column(String(256), nullable=False)
    date_of_issue = Column(Date, nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)


class UserModel(Base):
    """Пользователи"""
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(256), nullable=False)
    surname = Column(String(256), nullable=False)
    middle_name = Column(String(256))
    sex = Column(String(256), nullable=False)
    birthday = Column(Date(256), nullable=False)
    place_of_birth = Column(String(256), nullable=False)
    citizenship = Column(String(256), nullable=False)
    snils = Column(String(256), nullable=False)
    inn = Column(String(256), nullable=False)
    phone_number = Column(String(256), nullable=False)
    home_phone_number = Column(String(256))
    email = Column(String(256))
