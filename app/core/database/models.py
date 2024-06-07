from sqlalchemy import (
    Column,
    String,
    Integer,
    Boolean,
    ForeignKey
)

from sqlalchemy.orm import relationship

from core.database.db import Base


class PassportModel(Base):
    """Паспорта"""
    __tablename__ = "passports"

    id = Column(Integer, primary_key=True, autoincrement=True)
    series = Column(Integer)
    number = Column(Integer)
    issued_by = Column(String(256))
    date_of_issue = Column(String(256))
    user = relationship("UserModel", back_populates="passport")
    user_id = Column(Integer, ForeignKey('users.id'), unique=True)


class MilitaryIDModel(Base):
    """Военные билеты"""
    __tablename__ = "military_ids"

    id = Column(Integer, primary_key=True, autoincrement=True)
    status = Column(String(256))
    rank = Column(String(256))
    series = Column(Integer)
    number = Column(Integer)
    issued_by = Column(String(256))
    date_of_issue = Column(String(256))
    user = relationship("UserModel", back_populates="military_id")
    user_id = Column(Integer, ForeignKey('users.id'), unique=True)


class AddressModel(Base):
    """Адреса"""
    __tablename__ = "addresses"

    id = Column(Integer, primary_key=True, autoincrement=True)
    passport_address = Column(String(256))
    fact_address = Column(String(256))
    passport_index = Column(Integer)
    fact_index = Column(Integer)
    user = relationship("UserModel", back_populates="addresses")
    user_id = Column(Integer, ForeignKey('users.id'))


class EducationModel(Base):
    """Образования"""
    __tablename__ = "educations"

    id = Column(Integer, primary_key=True, autoincrement=True)
    education_type = Column(String(256))
    name = Column(String(256))
    number = Column(String(256))
    degree = Column(String(256))
    date_of_end = Column(String(256))
    speciality = Column(String(256))
    user = relationship("UserModel", back_populates="educations")
    user_id = Column(Integer, ForeignKey('users.id'))


class PostEducationModel(Base):
    """Послевузовское образования"""
    __tablename__ = "post_educations"

    id = Column(Integer, primary_key=True, autoincrement=True)
    education_type = Column(String(256))
    name = Column(String(256))
    number = Column(String(256))
    speciality = Column(String(256))
    user = relationship("UserModel", back_populates="post_educations")
    user_id = Column(Integer, ForeignKey('users.id'))


class SkillUpgradeModel(Base):
    """Повышение квалификации"""
    __tablename__ = "skill_upgrades"

    id = Column(Integer, primary_key=True, autoincrement=True)
    speciality = Column(String(256))
    name = Column(String(256))
    date_of_end = Column(String(256))
    user = relationship("UserModel", back_populates="skill_upgrades")
    user_id = Column(Integer, ForeignKey('users.id'))


class WorkExperienceModel(Base):
    """Опыт работы"""
    __tablename__ = "works_experience"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(256))
    position = Column(String(256))
    date_of_start = Column(String(256))
    date_of_end = Column(String(256))
    user = relationship("UserModel", back_populates="works_experience")
    user_id = Column(Integer, ForeignKey('users.id'))


class StayAbroadModel(Base):
    """Пребывание за границей"""
    __tablename__ = "stays_abroad"

    id = Column(Integer, primary_key=True, autoincrement=True)
    date_of_start = Column(String(256))
    date_of_end = Column(String(256))
    country = Column(String(256))
    goal = Column(String(256))
    user = relationship("UserModel", back_populates="stays_abroad")
    user_id = Column(Integer, ForeignKey('users.id'))


class FamilyModel(Base):
    """Родственники"""
    __tablename__ = "relatives"

    id = Column(Integer, primary_key=True, autoincrement=True)
    relation_degree = Column(String(256))
    name = Column(String(256))
    birth_data = Column(String(256))
    place_of_work = Column(String(256))
    address = Column(String(256))
    user = relationship("UserModel", back_populates="relatives")
    user_id = Column(Integer, ForeignKey('users.id'))


class RecommendationModel(Base):
    """Рекомендации"""
    __tablename__ = "recommendations"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(256))
    place_of_work = Column(String(256))
    position = Column(String(256))
    phone_number = Column(String(256))
    user = relationship("UserModel", back_populates="recommendations")
    user_id = Column(Integer, ForeignKey('users.id'))


class UserModel(Base):
    """Пользователи"""
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(256))
    surname = Column(String(256))
    middle_name = Column(String(256))
    sex = Column(String(256))
    birthday = Column(String(256))
    place_of_birth = Column(String(256))
    citizenship = Column(String(256))
    snils = Column(String(256))
    inn = Column(String(256))
    phone_number = Column(String(256))
    home_phone_number = Column(String(256))
    email = Column(String(256))
    academic_degree = Column(String(256))
    diplom = Column(String(256))
    academic_tile = Column(String(256))
    knowledge_for_work = Column(String(512))
    old_achievements = Column(String(512))
    ad_disad = Column(String(512))
    hobbies = Column(String(512))
    hr_data = Column(String(512))
    family_status = Column(String(256))
    pc_experience = Column(String(256))
    drivers_license = Column(String(256))
    first_24 = Column(Boolean)
    second_24 = Column(Boolean)
    additional_information = Column(String(512))
    date_of_completion = Column(String(256))
    criminal_liabilities = Column(String(256))
    languages = Column(String(256))
    government_awards = Column(String(256))
    passport = relationship("PassportModel", back_populates="user", uselist=False)
    military_id = relationship("MilitaryIDModel", back_populates="user", uselist=False)
    addresses = relationship("AddressModel", back_populates="user", uselist=False)
    educations = relationship("EducationModel", back_populates="user")
    post_educations = relationship("PostEducationModel", back_populates="user")
    skill_upgrades = relationship("SkillUpgradeModel", back_populates="user")
    works_experience = relationship("WorkExperienceModel", back_populates="user")
    stays_abroad = relationship("StayAbroadModel", back_populates="user")
    relatives = relationship("FamilyModel", back_populates="user")
    recommendations = relationship("RecommendationModel", back_populates="user")
