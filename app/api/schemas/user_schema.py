from pydantic import BaseModel, Field
from typing import Optional, List


class PassportSchema(BaseModel):
    id: int
    series: int
    number: int
    issued_by: str
    date_of_issue: str
    user_id: int


class MilitaryIDSchema(BaseModel):
    id: int
    status: str
    rank: str
    series: int
    number: int
    issued_by: str
    date_of_issue: str
    user_id: int


class AddressSchema(BaseModel):
    id: int
    passport_address: str
    fact_address: str
    passport_index: int
    fact_index: int
    user_id: int


class EducationSchema(BaseModel):
    id: int
    education_type: str
    name: str
    number: str
    degree: str
    date_of_end: str
    speciality: str
    user_id: int


class PostEducationSchema(BaseModel):
    id: int
    education_type: str
    name: str
    number: str
    speciality: str
    user_id: int


class SkillUpgradeSchema(BaseModel):
    id: int
    speciality: str
    name: str
    date_of_end: str
    user_id: int


class WorkExperienceSchema(BaseModel):
    id: int
    name: str
    position: str
    date_of_start: str
    date_of_end: str
    user_id: int


class StayAbroadSchema(BaseModel):
    id: int
    date_of_start: str
    date_of_end: str
    country: str
    goal: str
    user_id: int


class FamilySchema(BaseModel):
    id: int
    relation_degree: str
    name: str
    birth_data: str
    place_of_work: str
    address: str
    user_id: int


class RecommendationSchema(BaseModel):
    id: int
    name: str
    place_of_work: str
    position: str
    phone_number: str
    user_id: int


class UserForm(BaseModel):
    name: str | None = Field(title="Имя пользователя")
    surname: str | None = Field(title="Фамилия пользователя")
    middle_name: str | None = Field(title="Отчество пользователя")
    sex: str | None = Field(title="Пол")
    birthday: str | None = Field(title="Дата рождения")
    place_of_birth: str | None = Field(title="Место рождения")
    citizenship: str | None = Field(title="Гражданство")
    passport: Optional[PassportSchema] | None = Field(title="Паспорт")
    snils: str | None = Field(title="СНИЛС")
    inn: str | None = Field(title="ИНН")
    phone_number: str | None = Field(title="Номер телефона")
    home_phone_number: str | None = Field(title="Домашний номер телефона")
    email: str | None = Field(title="Электронная почта")
    military_id: Optional[MilitaryIDSchema] | None = Field(title="Воинская обязанность")
    address: Optional[AddressSchema] | None = Field(title="Адреса")
    drivers_license: str | None = Field(title="Водительские права")


class UserEducation(BaseModel):
    academic_degree: str | None = Field(title="Академическая степень")
    diplom: str | None = Field(title="Диплом")
    academic_tile: str | None = Field(title="Академическое звание")
    languages: str | None = Field(title="Знание языков")
    educations: List[EducationSchema] = Field(default_factory=list, title="Образование")
    post_educations: List[PostEducationSchema] = Field(default_factory=list, title="Послевузовское образование")
    skill_upgrades: List[SkillUpgradeSchema] = Field(default_factory=list, title="Повышение квалификации")


class UserWorkExperience(BaseModel):
    works_experience: List[WorkExperienceSchema] = Field(default_factory=list, title="Опыт работы")
    old_achievements: str | None = Field(title="Прежние достижения")
    knowledge_for_work: str | None = Field(title="Знания для работы")
    recommendations: List[RecommendationSchema] = Field(default_factory=list, title="Рекомендации")
    hobbies: str | None = Field(title="Хобби")
    hr_data: str | None = Field(title="HR данные")
    first_24: int = Field(title="Первый вопрос 24")
    second_24: int = Field(title="Второй вопрос 24")


class UserFamily(BaseModel):
    family_status: str | None = Field(title="Семейное положение")
    relatives: List[FamilySchema] = Field(default_factory=list, title="Родственники")


class UserInfo(BaseModel):
    ad_disad: str | None = Field(title="Преимущества и недостатки")
    government_awards: str | None = Field(title="Гос. награды")
    stays_abroad: List[StayAbroadSchema] = Field(default_factory=list, title="Пребывание за границей")
    criminal_liabilities: str | None = Field(title="Уголовная ответсвенность")
    pc_experience: str | None = Field(title="Опыт работы с ПК")
    additional_information: str | None = Field(title="Дополнительная информация")
    date_of_completion: str | None = Field(title="Дата завершения")

    class Config:
        from_attributes = True


class UserCreate(BaseModel):
    form: UserForm
    education: UserEducation
    work_experience: UserWorkExperience
    family: UserFamily
    info: UserInfo


class User(UserForm, UserEducation, UserWorkExperience, UserFamily, UserInfo):
    id: int

    class Config:
        from_attributes = True
